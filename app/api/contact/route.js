import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { notifyWhatsApp, buildContactAlert } from '../../../lib/notify';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let db = null;
        try {
            const { env } = getCloudflareContext();
            db = env.DB;
        } catch {
            console.log('[Contact] D1 not available (local dev)');
        }

        if (db) {
            await db.prepare(
                `INSERT INTO contacts (name, email, message, status, source, notes, created_at)
                 VALUES (?, ?, ?, 'new', 'website', '', ?)`
            ).bind(name, email, message, new Date().toISOString()).run();
        } else {
            console.log('[Contact Form]', JSON.stringify({ name, email, message, date: new Date().toISOString() }));
        }

        notifyWhatsApp(buildContactAlert(name, email, message));

        return NextResponse.json({ success: true, message: 'Message recorded successfully.' });
    } catch (e) {
        console.error("Error saving contact:", e);
        return NextResponse.json({ error: 'Failed to record message.' }, { status: 500 });
    }
}
