import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

function checkAuth(req) {
    const session = req.cookies.get('admin_session');
    return session?.value === 'authenticated';
}

export async function PATCH(req, { params }) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { status, notes } = await req.json();
        const { env } = getCloudflareContext();
        const db = env.DB;

        const updates = [];
        const bindParams = [];

        if (status) {
            updates.push('status = ?');
            bindParams.push(status);
        }
        if (notes !== undefined) {
            updates.push('notes = ?');
            bindParams.push(notes);
        }

        if (updates.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        bindParams.push(id);
        await db.prepare(`UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`).bind(...bindParams).run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact update error:', error);
        return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { env } = getCloudflareContext();
        const db = env.DB;

        await db.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact delete error:', error);
        return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }
}
