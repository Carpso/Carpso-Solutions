'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { label: 'Contacts', href: '/admin/contacts', icon: '💬' },
    { label: 'Orders', href: '/admin/orders', icon: '💰' },
    { label: 'Clients', href: '/admin/clients', icon: '👥' },
];

export default function AdminLayout({ children }) {
    const [authed, setAuthed] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/admin') {
            setAuthed(true);
            return;
        }
        fetch('/api/admin/stats').then(r => {
            if (r.ok) setAuthed(true);
            else { setAuthed(false); router.push('/admin'); }
        }).catch(() => { setAuthed(false); router.push('/admin'); });
    }, [pathname, router]);

    async function handleLogout() {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin');
    }

    if (pathname === '/admin') return children;

    if (authed === null) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
                <p style={{ color: '#666' }}>Loading...</p>
            </div>
        );
    }

    if (!authed) return null;

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex' }}>
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}
            <aside style={{
                width: 240, background: '#111', borderRight: '1px solid #222', padding: '24px 0',
                position: 'fixed', top: 0, bottom: 0, zIndex: 50, display: 'flex', flexDirection: 'column',
                transform: sidebarOpen ? 'translateX(0)' : undefined,
            }}>
                <div style={{ padding: '0 20px', marginBottom: 32 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Carpso Admin</h2>
                    <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Management Portal</p>
                </div>
                <nav style={{ flex: 1 }}>
                    {NAV_ITEMS.map(item => {
                        const active = pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                                color: active ? '#fff' : '#888', background: active ? '#1a1a1a' : 'transparent',
                                textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400,
                                borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                                transition: 'all 0.15s',
                            }}>
                                <span>{item.icon}</span> {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div style={{ padding: '0 20px' }}>
                    <button onClick={handleLogout} style={{
                        width: '100%', padding: '10px 16px', background: '#1a1a1a', border: '1px solid #333',
                        borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer', textAlign: 'left',
                    }}>
                        Sign Out
                    </button>
                </div>
            </aside>

            <div style={{ flex: 1, marginLeft: 240 }}>
                <header style={{ padding: '16px 32px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                        display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer',
                    }} className="mobile-menu-btn">
                        ☰
                    </button>
                    <div />
                    <a href="https://carpsosolutions.store" target="_blank" rel="noopener noreferrer" style={{
                        color: '#2563eb', fontSize: 13, textDecoration: 'none',
                    }}>
                        View Site →
                    </a>
                </header>
                <main style={{ padding: 32 }}>
                    {children}
                </main>
            </div>

            <style>{`@media (max-width: 768px) { aside { transform: translateX(-100%) !important; } aside.open { transform: translateX(0) !important; } .mobile-menu-btn { display: block !important; } }`}</style>
        </div>
    );
}
