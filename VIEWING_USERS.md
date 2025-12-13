# How to View and Manage Users

## 📊 Viewing Users in Airtable

All users who sign up on your website are automatically saved to your Airtable base. Here's how to view them:

### Step 1: Log into Airtable
1. Go to https://airtable.com
2. Sign in with your Airtable account

### Step 2: Open Your Base
1. Find and click on your "Bakery Users" base (or whatever you named it)
2. You'll see your base dashboard

### Step 3: View the Users Table
1. Click on the **"Users"** table (should be the main table)
2. You'll see all registered users in a spreadsheet-like view

### What You'll See
Each row represents a user with these columns:
- **Name** - User's full name
- **Email** - User's email address
- **Phone** - User's phone number (normalized, digits only)
- **Zip Code** - User's Las Vegas zip code
- **Created** - Date and time when they signed up (if you added this field)

## 🔍 Troubleshooting: Users Not Appearing?

If you don't see users in Airtable after someone signs up, check these:

### 1. Check Netlify Environment Variables
- Go to Netlify Dashboard → Your Site → **Site settings** → **Environment variables**
- Verify both variables exist:
  - `AIRTABLE_API_KEY` (should start with `pat...`)
  - `AIRTABLE_BASE_ID` (should start with `app...`)
- Make sure they're set for **Production** scope (or All scopes)

### 2. Check Netlify Function Logs
1. Go to Netlify Dashboard → Your Site
2. Click **Functions** in the left sidebar
3. Look for `createUser` function
4. Click on it to see recent invocations
5. Check for any error messages

### 3. Check Browser Console
1. Open your website
2. Press F12 (or right-click → Inspect)
3. Go to **Console** tab
4. Try signing up with a test account
5. Look for any red error messages

### 4. Verify Airtable Setup
- **Table name:** Must be exactly `Users` (case-sensitive)
- **Field names:** Must match exactly:
  - `Name` (capital N)
  - `Email` (capital E)
  - `Phone` (capital P)
  - `Zip Code` (with space, capital Z and C)
- **API Key scopes:** Must have `data.records:read` and `data.records:write`
- **Base access:** Your token must have access to the base

### 5. Test the Function Directly
You can test if the function is working by checking the Netlify deploy logs:
1. Netlify Dashboard → Your Site → **Deploys**
2. Click on the latest deploy
3. Check for any function errors

## 📝 Managing Users in Airtable

### View User Details
- Click on any row to see full user information
- You can edit fields directly in Airtable

### Filter and Search
- Use the filter button to find specific users
- Search by name, email, or phone number

### Export Data
- Click the three dots (⋯) menu
- Select **Export** to download as CSV or Excel

### Delete Users (if needed)
- Select a row and press Delete
- Or right-click → Delete record

## 🎯 Quick Verification Test

To verify everything is working:

1. **Sign up a test account** on your website
2. **Wait 2-3 seconds** for the function to complete
3. **Refresh your Airtable base**
4. **Check the Users table** - you should see the new user

If the user appears, everything is working! ✅

If not, check the troubleshooting steps above.

## 💡 Pro Tips

- **Real-time updates:** Airtable updates in real-time, so new users should appear within seconds
- **Multiple devices:** Users can sign up from any device, and they'll all appear in the same Airtable table
- **No duplicates:** The system prevents duplicate accounts (same phone number)
- **Backup:** Airtable automatically backs up your data

