'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                setError('Invalid password');
            }
        } catch {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
            <div style={{ width: '100%', maxWidth: 400, padding: 40, background: '#111', borderRadius: 16, border: '1px solid #222' }}>
                <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Carpso Admin</h1>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 32, textAlign: 'center' }}>Sign in to manage your business</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        autoFocus
                        style={{
                            width: '100%', padding: '14px 16px', background: '#1a1a1a', border: '1px solid #333',
                            borderRadius: 8, color: '#fff', fontSize: 16, outline: 'none', marginBottom: 16,
                            boxSizing: 'border-box',
                        }}
                    />
                    {error && <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 16 }}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '14px 16px', background: loading ? '#333' : '#2563eb',
                            border: 'none', borderRadius: 8, color: '#fff', fontSize: 16, fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
