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
        const { status } = await req.json();
        const { env } = getCloudflareContext();
        const db = env.DB;

        if (!status) {
            return NextResponse.json({ error: 'Status required' }, { status: 400 });
        }

        await db.prepare(
            `UPDATE orders SET status = ?, updated_at = ? WHERE id = ?`
        ).bind(status, new Date().toISOString(), id).run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Order update error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
