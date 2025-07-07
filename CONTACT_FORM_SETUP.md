# Contact Form Setup Guide

## Overview
The contact form on the CCC Kenya website now has multiple fallback methods to ensure messages can be sent regardless of the user's email client setup.

## Form Submission Flow

1. **Primary Method**: Web3Forms API (sends email directly)
2. **Fallback Method 1**: mailto: link (opens user's email client)
3. **Fallback Method 2**: Copy email details modal (manual copy/paste)

## Setting Up Web3Forms (Recommended)

Web3Forms is a free service that allows form submissions without a backend server.

### Step 1: Get Your Free Access Key

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter your email address where you want to receive form submissions
3. Click "Create Access Key"
4. Check your email for the access key

### Step 2: Update the Contact Form

1. Open `src/pages/Contact.jsx`
2. Find this line (around line 61):
   ```javascript
   const web3FormsAccessKey = '6d4f7e8c-9b5a-4d8e-a1f3-2b4c5d6e7f8a'; // This is a placeholder
   ```
3. Replace the placeholder key with your actual Web3Forms access key

### Step 3: Configure Web3Forms (Optional)

You can customize Web3Forms settings:
- Set up custom email templates
- Add CC recipients
- Enable auto-responses
- Set up webhooks

Visit your Web3Forms dashboard to configure these options.

## Alternative: Using Environment Variables

For better security, store the access key in an environment variable:

1. Create a `.env` file in your project root:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-actual-access-key-here
   ```

2. Update `src/pages/Contact.jsx`:
   ```javascript
   const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '6d4f7e8c-9b5a-4d8e-a1f3-2b4c5d6e7f8a';
   ```

3. Add `.env` to your `.gitignore` file

## How the Fallback System Works

### For Users WITH Email Clients:
- Form attempts to open their default email client
- Pre-fills the email with form data
- Shows a "View Email Details" button as backup

### For Users WITHOUT Email Clients:
- Automatically shows a modal with copyable email details
- Provides direct links to Gmail and Outlook web
- Includes copy buttons for easy clipboard access

### Manual Email Option:
- Always available at the bottom of the form
- Opens a template that users can customize
- Works for everyone regardless of setup

## Testing the Contact Form

1. **Test with Web3Forms disabled**: Comment out the API call to test fallbacks
2. **Test on mobile**: Mailto links work differently on mobile devices
3. **Test without email client**: Use a browser in incognito mode
4. **Test copy functionality**: Ensure clipboard API works in your browser

## Troubleshooting

### Form not sending emails:
- Check Web3Forms access key is valid
- Verify email address in Web3Forms dashboard
- Check browser console for errors

### Mailto link opens blank tab:
- This happens when Chrome is set as the mailto handler
- The form now detects this and shows the copy modal instead

### Copy button not working:
- Some browsers require HTTPS for clipboard API
- Fallback: Users can manually select and copy text

## Email Services That Work With Mailto:

### Desktop:
- Outlook
- Thunderbird
- Apple Mail
- Any installed email client

### Web-based (with browser extensions):
- Gmail (with "Mailto: for Gmail" extension)
- Outlook.com (with proper browser settings)

## Contact Form Features

✅ Multiple submission methods
✅ Mobile-friendly
✅ No email client required
✅ Copy-to-clipboard functionality
✅ Direct webmail links
✅ Form validation
✅ Success/error messages
✅ Accessible design

## Future Enhancements

Consider these improvements:
1. Add reCAPTCHA for spam protection
2. Implement rate limiting
3. Add file attachment support
4. Create a thank you page
5. Add email templates for common inquiries 