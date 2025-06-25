# Email Setup Guide for CCCK Contact Form

The contact form is now configured to send emails using EmailJS, with a fallback to the user's default email client.

## Current Status
- ✅ Form validation working
- ✅ Fallback to mailto links (opens user's email client)
- ⏳ EmailJS integration ready (needs configuration)

## To Enable Direct Email Sending (Optional)

If you want emails to be sent directly without opening the user's email client, follow these steps:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

Message:
{{message}}

---
This message was sent via the CCCK website contact form.
```

4. Note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

### 5. Update Configuration
In `src/pages/Contact.jsx`, replace these placeholders:
- `service_ccck_contact` → Your Service ID
- `template_ccck_contact` → Your Template ID  
- `your_emailjs_public_key` → Your Public Key

## How It Works Now

**Without EmailJS setup:**
- User fills out the form
- Clicking "Send Message" opens their email client
- Email is pre-filled with their message
- User sends the email manually

**With EmailJS setup:**
- User fills out the form
- Email is sent directly to ccckmonasteries@gmail.com
- User receives confirmation message
- No additional steps required

## Benefits of EmailJS Setup
- ✅ Seamless user experience
- ✅ No email client dependency
- ✅ Automatic email delivery
- ✅ Professional appearance
- ✅ Email delivery tracking

## Current Fallback Benefits
- ✅ Works immediately without setup
- ✅ Uses user's preferred email client
- ✅ User maintains control over sending
- ✅ No third-party dependencies
- ✅ Works offline

Both approaches ensure that users can contact CCCK successfully! 