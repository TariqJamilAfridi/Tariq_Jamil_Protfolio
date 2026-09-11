# 🧪 Testing Your EmailJS Setup

## Step-by-Step Verification

### 1️⃣ **Check Your .env File**

Your current `.env` file has:
```
VITE_EMAILJS_PUBLIC_KEY=N-mPGi4Zr7NqiUU_v
VITE_EMAILJS_SERVICE_ID=service_plazfpn
VITE_EMAILJS_TEMPLATE_ID=template_9ftqvwy
```

✅ All three values are filled in (good!)

---

### 2️⃣ **Restart Dev Server**

Environment variables are only loaded when the server starts.

**You MUST restart:**

```bash
# Stop current server (Ctrl+C in terminal)
# Then start again:
npm run dev
```

⚠️ **If you haven't restarted after editing .env, that's the problem!**

---

### 3️⃣ **Open Browser Console**

1. Open your portfolio: http://localhost:5175/
2. Open Developer Tools:
   - **Windows**: Press `F12` or `Ctrl+Shift+I`
   - **Mac**: Press `Cmd+Option+I`
3. Go to the **Console** tab
4. Try submitting the contact form
5. Check the console output

---

### 4️⃣ **What to Look For in Console**

#### ✅ **Success Pattern:**
```
EmailJS Config Check:
Service ID: ✓ Set
Template ID: ✓ Set
Public Key: ✓ Set

Sending email with params: {from_name: "...", ...}
EmailJS Response: {status: 200, text: "OK"}
```

#### ❌ **Error Patterns & Solutions:**

**Pattern 1: Missing Configuration**
```
Service ID: ✗ Missing
Template ID: ✗ Missing
Public Key: ✗ Missing
```
**Solution:** Dev server wasn't restarted after editing .env

---

**Pattern 2: Status 400 - Bad Request**
```
Error status: 400
```
**Solution:** One of your IDs is incorrect. Double-check:
- Service ID in EmailJS dashboard vs .env
- Template ID in EmailJS dashboard vs .env
- Public Key in EmailJS Account settings vs .env

---

**Pattern 3: Status 412 - Precondition Failed**
```
Error status: 412
The template ID is invalid or the template has no content
```
**Solution:** 
- Your template doesn't exist or is not saved
- Template variables don't match
- Go to EmailJS → Email Templates → Check template exists

---

**Pattern 4: Status 422 - Invalid Email**
```
Error status: 422
```
**Solution:** Check the email address you entered is valid

---

### 5️⃣ **Verify EmailJS Dashboard**

Go to https://dashboard.emailjs.com/

#### Check Service:
1. Go to **"Email Services"**
2. Find your service: `service_plazfpn`
3. Status should be **"Active"** (green)
4. If it says "Not Connected", click "Reconnect"

#### Check Template:
1. Go to **"Email Templates"**
2. Find your template: `template_9ftqvwy`
3. Click to edit it
4. **Make sure it has these variables:**
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_name}}` (optional)

**Example template that works:**

**Subject:**
```
New Contact: {{subject}}
```

**Content:**
```
New message from: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

5. Click **"Save"** (important!)

---

### 6️⃣ **Test with Simple Values**

Fill the form with:
- **Name:** Test User
- **Email:** your-real-email@gmail.com (use YOUR email)
- **Subject:** Test
- **Message:** This is a test message

Click **"Send Message"**

---

### 7️⃣ **Check Your Email Inbox**

- Check your email (the one connected to EmailJS)
- Look in **Spam/Junk** folder too
- Email should arrive within 1-2 minutes

---

## 🔧 Quick Fixes

### Fix 1: Restart Dev Server
```bash
# Press Ctrl+C to stop
npm run dev
```

### Fix 2: Clear Browser Cache
- Press `Ctrl+Shift+Delete`
- Clear "Cached images and files"
- Reload page with `Ctrl+F5`

### Fix 3: Check Network Tab
1. Open DevTools → Network tab
2. Submit form
3. Look for request to `api.emailjs.com`
4. Click on it to see the response

### Fix 4: Verify Template Variables

Your template MUST include these EXACT variable names:
- `{{from_name}}` (not `{{name}}`)
- `{{from_email}}` (not `{{email}}`)
- `{{subject}}`
- `{{message}}`

Variable names are case-sensitive and must match exactly!

---

## 🆘 Still Not Working?

### Share These Details:

1. **Console Output** (copy everything in red from console)

2. **Network Response** (from Network tab):
   - Status code
   - Response body

3. **EmailJS Dashboard Status**:
   - Is service "Active"?
   - Does template exist?
   - Are template variables correct?

4. **Did you restart the dev server?** (Yes/No)

---

## ✅ Success Checklist

- [ ] Restarted dev server after editing .env
- [ ] All 3 credentials are in .env file
- [ ] Service is "Active" in EmailJS dashboard
- [ ] Template exists and is saved in EmailJS
- [ ] Template has correct variable names
- [ ] Browser console shows "✓ Set" for all configs
- [ ] No errors in browser console
- [ ] Tested with valid email address

---

## 📞 Next Steps

Once you see the success message in the console, check your email inbox (and spam folder) for the test message.

If you're still getting errors after checking everything above, copy the **EXACT error message from the console** and I can help you debug further!
