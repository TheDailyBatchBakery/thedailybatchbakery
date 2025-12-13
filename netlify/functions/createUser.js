// Netlify Function to create a new user in Airtable
const Airtable = require('airtable');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone, zipcode } = JSON.parse(event.body);
    
    if (!name || !email || !phone || !zipcode) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Normalize phone number
    const normalizedPhone = phone.replace(/\D/g, '');

    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

    // Check if user already exists
    const existingRecords = await base('Users').select({
      filterByFormula: `{Phone} = "${normalizedPhone}"`,
      maxRecords: 1
    }).firstPage();

    if (existingRecords.length > 0) {
      // User exists, return existing user
      const user = existingRecords[0].fields;
      const userId = existingRecords[0].id;
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          name: user.Name,
          email: user.Email,
          phone: user.Phone,
          zipcode: user['Zip Code'],
          exists: true
        })
      };
    }

    // Create new user
    const fields = {
      'Name': name,
      'Email': email,
      'Phone': normalizedPhone,
      'Zip Code': zipcode
    };
    
    // Note: Created field is optional - only include if it exists in your Airtable table
    // If you want to track creation dates, add a "Created" field (Date type) in Airtable first
    
    const records = await base('Users').create([{ fields }]);

    const newUser = records[0].fields;
    const userId = records[0].id;

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        name: newUser.Name,
        email: newUser.Email,
        phone: newUser.Phone,
        zipcode: newUser['Zip Code'],
        exists: false
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};

