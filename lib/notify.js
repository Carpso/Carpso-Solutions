const OWNER_WHATSAPP = '260968551110';

export function notifyWhatsApp(message) {
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
  console.log(`[WhatsApp Alert] ${url}`);
  return fetch(url).catch(() => {});
}

export function buildContactAlert(name, email, message) {
  return (
    `🔔 NEW LEAD (Carpso Solutions)\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Message: ${message}\n` +
    `Time: ${new Date().toISOString()}\n\n` +
    `→ carpsosolutions.store/admin/contacts`
  );
}

export function buildOrderAlert(appName, payerName, email, phone, amount, reference, status) {
  return (
    `💰 NEW ORDER (Carpso Solutions)\n\n` +
    `App: ${appName}\n` +
    `Buyer: ${payerName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Amount: K${amount}\n` +
    `Reference: ${reference}\n` +
    `Status: ${status}\n` +
    `Time: ${new Date().toISOString()}\n\n` +
    `→ carpsosolutions.store/admin/orders`
  );
}

export function buildPaymentAlert(appName, payerName, email, amount, reference) {
  return (
    `✅ PAYMENT CONFIRMED (Carpso Solutions)\n\n` +
    `App: ${appName}\n` +
    `Buyer: ${payerName}\n` +
    `Email: ${email}\n` +
    `Amount: K${amount}\n` +
    `Reference: ${reference}\n` +
    `Time: ${new Date().toISOString()}\n\n` +
    `→ carpsosolutions.store/admin/orders`
  );
}
