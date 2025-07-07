import { memo, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AnimWrapper from '../components/UI/AnimWrapper';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaCopy, FaCheckCircle, FaTimes } from 'react-icons/fa';

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .min(5, 'Subject is too short')
    .max(100, 'Subject is too long')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .required('Message is required'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

function Contact() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailDetails, setEmailDetails] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Force a repaint/reflow to fix blank page issue
    const forceRepaint = () => {
      // Reading a property that causes reflow
      document.body.offsetHeight;
      
      // Ensure component is visible
      document.documentElement.style.visibility = 'visible';
    };
    
    // Execute immediately and after a small delay
    forceRepaint();
    const timeoutId = setTimeout(forceRepaint, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // First, try to use Web3Forms API (free, no setup required)
      // Get your free key from https://web3forms.com
      const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      // Only attempt API submission if we have a valid key from environment variables
      if (web3FormsAccessKey && web3FormsAccessKey.length > 0) {
        const formData = {
          access_key: web3FormsAccessKey,
          subject: `CCCK Contact Form: ${values.subject}`,
          from_name: values.name,
          email: values.email,
          message: `From: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
        };

        try {
          // Attempt to send via Web3Forms
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
          });

          const result = await response.json();

          if (result.success) {
            setStatus({ 
              success: true, 
              message: '✅ Your message has been sent successfully! We\'ll get back to you soon.' 
            });
            resetForm();
            return;
          }
        } catch (apiError) {
          console.log('API submission failed, falling back to other methods');
        }
      }

      // If API fails, prepare email details for fallback methods
      const emailBody = `From: ${values.name}
Email: ${values.email}
Subject: ${values.subject}

Message:
${values.message}`;

      const mailtoLink = `mailto:ccckmonasteries@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Store email details for modal
      setEmailDetails({
        to: 'ccckmonasteries@gmail.com',
        subject: values.subject,
        body: emailBody,
        mailtoLink: mailtoLink
      });

      // Try to open mailto link
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS || isAndroid) {
        // On mobile devices, mailto links usually work better
        window.location.href = mailtoLink;
        setStatus({ 
          success: true, 
          message: '📧 Opening your email app... If it doesn\'t open, please copy the email details from the popup.' 
        });
        setTimeout(() => setShowEmailModal(true), 2000);
      } else {
        // On desktop, check if mailto is likely to work
        const mailtoTest = document.createElement('a');
        mailtoTest.href = mailtoLink;
        
        // Try to detect if user has email client
        const hasEmailClient = window.navigator.registerProtocolHandler !== undefined;
        
        if (hasEmailClient) {
          // Create a hidden iframe to attempt mailto without leaving the page
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = mailtoLink;
          document.body.appendChild(iframe);
          
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 100);
          
          setStatus({ 
            success: true, 
            message: '📧 Check your email client! If no email app opened, click the button below to see email details.' 
          });
        } else {
          // Directly show the modal if no email client detected
          setShowEmailModal(true);
          setStatus({ 
            success: true, 
            message: '📋 Email details prepared! Copy them from the popup to send manually.' 
          });
        }
      }
      
      resetForm();
      
    } catch (error) {
      setStatus({ 
        success: false, 
        message: '❌ There was a problem processing your message. Please try the direct email option below.' 
      });
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16 pb-12">
      {/* Email Details Modal */}
      {showEmailModal && emailDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-blue-700">Email Details</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">To:</p>
                  <p className="font-['Montserrat'] font-medium">{emailDetails.to}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Subject:</p>
                  <p className="font-['Montserrat'] font-medium">{emailDetails.subject}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Message:</p>
                  <pre className="font-['Montserrat'] whitespace-pre-wrap text-sm">{emailDetails.body}</pre>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => copyToClipboard(emailDetails.body)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    {copySuccess ? (
                      <>
                        <FaCheckCircle className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy className="mr-2" />
                        Copy Email Content
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(emailDetails.to)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Copy Email Address
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-['Montserrat'] text-blue-800">
                    <strong>Instructions:</strong> Copy the email content above and paste it into your preferred email app or webmail service (Gmail, Outlook, etc.), then send to {emailDetails.to}
                  </p>
                </div>
                
                <div className="mt-4">
                  <a
                    href={emailDetails.mailtoLink}
                    className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    Try Opening Email Client Again
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              Contact <span className="text-red-600">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-700">
              We'd love to hear from you. Reach out to us with your questions, feedback, or prayer requests.
            </p>
          </AnimWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <AnimWrapper delay={0.3}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-blue-700">
                  Get In <span className="text-red-600">Touch</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-red-500 mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1 text-gray-800">Our Location</h3>
                      <p className="font-['Montserrat'] text-gray-700">1244-00502- KAREN, Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="text-blue-600 mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1 text-gray-800">Phone</h3>
                      <p className="font-['Montserrat'] text-gray-700">+254 757 537 700</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-red-500 mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1 text-gray-800">Email</h3>
                      <p className="font-['Montserrat'] text-gray-700 mb-2">ccckmonasteries@gmail.com</p>
                      <a 
                        href="mailto:ccckmonasteries@gmail.com"
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all duration-300 text-sm font-['Montserrat']"
                      >
                        <FaEnvelope className="mr-2 text-xs" />
                        Send Direct Email
                      </a>
                    </div>
                  </div>
                  
                  {/* Add alternative email options */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-['Montserrat'] font-bold mb-2 text-gray-800">Email Us Directly:</h4>
                    <div className="space-y-2 text-sm">
                      <a 
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=ccckmonasteries@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                      >
                        📧 Open in Gmail
                      </a>
                      <a 
                        href="https://outlook.live.com/mail/0/deeplink/compose?to=ccckmonasteries@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                      >
                        📧 Open in Outlook
                      </a>
                      <button
                        onClick={() => copyToClipboard('ccckmonasteries@gmail.com')}
                        className="text-blue-600 hover:underline text-left"
                      >
                        📋 Copy email address
                      </button>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-['Playfair_Display'] font-bold mt-10 mb-4 text-blue-700">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="bg-blue-100 hover:bg-red-100 p-3 rounded-full transition-all duration-300 text-blue-600 hover:text-red-600"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="bg-blue-100 hover:bg-red-100 p-3 rounded-full transition-all duration-300 text-blue-600 hover:text-red-600"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="bg-blue-100 hover:bg-red-100 p-3 rounded-full transition-all duration-300 text-blue-600 hover:text-red-600"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.5}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-blue-700">
                  Send Us a <span className="text-red-600">Message</span>
                </h2>
                
                <Formik
                  initialValues={{ 
                    name: '', 
                    email: '', 
                    subject: '', 
                    message: '',
                    acceptTerms: false
                  }}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, status }) => (
                    <Form className="space-y-4">
                      {status && (
                        <div className={`p-4 rounded font-['Montserrat'] ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {status.message}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block mb-1 font-['Montserrat'] font-medium text-gray-700">Name</label>
                        <Field 
                          type="text" 
                          name="name" 
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-red-300 font-['Montserrat'] transition-all"
                          placeholder="Your name"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1 font-['Montserrat']" />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1 font-['Montserrat'] font-medium text-gray-700">Email</label>
                        <Field 
                          type="email" 
                          name="email" 
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-red-300 font-['Montserrat'] transition-all"
                          placeholder="your.email@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1 font-['Montserrat']" />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block mb-1 font-['Montserrat'] font-medium text-gray-700">Subject</label>
                        <Field 
                          type="text" 
                          name="subject" 
                          id="subject"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-red-300 font-['Montserrat'] transition-all"
                          placeholder="Subject of your message"
                        />
                        <ErrorMessage name="subject" component="div" className="text-red-600 text-sm mt-1 font-['Montserrat']" />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block mb-1 font-['Montserrat'] font-medium text-gray-700">Message</label>
                        <Field 
                          as="textarea" 
                          name="message" 
                          id="message"
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-red-300 font-['Montserrat'] transition-all"
                          placeholder="Your message here..."
                        />
                        <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1 font-['Montserrat']" />
                      </div>
                      
                      <div className="flex items-start pt-2">
                        <div className="flex items-center h-5">
                          <Field 
                            type="checkbox" 
                            name="acceptTerms" 
                            id="acceptTerms"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-red-500 hover:ring-2 hover:ring-red-300 transition-all"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="acceptTerms" className="font-['Montserrat'] text-gray-700">
                            I agree to the <span className="text-red-600 hover:underline cursor-pointer">privacy policy</span> and <span className="text-blue-600 hover:underline cursor-pointer">terms of service</span>
                          </label>
                          <ErrorMessage name="acceptTerms" component="div" className="text-red-600 text-sm mt-1 font-['Montserrat']" />
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="w-full px-4 py-3 mt-2 text-white bg-blue-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 font-['Montserrat'] font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                        aria-label="Send Message"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                      
                      {/* Show email details button if form was submitted */}
                      {status && status.success && (
                        <button
                          type="button"
                          onClick={() => setShowEmailModal(true)}
                          className="w-full px-4 py-2 mt-2 text-blue-600 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-['Montserrat'] text-sm"
                        >
                          📋 View Email Details to Copy
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
                
                {/* Alternative: Always show manual email option */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 font-['Montserrat']">
                    Having trouble with the form? You can also email us directly:
                  </p>
                  <button
                    onClick={() => {
                      setEmailDetails({
                        to: 'ccckmonasteries@gmail.com',
                        subject: 'Contact from CCCK Website',
                        body: `To: ccckmonasteries@gmail.com\nSubject: [Your Subject Here]\n\nFrom: [Your Name]\nEmail: [Your Email]\n\nMessage:\n[Your Message Here]`,
                        mailtoLink: 'mailto:ccckmonasteries@gmail.com'
                      });
                      setShowEmailModal(true);
                    }}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 font-['Montserrat'] text-sm"
                  >
                    📧 Get Email Template
                  </button>
                </div>
              </div>
            </AnimWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}

function EnsureRenderedContact() {
  useEffect(() => {
    // Force a document repaint to fix blank page issue
    const repaint = () => {
      document.body.style.display = 'none';
      // The browser will flush CSS changes and apply them
      setTimeout(() => {
        document.body.style.display = '';
      }, 0);
    };
    
    // Execute after component mounts
    repaint();
    
    // Also set a small timeout for good measure
    const timeoutId = setTimeout(repaint, 50);
    return () => clearTimeout(timeoutId);
  }, []);
  
  return <Contact />;
}

export default memo(EnsureRenderedContact);