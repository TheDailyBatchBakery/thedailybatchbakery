# Setup Verification Checklist

Use this checklist to ensure everything is set up correctly before testing.

## ✅ Airtable Setup

- [ ] Created Airtable account
- [ ] Created base called "Bakery Users" (or used AI prompt)
- [ ] Created table called "Users" (exact name, case-sensitive)
- [ ] Added field: **Name** (Single line text)
- [ ] Added field: **Email** (Email type)
- [ ] Added field: **Phone** (Phone number type)
- [ ] Added field: **Zip Code** (Single line text - note the space!)
- [ ] Added field: **Created** (Date with time - optional but recommended)
- [ ] Verified field names match exactly (case-sensitive)

## ✅ Airtable API Credentials

- [ ] Got API Key (starts with `pat...`)
  - Location: https://airtable.com/api or Account Settings → Developer → Personal access tokens
  - Scopes needed: `data.records:read` and `data.records:write`
- [ ] Got Base ID (looks like `appXXXXXXXXXXXXXX`)
  - Location: https://airtable.com/api → Click your base → Look in URL or code examples

## ✅ Netlify Environment Variables

- [ ] Added `AIRTABLE_API_KEY` environment variable
  - Location: Netlify Dashboard → Site settings → Environment variables
  - Value: Your Airtable API key
  - Scopes: All scopes (or at least Production)
- [ ] Added `AIRTABLE_BASE_ID` environment variable
  - Location: Same as above
  - Value: Your Airtable Base ID
  - Scopes: All scopes (or at least Production)
- [ ] Clicked "Save" after adding both variables

## ✅ Code Files

- [ ] `netlify/functions/getUserByPhone.js` exists
- [ ] `netlify/functions/createUser.js` exists
- [ ] `package.json` exists with airtable dependency
- [ ] All files committed to GitHub

## ✅ Deployment

- [ ] Pushed code to GitHub
- [ ] Netlify auto-deployed successfully
- [ ] Checked Netlify deploy logs for any errors
- [ ] Functions are accessible (Netlify will show function URLs in deploy logs)

## ✅ Testing Steps

1. **Test Signup:**
   - [ ] Sign up with a test account on one device
   - [ ] Check Airtable - user should appear in "Users" table
   - [ ] Welcome banner should show immediately

2. **Test Cross-Device Login:**
   - [ ] On a different device/browser, try to log in with same phone number
   - [ ] Should successfully log in
   - [ ] Welcome banner should show

3. **Test Duplicate Prevention:**
   - [ ] Try to sign up again with same phone number
   - [ ] Should recognize existing user (not create duplicate)
   - [ ] Should not send duplicate Netlify Forms notification

## 🔍 Common Issues & Fixes

### Issue: "User not found" when trying to log in
- **Check:** Airtable table is named exactly "Users" (case-sensitive)
- **Check:** Phone field in Airtable is set to "Phone number" type
- **Check:** Environment variables are set correctly in Netlify

### Issue: Functions return 500 error
- **Check:** Environment variables are set in Netlify
- **Check:** API key has correct scopes (read and write)
- **Check:** Base ID is correct
- **Check:** Netlify deploy logs for specific error messages

### Issue: Field name errors
- **Check:** Field names in Airtable match exactly:
  - `Name` (not "name" or "NAME")
  - `Email` (not "email")
  - `Phone` (not "phone")
  - `Zip Code` (with space, capital Z and C)
  - `Created` (optional, but if exists must be "Created")

### Issue: Functions not found (404)
- **Check:** Files are in `netlify/functions/` folder
- **Check:** Files are committed and pushed to GitHub
- **Check:** Netlify has redeployed after adding functions

## 📝 Notes

- The `Created` field is optional - if you don't create it, the system will still work
- Phone numbers are automatically normalized (all non-digits removed)
- Users are cached locally for faster access, but always synced with Airtable
- You can view all users anytime by logging into Airtable

