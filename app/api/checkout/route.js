import { NextResponse } from 'next/server';
import { apps } from '../../../data/apps';

const LIPILA_BASE_URL = 'https://blz.lipila.io/api';

export async function POST(req) {
    try {
        const { appId, payerName, email, phone } = await req.json();

        if (!appId || !email || !phone) {
            return NextResponse.json({ error: "Missing appId, email, or phone" }, { status: 400 });
        }

        const appData = apps.find((a) => a.id === appId);
        if (!appData) {
            return NextResponse.json({ error: "App not found" }, { status: 404 });
        }

        const apiKey = process.env.LIPILA_API_KEY;
        if (!apiKey) {
            console.error("LIPILA_API_KEY not configured");
            return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
        }

        let formattedPhone = phone.replace(/\D/g, '');

        if (formattedPhone.startsWith('0')) {
            formattedPhone = '260' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('9') || formattedPhone.startsWith('7')) {
            formattedPhone = '260' + formattedPhone;
        }

        if (!/^260\d{9}$/.test(formattedPhone)) {
            return NextResponse.json({ error: "Invalid Zambian phone number" }, { status: 400 });
        }

        const referenceId = crypto.randomUUID();
        const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`;
        const amount = Number((appData.price * 1.05).toFixed(2));

        const collectRes = await fetch(`${LIPILA_BASE_URL}/v1/collections/mobile-money`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({
                callbackUrl: webhookUrl,
                referenceId,
                amount,
                narration: `Carpso: ${appData.name} Purchase`,
                accountNumber: formattedPhone,
                currency: "ZMW",
                email,
            }),
        });

        let collectData = null;
        try {
            collectData = await collectRes.json();
            if (!collectRes.ok) {
                console.error("Lipila collection failed:", collectData);
            }
        } catch (e) {
            console.error("Lipila response parse error:", e);
        }

        if (!collectRes.ok) {
            return NextResponse.json({
                error: "Payment initiation failed",
                details: collectData?.message || "Please try again"
            }, { status: 502 });
        }

        // Dispatch automated settlement payout to merchant (0976847775)
        const payoutRef = `SETTLE-${referenceId.substring(0, 12)}`;
        fetch(`${LIPILA_BASE_URL}/v1/payouts/mobile-money`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify({
                callbackUrl: webhookUrl,
                referenceId: payoutRef,
                amount: appData.price,
                narration: `Settlement: ${appData.name}`,
                accountNumber: "260976847775",
                currency: "ZMW",
                email: "settlements@carpsosolutions.store",
            }),
        }).catch(err => console.error("Settlement dispatch failed:", err));

        return NextResponse.json({
            reference: referenceId,
            status: "push_initiated",
            method: "mobile_money",
        });

    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
