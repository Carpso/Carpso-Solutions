import { NextResponse } from 'next/server';
import crypto from 'crypto';

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

        if (payload.type === 'Collection' && payload.status === 'Successful') {
            const email = payload.email || '';
            const identifier = payload.identifier || payload.referenceId;
            const amount = payload.amount;

            console.log(`[Webhook] Payment successful for ${identifier} — K${amount} by ${email}`);

            console.log(`Send email to ${email} granting access to download`);

            return NextResponse.json({ received: true, status: payload.status });
        }

        if (payload.type === 'Disbursement') {
            console.log(`[Webhook] Payout ${payload.status} for ${payload.referenceId} — K${payload.amount}`);
            return NextResponse.json({ received: true, status: payload.status });
        }

        console.log(`[Webhook] Unhandled event type=${payload.type} status=${payload.status}`);
        return NextResponse.json({ received: true, message: "Webhook received, unhandled event" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}
