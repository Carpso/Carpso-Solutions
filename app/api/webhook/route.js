import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import crypto from 'crypto';
import { notifyWhatsApp, buildPaymentAlert } from '../../../lib/notify';

const MAX_WEBHOOK_AGE_SEC = 300;

function base64Decode(str) {
    const binStr = Buffer.from(str, 'base64');
    return new Uint8Array(binStr);
}

function hmacSha256(keyBytes, data) {
    const hmac = crypto.createHmac('sha256', keyBytes).update(data).digest('hex');
    return hmac;
}

export async function POST(req) {
    try {
        const rawBody = await req.text();
        const webhookSecret = process.env.LIPILA_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("LIPILA_WEBHOOK_SECRET not configured");
            return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
        }

        const webhookId = req.headers.get('webhook-id');
        const webhookTimestamp = req.headers.get('webhook-timestamp');
        const webhookSignature = req.headers.get('webhook-signature');

        if (webhookId && webhookTimestamp && webhookSignature) {
            const timestamp = parseInt(webhookTimestamp, 10);
            const now = Math.floor(Date.now() / 1000);
            if (now - timestamp > MAX_WEBHOOK_AGE_SEC) {
                console.error("Webhook too old — possible replay attack");
                return NextResponse.json({ error: "Webhook too old" }, { status: 401 });
            }

            const keyBytes = base64Decode(webhookSecret);
            const signedPayload = `${webhookId}.${webhookTimestamp}.${rawBody}`;
            const expectedSig = hmacSha256(keyBytes, signedPayload);

            const receivedSignatures = webhookSignature.split(' ');
            const valid = receivedSignatures.some(sig => sig.trim() === `v1,${expectedSig}`);

            if (!valid) {
                console.error("Invalid webhook signature");
                return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
            }
        }

        const payload = JSON.parse(rawBody);

        let db = null;
        try {
            const { env } = getCloudflareContext();
            db = env.DB;
        } catch {
            console.log('[Webhook] D1 not available (local dev)');
        }

        if (payload.type === 'Collection' && payload.status === 'Successful') {
            const email = payload.email || '';
            const reference = payload.referenceId || payload.identifier;
            const amount = payload.amount;

            console.log(`[Webhook] Payment successful for ${reference} — K${amount} by ${email}`);

            if (db) {
                const result = await db.prepare(
                    `UPDATE orders SET status = 'paid', webhook_received_at = ?, updated_at = ? WHERE reference = ? OR lipila_ref = ?`
                ).bind(new Date().toISOString(), new Date().toISOString(), reference, reference).run();

                if (result.meta.changes > 0) {
                    const order = await db.prepare(
                        `SELECT app_name, payer_name FROM orders WHERE reference = ? OR lipila_ref = ?`
                    ).bind(reference, reference).first();

                    if (order) {
                        notifyWhatsApp(buildPaymentAlert(
                            order.app_name, order.payer_name, email, amount, reference
                        ));
                    }
                }
            }

            return NextResponse.json({ received: true, status: payload.status });
        }

        if (payload.type === 'Disbursement') {
            console.log(`[Webhook] Payout ${payload.status} for ${payload.referenceId} — K${payload.amount}`);
            if (db) {
                await db.prepare(
                    `UPDATE orders SET status = ?, updated_at = ? WHERE reference = ?`
                ).bind(
                    payload.status === 'Successful' ? 'settled' : `payout_${payload.status?.toLowerCase() || 'unknown'}`,
                    new Date().toISOString(),
                    payload.referenceId
                ).run();
            }
            return NextResponse.json({ received: true, status: payload.status });
        }

        console.log(`[Webhook] Unhandled event type=${payload.type} status=${payload.status}`);
        return NextResponse.json({ received: true, message: "Webhook received, unhandled event" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}
