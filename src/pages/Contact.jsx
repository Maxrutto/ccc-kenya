import { memo, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AnimWrapper from '../components/UI/AnimWrapper';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

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

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // In a real app, you'd send the form data to your backend or API
      console.log('Form values:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ success: true, message: 'Thank you! Your message has been sent successfully.' });
      resetForm();
    } catch (error) {
      setStatus({ success: false, message: 'There was a problem sending your message. Please try again.' });
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16 pb-12">
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
                      <p className="font-['Montserrat'] text-gray-700">0757537700</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-red-500 mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1 text-gray-800">Email</h3>
                      <p className="font-['Montserrat'] text-gray-700">ccckmonasteries@gmail.com</p>
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
                        className="w-full px-4 py-3 mt-2 text-white bg-blue-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 font-['Montserrat'] font-medium"
                        disabled={isSubmitting}
                        aria-label="Send Message"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </Form>
                  )}
                </Formik>
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