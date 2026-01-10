import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { generateOrderNumber } from '@/lib/utils';
import { calculateDeliveryFee } from '@/lib/utils';
import { config } from '@/lib/config';
import { sendEmailNotification, sendSMSNotification, generateOrderConfirmationEmail, generateOrderConfirmationSMS, generateAdminOrderNotificationEmail } from '@/lib/notifications';
import { features, services } from '@/lib/config';
import { Order, OrderItem } from '@/types';

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      order_type,
      pickup_date,
      pickup_time,
      delivery_address,
      delivery_zip,
      payment_method,
      items,
    } = body;

    // Validate required fields
    if (!user_id || !order_type || !pickup_date || !pickup_time || !payment_method || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate delivery fields if delivery type
    if (order_type === 'delivery' && (!delivery_address || !delivery_zip)) {
      return NextResponse.json(
        { error: 'Delivery address and zip code are required for delivery orders' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
    const deliveryFee = order_type === 'delivery' 
      ? calculateDeliveryFee(subtotal, config.delivery_fee, config.free_delivery_threshold)
      : 0;
    const total = subtotal + deliveryFee;

    // Generate order number
    const order_number = generateOrderNumber();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          order_number,
          user_id,
          status: 'pending',
          order_type,
          pickup_date,
          pickup_time,
          delivery_address: order_type === 'delivery' ? delivery_address : null,
          delivery_zip: order_type === 'delivery' ? delivery_zip : null,
          subtotal,
          delivery_fee: deliveryFee,
          total,
          payment_method,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: OrderItem) => ({
      order_id: order.id,
      product_name: item.product_name || item.name,
      size: item.size || null,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    // Get user info for notifications
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    // Send notifications
    if (user) {
      // Customer confirmation email
      if (features.emailNotifications && user.email) {
        const emailHtml = generateOrderConfirmationEmail(order, user.name);
        await sendEmailNotification(
          user.email,
          `Order Confirmation #${order_number}`,
          emailHtml
        );
      }

      // Customer confirmation SMS
      if (features.smsNotifications && user.phone) {
        const smsMessage = generateOrderConfirmationSMS(order);
        await sendSMSNotification(user.phone, smsMessage);
      }

      // Admin notification email
      if (features.emailNotifications && config.email) {
        const adminEmailHtml = generateAdminOrderNotificationEmail(
          order,
          user.name,
          user.email,
          user.phone
        );
        await sendEmailNotification(
          config.email,
          `New Order #${order_number} from ${user.name}`,
          adminEmailHtml
        );
      }
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get orders (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const status = searchParams.get('status');

    const supabase = createServerClient();
    let query = supabase.from('orders').select(`
      *,
      order_items (*)
    `).order('created_at', { ascending: false });

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(orders || []);
  } catch (error: any) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json([], { status: 200 });
  }
}

