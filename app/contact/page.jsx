'use client'
import React from 'react'
import Navbar from '../../components/Navbar';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import axios from 'axios';
import { useState } from 'react';
import Footer from '../../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await axios.post('/api/send', formData);
      setIsSent(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error("Error:", err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        {/* Header Section */}
        <div className="flex flex-col items-end pt-12 w-full">
          <p className="text-2xl font-medium">Contact Us</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row gap-12 mt-12 pb-20">
          {/* Contact Information */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions about our products or need assistance with your order? 
              Our team is here to help you with any inquiries you may have.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <FiMail className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-gray-600">sales@glowingstore.com</p>
                  <p className="text-gray-600">siyamregnyeshidagna777@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <FiPhone className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Call Us</h3>
                  <p className="text-gray-600">+ (251) 961177953</p>
                  <p className="text-gray-600">Mon-Fri: 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <FiMapPin className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Visit Us</h3>
                  <p className="text-gray-600">132 Bole Street</p>
                  <p className="text-gray-600">Addis Ababa, 4-kilo sheraton</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <FiClock className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            {/* Success/Error Messages */}
          {isSent && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Message sent successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
            <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="subject"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="your subject"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <input
                type="message"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="your message"
                required
              />
            </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden mb-20">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21709.92205772725!2d38.744074490664694!3d9.021049626671175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85930b17ec2f%3A0x8a433f2230326db!2sSheraton%20Addis%2C%20a%20Luxury%20Collection%20Hotel%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1745650048075!5m2!1sen!2set" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">

          </iframe>
        </div>

        {/* FAQ Section */}
        <div className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days. Express options are available at checkout."
              },
              {
                question: "What is your return policy?",
                answer: "We offer 30-day returns for unused items with original packaging. Some exclusions apply."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by destination."
              },
              {
                question: "How can I track my order?",
                answer: "You'll receive a tracking number via email once your order ships. Click the link to track your package."
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
    
  )
}

export default Contact