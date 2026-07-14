import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

function checkAuth(req) {
    const session = req.cookies.get('admin_session');
    return session?.value === 'authenticated';
}

export async function GET(req) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { env } = getCloudflareContext();
        const db = env.DB;

        const contacts = await db.prepare('SELECT COUNT(*) as count FROM contacts').first();
        const newContacts = await db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").first();
        const orders = await db.prepare('SELECT COUNT(*) as count FROM orders').first();
        const paidOrders = await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'paid'").first();
        const totalRevenue = await db.prepare("SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status IN ('paid', 'settled')").first();
        const pendingOrders = await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").first();

        const recentContacts = await db.prepare(
            'SELECT id, name, email, message, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5'
        ).all();

        const recentOrders = await db.prepare(
            'SELECT id, app_name, payer_name, email, amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5'
        ).all();

        return NextResponse.json({
            stats: {
                totalContacts: contacts?.count || 0,
                newContacts: newContacts?.count || 0,
                totalOrders: orders?.count || 0,
                paidOrders: paidOrders?.count || 0,
                pendingOrders: pendingOrders?.count || 0,
                totalRevenue: totalRevenue?.total || 0,
            },
            recentContacts: recentContacts?.results || [],
            recentOrders: recentOrders?.results || [],
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
