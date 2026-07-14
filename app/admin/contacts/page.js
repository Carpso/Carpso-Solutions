'use client';

import { useEffect, useState, useCallback } from 'react';

const STATUS_COLORS = {
    new: { bg: '#f59e0b20', text: '#f59e0b' },
    contacted: { bg: '#2563eb20', text: '#2563eb' },
    converted: { bg: '#10b98120', text: '#10b981' },
    archived: { bg: '#6b728020', text: '#6b7280' },
};

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filter !== 'all') params.set('status', filter);
        if (search) params.set('search', search);
        const res = await fetch(`/api/admin/contacts?${params}`);
        const data = await res.json();
        setContacts(data.contacts || []);
        setLoading(false);
    }, [filter, search]);

    useEffect(() => { fetchContacts(); }, [fetchContacts]);

    async function updateContact(id, updates) {
        await fetch(`/api/admin/contacts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        fetchContacts();
        setSelected(null);
    }

    async function deleteContact(id) {
        if (!confirm('Delete this contact?')) return;
        await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
        fetchContacts();
        setSelected(null);
    }

    return (
        <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Contacts & Leads</h1>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <input
                    type="text" placeholder="Search contacts..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        flex: 1, minWidth: 200, padding: '10px 14px', background: '#1a1a1a',
                        border: '1px solid #333', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none',
                    }}
                />
                {['all', 'new', 'contacted', 'converted', 'archived'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        padding: '10px 16px', borderRadius: 8, border: '1px solid #333', fontSize: 13,
                        background: filter === s ? '#2563eb' : '#1a1a1a', color: filter === s ? '#fff' : '#888',
                        cursor: 'pointer', textTransform: 'capitalize',
                    }}>{s}</button>
                ))}
            </div>

            {loading ? <p style={{ color: '#666' }}>Loading...</p> : contacts.length === 0 ? (
                <p style={{ color: '#666' }}>No contacts found</p>
            ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                    {contacts.map(c => (
                        <div key={c.id} onClick={() => setSelected(c)} style={{
                            background: '#111', border: '1px solid #222', borderRadius: 8, padding: '16px 20px',
                            cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</p>
                                <p style={{ color: '#888', fontSize: 13 }}>{c.email}</p>
                                <p style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{c.message?.substring(0, 80)}...</p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                                <span style={{
                                    fontSize: 11, padding: '3px 10px', borderRadius: 99, textTransform: 'capitalize',
                                    ...(STATUS_COLORS[c.status] || STATUS_COLORS.new),
                                }}>{c.status}</span>
                                <p style={{ color: '#555', fontSize: 11, marginTop: 8 }}>{c.created_at?.substring(0, 10)}</p>
                            </div>
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
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{selected.name}</h2>
                        <p style={{ color: '#888', fontSize: 14 }}>{selected.email}</p>
                        <p style={{ color: '#555', fontSize: 12, marginTop: 4 }}>Source: {selected.source}</p>
                        <p style={{ color: '#555', fontSize: 12 }}>Received: {selected.created_at?.substring(0, 19)}</p>

                        <div style={{ marginTop: 16, padding: 16, background: '#1a1a1a', borderRadius: 8 }}>
                            <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>{selected.message}</p>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Status</label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['new', 'contacted', 'converted', 'archived'].map(s => (
                                    <button key={s} onClick={() => updateContact(selected.id, { status: s })} style={{
                                        padding: '8px 14px', borderRadius: 6, border: '1px solid #333', fontSize: 13,
                                        background: selected.status === s ? '#2563eb' : '#1a1a1a',
                                        color: selected.status === s ? '#fff' : '#888',
                                        cursor: 'pointer', textTransform: 'capitalize',
                                    }}>{s}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Notes</label>
                            <textarea
                                defaultValue={selected.notes || ''}
                                onBlur={e => updateContact(selected.id, { notes: e.target.value })}
                                placeholder="Add notes about this lead..."
                                rows={3}
                                style={{
                                    width: '100%', padding: 12, background: '#1a1a1a', border: '1px solid #333',
                                    borderRadius: 8, color: '#fff', fontSize: 14, resize: 'vertical', outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'space-between' }}>
                            <button onClick={() => deleteContact(selected.id)} style={{
                                padding: '10px 16px', background: '#1a1a1a', border: '1px solid #ef4444',
                                borderRadius: 8, color: '#ef4444', fontSize: 13, cursor: 'pointer',
                            }}>Delete</button>
                            <button onClick={() => setSelected(null)} style={{
                                padding: '10px 16px', background: '#1a1a1a', border: '1px solid #333',
                                borderRadius: 8, color: '#888', fontSize: 13, cursor: 'pointer',
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
