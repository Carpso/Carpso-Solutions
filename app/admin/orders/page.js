'use client';

import { useEffect, useState, useCallback } from 'react';

const STATUS_COLORS = {
    pending: { bg: '#f59e0b20', text: '#f59e0b' },
    paid: { bg: '#10b98120', text: '#10b981' },
    settled: { bg: '#06b6d420', text: '#06b6d4' },
    failed: { bg: '#ef444420', text: '#ef4444' },
};

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filter !== 'all') params.set('status', filter);
        if (search) params.set('search', search);
        const res = await fetch(`/api/admin/orders?${params}`);
        const data = await res.json();
        setOrders(data.orders || []);
        setLoading(false);
    }, [filter, search]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    async function updateStatus(id, status) {
        await fetch(`/api/admin/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        fetchOrders();
        setSelected(null);
    }

    const totalRevenue = orders
        .filter(o => ['paid', 'settled'].includes(o.status))
        .reduce((sum, o) => sum + (o.amount || 0), 0);

    return (
        <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Orders</h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
                {orders.length} orders found · K{totalRevenue.toLocaleString()} filtered revenue
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <input
                    type="text" placeholder="Search orders..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        flex: 1, minWidth: 200, padding: '10px 14px', background: '#1a1a1a',
                        border: '1px solid #333', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none',
                    }}
                />
                {['all', 'pending', 'paid', 'settled', 'failed'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        padding: '10px 16px', borderRadius: 8, border: '1px solid #333', fontSize: 13,
                        background: filter === s ? '#2563eb' : '#1a1a1a', color: filter === s ? '#fff' : '#888',
                        cursor: 'pointer', textTransform: 'capitalize',
                    }}>{s}</button>
                ))}
            </div>

            {loading ? <p style={{ color: '#666' }}>Loading...</p> : orders.length === 0 ? (
                <p style={{ color: '#666' }}>No orders found</p>
            ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                    {orders.map(o => (
                        <div key={o.id} onClick={() => setSelected(o)} style={{
                            background: '#111', border: '1px solid #222', borderRadius: 8, padding: '16px 20px',
                            cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <p style={{ fontWeight: 600, fontSize: 14 }}>{o.app_name}</p>
                                    <span style={{
                                        fontSize: 11, padding: '3px 10px', borderRadius: 99, textTransform: 'capitalize',
                                        ...(STATUS_COLORS[o.status] || STATUS_COLORS.pending),
                                    }}>{o.status}</span>
                                </div>
                                <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                                    {o.payer_name} · {o.email} · {o.phone}
                                </p>
                                <p style={{ color: '#555', fontSize: 11, marginTop: 4 }}>
                                    Ref: {o.reference?.substring(0, 20)}... · {o.created_at?.substring(0, 19)}
                                </p>
                            </div>
                            <p style={{ fontSize: 20, fontWeight: 700, color: '#10b981', flexShrink: 0, marginLeft: 16 }}>
                                K{o.amount?.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {selected && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
                    onClick={() => setSelected(null)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: '#111', border: '1px solid #333', borderRadius: 16, padding: 32,
                        width: '100%', maxWidth: 500, maxHeight: '80vh', overflow: 'auto',
                    }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{selected.app_name}</h2>
                        <p style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>K{selected.amount?.toLocaleString()}</p>

                        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Buyer</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>{selected.payer_name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Email</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>{selected.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Phone</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>{selected.phone}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Fee</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>K{selected.fee}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Reference</span>
                                <span style={{ color: '#ccc', fontSize: 11, fontFamily: 'monospace' }}>{selected.reference}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Lipila Ref</span>
                                <span style={{ color: '#ccc', fontSize: 11, fontFamily: 'monospace' }}>{selected.lipila_ref || '—'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Created</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>{selected.created_at?.substring(0, 19)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: 13 }}>Updated</span>
                                <span style={{ color: '#ccc', fontSize: 13 }}>{selected.updated_at?.substring(0, 19)}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 8 }}>Update Status</label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['pending', 'paid', 'settled', 'failed'].map(s => (
                                    <button key={s} onClick={() => updateStatus(selected.id, s)} style={{
                                        padding: '8px 14px', borderRadius: 6, border: '1px solid #333', fontSize: 13,
                                        background: selected.status === s ? '#2563eb' : '#1a1a1a',
                                        color: selected.status === s ? '#fff' : '#888',
                                        cursor: 'pointer', textTransform: 'capitalize',
                                    }}>{s}</button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => setSelected(null)} style={{
                            marginTop: 20, width: '100%', padding: '10px 16px', background: '#1a1a1a',
                            border: '1px solid #333', borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer',
                        }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
