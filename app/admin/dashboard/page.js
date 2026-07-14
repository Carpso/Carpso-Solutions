'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function StatCard({ label, value, color, icon }) {
    return (
        <div style={{
            background: '#111', border: '1px solid #222', borderRadius: 12, padding: '24px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
        }}>
            <div style={{
                width: 48, height: 48, borderRadius: 12, background: `${color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</p>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats').then(r => r.json()).then(d => {
            setData(d);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <p style={{ color: '#666' }}>Loading dashboard...</p>;
    if (!data) return <p style={{ color: '#ef4444' }}>Failed to load dashboard</p>;

    const { stats, recentContacts, recentOrders } = data;

    return (
        <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
                <StatCard icon="💬" label="Total Contacts" value={stats.totalContacts} color="#2563eb" />
                <StatCard icon="🆕" label="New Leads" value={stats.newContacts} color="#f59e0b" />
                <StatCard icon="📦" label="Total Orders" value={stats.totalOrders} color="#8b5cf6" />
                <StatCard icon="✅" label="Paid Orders" value={stats.paidOrders} color="#10b981" />
                <StatCard icon="⏳" label="Pending" value={stats.pendingOrders} color="#f97316" />
                <StatCard icon="🇿🇲" label="Revenue (K)" value={`K${Number(stats.totalRevenue).toLocaleString()}`} color="#06b6d4" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Contacts</h2>
                        <Link href="/admin/contacts" style={{ color: '#2563eb', fontSize: 13, textDecoration: 'none' }}>View All →</Link>
                    </div>
                    {recentContacts.length === 0 ? (
                        <p style={{ color: '#666', fontSize: 14 }}>No contacts yet</p>
                    ) : recentContacts.map(c => (
                        <div key={c.id} style={{
                            background: '#111', border: '1px solid #222', borderRadius: 8, padding: 16, marginBottom: 8,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</p>
                                <span style={{
                                    fontSize: 11, padding: '2px 8px', borderRadius: 99,
                                    background: c.status === 'new' ? '#f59e0b20' : c.status === 'contacted' ? '#2563eb20' : '#10b98120',
                                    color: c.status === 'new' ? '#f59e0b' : c.status === 'contacted' ? '#2563eb' : '#10b981',
                                }}>{c.status}</span>
                            </div>
                            <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{c.email}</p>
                            <p style={{ color: '#555', fontSize: 12, marginTop: 8 }}>{c.message?.substring(0, 100)}{c.message?.length > 100 ? '...' : ''}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Orders</h2>
                        <Link href="/admin/orders" style={{ color: '#2563eb', fontSize: 13, textDecoration: 'none' }}>View All →</Link>
                    </div>
                    {recentOrders.length === 0 ? (
                        <p style={{ color: '#666', fontSize: 14 }}>No orders yet</p>
                    ) : recentOrders.map(o => (
                        <div key={o.id} style={{
                            background: '#111', border: '1px solid #222', borderRadius: 8, padding: 16, marginBottom: 8,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{o.app_name}</p>
                                <span style={{
                                    fontSize: 11, padding: '2px 8px', borderRadius: 99,
                                    background: o.status === 'paid' ? '#10b98120' : o.status === 'pending' ? '#f59e0b20' : '#ef444420',
                                    color: o.status === 'paid' ? '#10b981' : o.status === 'pending' ? '#f59e0b' : '#ef4444',
                                }}>{o.status}</span>
                            </div>
                            <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{o.payer_name} — K{o.amount}</p>
                            <p style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{o.created_at?.substring(0, 19)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
