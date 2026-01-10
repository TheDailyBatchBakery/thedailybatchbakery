import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// GET /api/products - Get all products (with optional category filter)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const supabase = createServerClient();
    let query = supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products || []);
  } catch (error: any) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, category, description, image_url, has_size, size_options } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          price,
          category,
          description: description || null,
          image_url: image_url || null,
          has_size: has_size || false,
          size_options: size_options || null,
          active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/products:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

