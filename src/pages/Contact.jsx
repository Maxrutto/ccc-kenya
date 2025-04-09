import { memo } from 'react';
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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair text-secondary">
              Contact Us
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12">
              We'd love to hear from you. Reach out to us with your questions, feedback, or prayer requests.
            </p>
          </AnimWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <AnimWrapper delay={0.3}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-secondary mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Our Location</h3>
                      <p>Conference of Contemplative Communities of Kenya, Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="text-secondary mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p>+254 123 456 789</p>
                      <p>+254 987 654 321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-secondary mt-1 mr-4 text-xl flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p>info@ccckenya.org</p>
                      <p>contact@ccckenya.org</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mt-10 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="bg-primary hover:bg-primary-dark p-3 rounded-full transition-colors text-secondary"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="bg-primary hover:bg-primary-dark p-3 rounded-full transition-colors text-secondary"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="bg-primary hover:bg-primary-dark p-3 rounded-full transition-colors text-secondary"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.5}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
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
                        <div className={`p-4 rounded ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {status.message}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <Field 
                          type="text" 
                          name="name" 
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
                          placeholder="Your name"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <Field 
                          type="email" 
                          name="email" 
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
                          placeholder="your.email@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
                        <Field 
                          type="text" 
                          name="subject" 
                          id="subject"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
                          placeholder="Subject of your message"
                        />
                        <ErrorMessage name="subject" component="div" className="text-red-600 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                        <Field 
                          as="textarea" 
                          name="message" 
                          id="message"
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-secondary"
                          placeholder="Your message here..."
                        />
                        <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <Field 
                            type="checkbox" 
                            name="acceptTerms" 
                            id="acceptTerms"
                            className="mr-2"
                          />
                          <span>I agree to the privacy policy and terms of service</span>
                        </label>
                        <ErrorMessage name="acceptTerms" component="div" className="text-red-600 text-sm mt-1" />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn w-full"
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

export default memo(Contact);