# Airtable AI Assistant Prompt

Copy and paste this entire prompt into Airtable's AI assistant:

---

**I need to set up a database for my bakery website's user accounts. Please help me create:**

1. **A new base** called "Bakery Users"

2. **A table** called "Users" with the following fields (columns):
   - **Name** (Field type: Single line text)
   - **Email** (Field type: Email)
   - **Phone** (Field type: Phone number)
   - **Zip Code** (Field type: Single line text)
   - **Created** (Field type: Date with time)

The field names must be exactly as written above (case-sensitive). This table will store customer account information for my website's login system. Users will be identified by their phone number, and I need to be able to search for users by phone number.

After creating this, please show me:
- How to find my API key
- How to find my Base ID
- How to view the API documentation for this base

---

## After Airtable AI Creates It

Once the AI creates your base and table, you'll need to:

1. **Get your API Key (Personal Access Token):**
   - Go to https://airtable.com → Account icon → **Account**
   - Scroll to **Developer options** or go to: https://airtable.com/create/tokens
   - Click **Create new token**
   - Name: "Bakery Website"
   - Scopes: `data.records:read` and `data.records:write`
   - Access: Select your "Bakery Users" base
   - **Copy the token immediately** (starts with `pat...`) - you can't see it again!

2. **Get your Base ID:**
   - Go to https://airtable.com/api
   - Click on your "Bakery Users" base
   - Look at the URL or the code examples - you'll see something like `base('appXXXXXXXXXXXXXX')`
   - The Base ID is the part after `app` (the X's)

3. **Add to Netlify:**
   - Go to Netlify Dashboard → Your Site → Site settings → Environment variables
   - Add `AIRTABLE_API_KEY` = your API key
   - Add `AIRTABLE_BASE_ID` = your Base ID

