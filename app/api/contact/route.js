import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        try {
            const { env } = getCloudflareContext();
            if (env.DB) {
                await env.DB.prepare(
                    'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)'
                ).bind(name, email, message, new Date().toISOString()).run();
            } else {
                console.log('[Contact Form]', JSON.stringify({ name, email, message, date: new Date().toISOString() }));
            }
        } catch {
            console.log('[Contact Form - Local]', JSON.stringify({ name, email, message, date: new Date().toISOString() }));
        }

        return NextResponse.json({ success: true, message: 'Message recorded successfully.' });
    } catch (e) {
        console.error("Error saving contact:", e);
        return NextResponse.json({ error: 'Failed to record message.' }, { status: 500 });
    }
}
