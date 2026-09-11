# 📧 EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to receive contact form submissions directly to your email.

## ⏱️ Setup Time: ~10 minutes

---

## 📋 Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Sign up using:
   - Google account (recommended - fastest)
   - Or email/password
4. Verify your email if needed

---

## 📧 Step 2: Connect Your Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (most common)
   - Outlook
   - Yahoo
   - Or any other provider

### For Gmail (Recommended):
1. Click **"Gmail"**
2. Click **"Connect Account"**
3. Sign in with your Google account
4. Allow EmailJS permissions
5. Your **Service ID** will be shown (looks like: `service_abc1234`)
6. **COPY THIS SERVICE ID** - you'll need it later
7. Click **"Create Service"**

---

## 📝 Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Replace the default template with this:

### Template Content:

**Subject Line:**
```
New Contact Form Submission: {{subject}}
```

**Email Body:**
```
New message from your portfolio contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{from_email}}

---
This message was sent from your portfolio website contact form.
```

4. Click **"Save"** (top right)
5. Your **Template ID** will be shown (looks like: `template_xyz5678`)
6. **COPY THIS TEMPLATE ID** - you'll need it later

---

## 🔑 Step 4: Get Your Public Key

1. Click on your **profile icon** (top right)
2. Select **"Account"**
3. Go to **"General"** tab
4. Find **"Public Key"** (looks like: `abcDEF123xyz`)
5. **COPY THIS PUBLIC KEY**

---

## ⚙️ Step 5: Configure Your Portfolio

1. Open your portfolio project folder
2. Find the `.env` file in the root directory
3. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=abcDEF123xyz
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
```

**Example with real values:**
```env
VITE_EMAILJS_PUBLIC_KEY=9kP7mX4nQ2tL8wZ
VITE_EMAILJS_SERVICE_ID=service_gmail_123
VITE_EMAILJS_TEMPLATE_ID=template_contact_456
```

4. **SAVE** the `.env` file
5. **Restart your dev server** (stop and run `npm run dev` again)

---

## ✅ Step 6: Test Your Contact Form

1. Go to your portfolio: `http://localhost:5173/`
2. Navigate to the **Contact** section
3. Fill out the form with test data:
   - Name: Test User
   - Email: your-email@gmail.com (use your real email)
   - Subject: Test Message
   - Message: This is a test to verify EmailJS is working!
4. Click **"Send Message"**
5. You should see a green success message
6. **Check your email inbox** - you should receive the message within 1-2 minutes

---

## 🎯 Troubleshooting

### ❌ "EmailJS is not configured yet"
**Solution:** Make sure you:
- Replaced ALL THREE values in `.env` file
- Restarted the dev server after editing `.env`
- Saved the `.env` file

### ❌ "Failed to send message"
**Solution:** 
- Double-check your Service ID, Template ID, and Public Key
- Make sure you're using the correct email service (Gmail, Outlook, etc.)
- Verify your email service is connected in EmailJS dashboard

### ❌ Form submits but no email received
**Solution:**
- Check your spam/junk folder
- Go to EmailJS dashboard → "Email Services" → verify service is "Active"
- Check if you've exceeded the free tier limit (200 emails/month)

### ❌ "Invalid email" or validation error
**Solution:**
- Make sure you're entering a valid email address (user@domain.com format)
- All required fields (Name, Email, Message) must be filled

---

## 📊 Free Tier Limits

EmailJS free tier includes:
- ✅ **200 emails per month**
- ✅ **2 email services**
- ✅ **2 email templates**
- ✅ **Full features** (no restrictions)

This is more than enough for a portfolio website!

---

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (not committed to GitHub)
- ✅ Public Key is safe to expose (it's meant to be public)
- ✅ EmailJS handles spam protection automatically
- ✅ Your email credentials are never exposed

---

## 🚀 Going Live (Deployment)

When deploying to **Vercel**, **Netlify**, or other platforms:

1. Go to your hosting platform's dashboard
2. Find **"Environment Variables"** settings
3. Add these three variables:
   ```
   VITE_EMAILJS_PUBLIC_KEY = your_public_key
   VITE_EMAILJS_SERVICE_ID = your_service_id
   VITE_EMAILJS_TEMPLATE_ID = your_template_id
   ```
4. Redeploy your site

---

## 📧 What Happens When Someone Contacts You?

1. User fills out contact form on your portfolio
2. EmailJS sends the message to your email inbox
3. You receive a formatted email with:
   - Sender's name
   - Sender's email address
   - Subject line
   - Message content
4. You can reply directly from your email inbox

---

## 🎉 That's It!

Your contact form is now fully functional! Messages will be delivered directly to your email inbox.

If you have any issues, check the troubleshooting section above or visit [EmailJS Documentation](https://www.emailjs.com/docs/).

---

## 💡 Pro Tips

- **Test regularly**: Send yourself test messages to ensure everything works
- **Check spam**: Sometimes the first email might land in spam
- **Monitor usage**: Keep track of your monthly email limit in EmailJS dashboard
- **Custom domain**: Consider upgrading if you need more than 200 emails/month

Happy coding! 🚀
