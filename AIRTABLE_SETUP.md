# Airtable Setup Instructions

**IMPORTANT: Users of your website do NOT need Airtable accounts!** Airtable is only used as a backend database that you (the site owner) access. Your customers never see or interact with Airtable - they only use your website.

Follow these steps to set up Airtable for cross-device user login.

## Step 1: Create Your Airtable Base

**Option A: Use Airtable AI Assistant**
1. Log in to your Airtable account at https://airtable.com
2. Look for the AI assistant (usually in the top right or as a chat icon)
3. Copy the prompt from `AIRTABLE_AI_PROMPT.md` and paste it to the AI
4. The AI will create everything for you!

**Option B: Manual Setup**
1. Log in to your Airtable account at https://airtable.com
2. Click "Add a base" → "Start from scratch"
3. Name it "Bakery Users" (or any name you prefer)

## Step 2: Create the Users Table

1. Your base will have a default table called "Table 1"
2. Rename it to "Users" (double-click the table name)
3. Set up the following columns (fields):

### Column Setup:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Name | Single line text | - |
| Email | Email | - |
| Phone | Phone number | - |
| Zip Code | Single line text | - |
| Created | Date | Include time: Yes |

**Important:** The field names must match exactly:
- `Name` (capital N)
- `Email` (capital E)
- `Phone` (capital P)
- `Zip Code` (with space and capital Z and C)
- `Created` (capital C)

## Step 3: Get Your API Key (Personal Access Token)

1. Go to https://airtable.com → Click your account icon (top right) → **Account**
2. Scroll down to **Developer options** or go directly to: https://airtable.com/create/tokens
3. Click **Create new token**
4. Name it "Bakery Website" (or any name)
5. Set expiration: **No expiration** (or choose your preference)
6. Under **Scopes**, select:
   - `data.records:read`
   - `data.records:write`
7. Under **Access**, select your "Bakery Users" base
8. Click **Create token**
9. **IMPORTANT:** Copy the token immediately (starts with `pat...`) - you won't be able to see it again!
10. Save it somewhere safe

## Step 4: Get Your Base ID

1. Still on the API page for your base
2. Look at the URL or the code examples
3. Find your Base ID (looks like `appXXXXXXXXXXXXXX`)
4. Copy it

## Step 5: Add Environment Variables to Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add these two variables:

   **Variable 1:**
   - Key: `AIRTABLE_API_KEY`
   - Value: (paste your API key from Step 3)
   - Scopes: All scopes (or just Production, Deploy previews, Branch deploys)

   **Variable 2:**
   - Key: `AIRTABLE_BASE_ID`
   - Value: (paste your Base ID from Step 4)
   - Scopes: All scopes (or just Production, Deploy previews, Branch deploys)

6. Click **Save**

## Step 6: Deploy to Netlify

1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Airtable integration for cross-device login"
   git push
   ```

2. Netlify will automatically deploy
3. The functions will be available at:
   - `/.netlify/functions/getUserByPhone`
   - `/.netlify/functions/createUser`

## Step 7: Test

1. Try signing up on one device
2. Try logging in on a different device with the same phone number
3. It should work! 🎉

## Troubleshooting

- **Functions not working?** Make sure you've added the environment variables in Netlify
- **"User not found" errors?** Check that your Airtable table is named "Users" exactly
- **Field name errors?** Make sure field names match exactly (case-sensitive)

## Viewing Users

You can view all registered users in your Airtable base at any time. Just log in to Airtable and open your base!

