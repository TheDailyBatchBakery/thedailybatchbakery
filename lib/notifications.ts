import { config, services } from './config';
import { Order } from '@/types';
import { formatCurrency, formatPhone } from './utils';

// Email notification using Resend
export async function sendEmailNotification(
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (!services.resend.enabled) {
    console.warn('Email notifications are disabled. Email would be sent to:', to);
    return false;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(services.resend.apiKey);

    const { data, error } = await resend.emails.send({
      from: `${config.name} <${config.email}>`,
      to,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// SMS notification using Twilio
export async function sendSMSNotification(
  to: string,
  message: string
): Promise<boolean> {
  if (!services.twilio.enabled) {
    console.warn('SMS notifications are disabled. SMS would be sent to:', to);
    return false;
  }

  try {
    const twilio = await import('twilio');
    const client = twilio.default(
      services.twilio.accountSid,
      services.twilio.authToken
    );

    // Truncate message to 160 characters if needed
    const truncatedMessage = message.length > 160 ? message.substring(0, 157) + '...' : message;

    const result = await client.messages.create({
      body: truncatedMessage,
      from: services.twilio.phoneNumber,
      to: normalizePhoneForTwilio(to),
    });

    console.log('SMS sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

function normalizePhoneForTwilio(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  if (cleaned.startsWith('1') && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  return phone;
}

// Order confirmation email template
export function generateOrderConfirmationEmail(order: Order, customerName: string): string {
  const orderTypeText = order.order_type === 'pickup' ? 'Pickup' : 'Delivery';
  const dateObj = new Date(order.pickup_date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const itemsHTML = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
          ${item.product_name}${item.size ? ` (${item.size})` : ''}
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">
          ${formatCurrency(item.total)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #d9a86c 0%, #b18458 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">${config.name}</h1>
          <p style="margin: 10px 0 0 0; font-style: italic;">Order Confirmation</p>
        </div>
        
        <div style="background: #faf7f2; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi ${customerName},</p>
          
          <p>Thank you for your order! We've received it and will confirm once payment is processed.</p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #b18458; margin-top: 0;">Order #${order.order_number}</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
            
            <div style="border-top: 2px solid #ddd; margin-top: 20px; padding-top: 10px;">
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span>Subtotal:</span>
                <span>${formatCurrency(order.subtotal)}</span>
              </div>
              ${order.delivery_fee > 0 ? `
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span>Delivery Fee:</span>
                <span>${formatCurrency(order.delivery_fee)}</span>
              </div>
              ` : order.order_type === 'delivery' ? `
              <div style="display: flex; justify-content: space-between; margin: 5px 0; color: #155724;">
                <span><strong>Delivery Fee:</strong></span>
                <span><strong>FREE (Order over $100)</strong></span>
              </div>
              ` : ''}
              <div style="display: flex; justify-content: space-between; margin: 15px 0; font-size: 1.2em; font-weight: bold; color: #b18458;">
                <span>Total:</span>
                <span>${formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #b18458; margin-top: 0;">Order Details</h3>
            <p><strong>Type:</strong> ${orderTypeText}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${order.pickup_time}</p>
            <p><strong>Payment Method:</strong> ${order.payment_method === 'cash' ? 'Cash' : `Venmo (${config.venmo})`}</p>
            ${order.order_type === 'delivery' && order.delivery_address ? `
            <p><strong>Delivery Address:</strong> ${order.delivery_address}</p>
            ` : ''}
          </div>
          
          <p>You'll receive a text message once your order and payment have been confirmed.</p>
          
          <p>If you have any questions, please contact us at:</p>
          <p>
            Email: <a href="mailto:${config.email}" style="color: #b18458;">${config.email}</a><br>
            Phone: <a href="tel:${config.phone}" style="color: #b18458;">${config.phone}</a>
          </p>
          
          <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
            Thank you for choosing ${config.name}!
          </p>
        </div>
      </body>
    </html>
  `;
}

// Order confirmation SMS
export function generateOrderConfirmationSMS(order: Order): string {
  return `Order #${order.order_number} received! Total: ${formatCurrency(order.total)}. You'll receive a confirmation text once payment is processed.`;
}

// Admin notification email
export function generateAdminOrderNotificationEmail(order: Order, customerName: string, customerEmail: string, customerPhone: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Order Received</h2>
        <p><strong>Order Number:</strong> ${order.order_number}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${formatPhone(customerPhone)}</p>
        <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
        <p><strong>Type:</strong> ${order.order_type}</p>
        <p><strong>Date:</strong> ${order.pickup_date} at ${order.pickup_time}</p>
      </body>
    </html>
  `;
}

