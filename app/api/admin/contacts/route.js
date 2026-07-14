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
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        let query = 'SELECT * FROM contacts';
        const conditions = [];
        const params = [];

        if (status && status !== 'all') {
            conditions.push('status = ?');
            params.push(status);
        }
        if (search) {
            conditions.push("(name LIKE ? OR email LIKE ? OR message LIKE ?)");
            const term = `%${search}%`;
            params.push(term, term, term);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const result = params.length > 0
            ? await db.prepare(query).bind(...params).all()
            : await db.prepare(query).all();

        return NextResponse.json({ contacts: result?.results || [] });
    } catch (error) {
        console.error('Contacts list error:', error);
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}
