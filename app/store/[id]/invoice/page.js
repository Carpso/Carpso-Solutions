"use client";

import { use, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { apps } from '../../../../data/apps';
import Link from 'next/link';
import { CheckCircle, Download, FileText, ArrowLeft, Building2, UserCircle, Receipt } from 'lucide-react';

function InvoiceContent({ id }) {
    const searchParams = useSearchParams();

    // We expect ref, email, phone, amount, name in the URL args
    const urlRef = searchParams.get('ref');
    const email = searchParams.get('email') || 'client@example.com';
    const phone = searchParams.get('phone') || 'Client Phone';
    const payerName = searchParams.get('name') || 'Valued Corporate Partner';

    const appData = apps.find(a => a.id === id);
    const amount = appData ? searchParams.get('amount') || (appData.price * 1.05) : 0;

    const [dateString, setDateString] = useState('');
    const [transactionRef, setTransactionRef] = useState(urlRef || 'PENDING...');

    useEffect(() => {
        const today = new Date();
        setDateString(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
        if (!urlRef) {
            setTransactionRef('TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase());
        }
    }, [urlRef]);

    if (!appData) {
        return <div className="p-10 text-white">App not found for invoice.</div>;
    }

    const printInvoice = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#0d1117] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

            <div className="w-full max-w-3xl flex justify-between items-center mb-8 print:hidden">
                <Link href={`/store/${id}`} className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" /> Back to App
                </Link>
                <button
                    onClick={printInvoice}
                    className="bg-[#1c2128] border border-[#30363d] hover:bg-[#30363d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                    <Download className="w-4 h-4" /> Download PDF / Print
                </button>
            </div>

            {/* Print Container */}
            <div className="w-full max-w-3xl bg-white text-black p-10 sm:p-14 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] print:shadow-none print:p-0">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-8 mb-8 border-gray-200 gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/carpso_logo.jpg" alt="Carpso Solutions" className="w-14 h-14 rounded-lg shadow-sm" />
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Carpso Solutions</h1>
                            <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mt-0.5">Commercial Invoice</p>
                        </div>
                    </div>
                    <div className="text-left sm:text-right">
                        <div className="text-2xl font-bold text-gray-400 mb-1">#{transactionRef.substring(0, 8).toUpperCase()}</div>
                        <div className="text-sm text-gray-500 font-medium">Date: {dateString}</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                            <CheckCircle className="w-3.5 h-3.5" /> Checked & Captured
                        </div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Billed From
                        </h3>
                        <p className="font-bold text-gray-800 text-lg mb-1">Carpso Solutions HQ</p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Lusaka, Zambia<br />
                            HQ Main Line: +260 968 551 110<br />
                            Collection Account / Settlement: 097 684 7775
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <UserCircle className="w-4 h-4" /> Billed To / Licensee
                        </h3>
                        <p className="font-bold text-gray-800 text-lg mb-1">{payerName}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {email}<br />
                            Paid From Mobile: {phone}
                        </p>
                    </div>
                </div>

                {/* Line Items */}
                <div className="mb-10 rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-500 tracking-wider">
                                <th className="p-4">Item Description</th>
                                <th className="p-4 text-center">Qty</th>
                                <th className="p-4 text-right">Amount (ZMW)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-100">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={appData.logo} alt={appData.name} className="w-10 h-10 rounded-lg shadow-sm border border-gray-100" />
                                        <div>
                                            <div className="font-bold text-gray-900">{appData.name} - Lifetime License</div>
                                            <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{appData.description.substring(0, 60)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center font-medium text-gray-700">1</td>
                                <td className="p-4 text-right font-bold text-gray-900">K{appData.price.toLocaleString('en-US')}</td>
                            </tr>
                            <tr>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">System Processing Fee</div>
                                    <div className="text-gray-500 text-xs mt-0.5">Lipila Mobile Money Gateway (5%)</div>
                                </td>
                                <td className="p-4 text-center font-medium text-gray-700">1</td>
                                <td className="p-4 text-right font-bold text-gray-900">K{(appData.price * 0.05).toLocaleString('en-US')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12">
                    <div className="w-full sm:w-1/2 text-sm text-gray-500">
                        <div className="flex items-start gap-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <Receipt className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="leading-relaxed">
                                License keys and high-fidelity deployment resources will be emailed to <b>{email}</b> once the transaction fully clears.
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                        <div className="flex justify-between py-2 text-sm text-gray-600 font-medium">
                            <span>Subtotal</span>
                            <span>K{appData.price.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm text-gray-600 font-medium border-b border-gray-200">
                            <span>Tax & Fees</span>
                            <span>K{(appData.price * 0.05).toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between py-3 text-xl font-black text-gray-900 mt-1">
                            <span>Total Due</span>
                            <span className="text-blue-600">K{Number(amount).toLocaleString('en-US')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="text-center text-xs text-gray-400 border-t border-gray-200 pt-8">
                    <p className="font-bold mb-1 uppercase tracking-widest text-gray-300">Authorized System Generated Invoice</p>
                    <p>Thank you for partnering with Carpso Solutions Enterprise Division.</p>
                </div>

            </div>
        </div>
    );
}

export default function InvoicePage({ params }) {
    const { id } = use(params);
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">Loading Secure Invoice...</div>}>
            <InvoiceContent id={id} />
        </Suspense>
    );
}
