import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'carpso2026';

export async function POST(req) {
    try {
        const { password } = await req.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');
    return response;
}
