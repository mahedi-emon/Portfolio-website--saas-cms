import type { Handler } from '@netlify/functions';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing env vars - SUPABASE_URL:', !!SUPABASE_URL, 'SUPABASE_SERVICE_KEY:', !!SUPABASE_SERVICE_KEY);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server configuration error. Please contact administrator.' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || '{}');

    // Validate input
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    // Insert into Supabase using service role key (bypasses RLS)
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        status: 'new',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Supabase error:', data);
      throw new Error(data.message || data.error || 'Failed to save message');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to send message',
      }),
    };
  }
};
