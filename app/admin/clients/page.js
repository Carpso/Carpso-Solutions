'use client';

import { useEffect, useState } from 'react';

export default function ClientsPage() {
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        Promise.all([
            fetch('/api/admin/contacts').then(r => r.json()),
            fetch('/api/admin/orders').then(r => r.json()),
        ]).then(([c, o]) => {
            setContacts(c.contacts || []);
            setOrders(o.orders || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const clients = buildClientList(contacts, orders, search);

    return (
        <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Clients</h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
                Unified view of all contacts and buyers · {clients.length} total
            </p>

            <div style={{ marginBottom: 24 }}>
                <input
                    type="text" placeholder="Search by name or email..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%', maxWidth: 400, padding: '10px 14px', background: '#1a1a1a',
                        border: '1px solid #333', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none',
                    }}
                />
            </div>

            {loading ? <p style={{ color: '#666' }}>Loading...</p> : clients.length === 0 ? (
                <p style={{ color: '#666' }}>No clients found</p>
            ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                    {clients.map((client, i) => (
                        <div key={`${client.email}-${i}`} style={{
                            background: '#111', border: '1px solid #222', borderRadius: 12, padding: 20,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{client.name}</h3>
                                    <p style={{ color: '#888', fontSize: 13 }}>{client.email}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {client.contactStatus && (
                                        <span style={{
                                            fontSize: 11, padding: '3px 10px', borderRadius: 99,
                                            background: '#2563eb20', color: '#2563eb',
                                        }}>Lead: {client.contactStatus}</span>
                                    )}
                                    {client.orderCount > 0 && (
                                        <span style={{
                                            fontSize: 11, padding: '3px 10px', borderRadius: 99,
                                            background: '#10b98120', color: '#10b981',
                                        }}>{client.orderCount} order{client.orderCount > 1 ? 's' : ''}</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                                {client.totalSpent > 0 && (
                                    <div>
                                        <p style={{ color: '#666', fontSize: 12 }}>Total Spent</p>
                                        <p style={{ color: '#10b981', fontSize: 18, fontWeight: 700 }}>K{client.totalSpent.toLocaleString()}</p>
                                    </div>
                                )}
                                {client.lastOrder && (
                                    <div>
                                        <p style={{ color: '#666', fontSize: 12 }}>Last Order</p>
                                        <p style={{ color: '#ccc', fontSize: 14 }}>{client.lastOrder.app_name} — K{client.lastOrder.amount}</p>
                                        <p style={{ color: '#555', fontSize: 12 }}>{client.lastOrder.created_at?.substring(0, 10)}</p>
                                    </div>
                                )}
                                {client.firstContact && (
                                    <div>
                                        <p style={{ color: '#666', fontSize: 12 }}>First Contact</p>
                                        <p style={{ color: '#ccc', fontSize: 14 }}>{client.firstContact.created_at?.substring(0, 10)}</p>
                                    </div>
                                )}
                                {client.phone && (
                                    <div>
                                        <p style={{ color: '#666', fontSize: 12 }}>Phone</p>
                                        <p style={{ color: '#ccc', fontSize: 14 }}>{client.phone}</p>
                                    </div>
                                )}
                            </div>

                            {client.orders.length > 0 && (
                                <div style={{ marginTop: 12, borderTop: '1px solid #222', paddingTop: 12 }}>
                                    <p style={{ color: '#666', fontSize: 12, marginBottom: 8 }}>Order History</p>
                                    {client.orders.map((o, j) => (
                                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                                            <span style={{ color: '#888', fontSize: 13 }}>{o.app_name}</span>
                                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                                <span style={{ color: '#ccc', fontSize: 13 }}>K{o.amount}</span>
                                                <span style={{
                                                    fontSize: 11, padding: '1px 6px', borderRadius: 4,
                                                    background: o.status === 'paid' ? '#10b98120' : '#f59e0b20',
                                                    color: o.status === 'paid' ? '#10b981' : '#f59e0b',
                                                }}>{o.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {client.notes && (
                                <div style={{ marginTop: 12, padding: 12, background: '#1a1a1a', borderRadius: 8 }}>
                                    <p style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Notes</p>
                                    <p style={{ color: '#888', fontSize: 13 }}>{client.notes}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function buildClientList(contacts, orders, search) {
    const clientMap = {};

    contacts.forEach(c => {
        const key = c.email.toLowerCase();
        if (!clientMap[key]) {
            clientMap[key] = {
                name: c.name, email: c.email, phone: null,
                contactStatus: c.status, notes: c.notes,
                orders: [], orderCount: 0, totalSpent: 0,
                firstContact: c, lastOrder: null,
            };
        } else {
            if (!clientMap[key].contactStatus || c.status === 'new') {
                clientMap[key].contactStatus = c.status;
            }
            if (c.notes) clientMap[key].notes = c.notes;
        }
    });

    orders.forEach(o => {
        const key = o.email.toLowerCase();
        if (!clientMap[key]) {
            clientMap[key] = {
                name: o.payer_name, email: o.email, phone: o.phone,
                contactStatus: null, notes: null,
                orders: [], orderCount: 0, totalSpent: 0,
                firstContact: null, lastOrder: null,
            };
        }
        clientMap[key].orders.push(o);
        clientMap[key].orderCount++;
        if (['paid', 'settled'].includes(o.status)) {
            clientMap[key].totalSpent += o.amount || 0;
        }
        if (!clientMap[key].phone && o.phone) clientMap[key].phone = o.phone;
        if (!clientMap[key].lastOrder || o.created_at > clientMap[key].lastOrder.created_at) {
            clientMap[key].lastOrder = o;
        }
    });

    let list = Object.values(clientMap);

    if (search) {
        const term = search.toLowerCase();
        list = list.filter(c =>
            c.name?.toLowerCase().includes(term) || c.email?.toLowerCase().includes(term)
        );
    }

    list.sort((a, b) => {
        if (a.totalSpent !== b.totalSpent) return b.totalSpent - a.totalSpent;
        if (a.orderCount !== b.orderCount) return b.orderCount - a.orderCount;
        return (b.firstContact?.created_at || '').localeCompare(a.firstContact?.created_at || '');
    });

    return list;
}
