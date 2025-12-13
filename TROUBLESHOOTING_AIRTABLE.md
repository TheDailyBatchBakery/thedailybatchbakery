# Troubleshooting: Users Not Appearing in Airtable

## Quick Checklist

Let's verify your setup step by step:

### Step 1: Verify Airtable Table Structure

1. Go to https://airtable.com and open your "Bakery Users" base
2. Click on the "Users" table
3. Check that you have these **exact** field names (case-sensitive):
   - `Name` (not "name" or "NAME")
   - `Email` (not "email")
   - `Phone` (not "phone")
   - `Zip Code` (with space, capital Z and C)
   - `Created` (optional - can be Date type or Single line text)

**Important:** Field names must match EXACTLY, including capitalization and spaces.

### Step 2: Check Netlify Environment Variables

1. Go to Netlify Dashboard → Your Site
2. Click **Site settings** → **Environment variables**
3. Verify you have:
   - `AIRTABLE_API_KEY` (should start with `pat...`)
   - `AIRTABLE_BASE_ID` (should start with `app...`)
4. Make sure both are set for **Production** scope (or All scopes)
5. If you just added them, you may need to **redeploy** your site

### Step 3: Test the Function

1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Try signing up with a test account
5. Watch for any red error messages

### Step 4: Check Netlify Function Logs

1. Go to Netlify Dashboard → Your Site
2. Click **Functions** in left sidebar
3. Click on **createUser** function
4. Look at recent invocations
5. Check for any error messages

### Step 5: Verify API Key Permissions

1. Go to https://airtable.com/create/tokens
2. Find your token (the one you're using)
3. Make sure it has these scopes:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
4. Make sure it has access to your "Bakery Users" base

## Common Issues & Fixes

### Issue: "Table not found" or "Field not found" errors

**Fix:**
- Check that table is named exactly `Users` (capital U, lowercase rest)
- Check that field names match exactly (see Step 1 above)
- Field names are case-sensitive!

### Issue: Functions return 500 error

**Possible causes:**
1. Environment variables not set in Netlify
2. API key doesn't have correct permissions
3. Base ID is incorrect
4. Table/field names don't match

**Fix:**
- Double-check environment variables in Netlify
- Verify API key has read/write permissions
- Verify Base ID is correct
- Check field names match exactly

### Issue: Function works but users don't appear

**Possible causes:**
1. Looking at wrong base/table
2. Table is filtered
3. Need to refresh Airtable

**Fix:**
- Make sure you're looking at the correct base
- Clear any filters in Airtable
- Refresh the page (F5)

### Issue: "User not found" when trying to log in

**Possible causes:**
1. User wasn't actually created in Airtable
2. Phone number format mismatch
3. Table/field name issues

**Fix:**
- Check if user exists in Airtable
- Phone numbers are normalized (digits only) - check format matches

## Testing Steps

1. **Clear your browser cache** and try signing up again
2. **Check browser console** for errors during signup
3. **Check Netlify function logs** to see if function is being called
4. **Try a test signup** with a unique phone number
5. **Wait 5-10 seconds** after signup, then refresh Airtable

## Still Not Working?

If users still aren't appearing, we need to check:
1. Browser console errors (F12 → Console)
2. Netlify function logs (Dashboard → Functions → createUser)
3. Airtable table structure (field names)
4. Environment variables in Netlify

Let me know what you find!

