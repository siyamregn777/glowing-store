import React from 'react'
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import image from "../../assets/pexels-danxavier-1239291.jpg"
import image1 from "../../assets/pexels-justin-shaifer-501272-1222271.jpg"
import image2 from "../../assets/pexels-olly-733872.jpg"
import image3 from "../../assets/pexels-vadim-birsan-1288628-2460488.jpg"
import image4 from "../../assets/pexels-algrey-18454065 (1).jpg"
import image5 from "../../assets/pexels-jplenio-1103970.jpg"

const About = () => {
  const teamMembers = [
    { name: 'Siyamregn Yeshidagna', role: 'Founder & CEO', image: image1 },
    { name: 'Yeshiareg Belayneh', role: 'Head of Design', image: image },
    { name: 'Michael Belayneh', role: 'Tech Lead', image: image2 },
    { name: 'Dawit Mamo', role: 'Customer Support', image: image3 },
  ];

  const testimonials = [
    { quote: "The best shopping experience I've had online!", author: "Jamie Peterson" },
    { quote: "Fast delivery and amazing product quality.", author: "Marcus Wong" },
    { quote: "Customer service went above and beyond.", author: "Sophia Rodriguez" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        {/* Hero Section */}
        <div className="w-full relative h-64 md:h-66 mb-12 rounded-lg overflow-hidden">
          <Image 
            src={image5}
            alt="Our team working together"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Our Story</h1>
          </div>
        </div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row gap-12 mb-20 w-full">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, we started as a small team with a big dream: to revolutionize online shopping. 
              What began as a passion project in a garage has grown into a trusted e-commerce platform 
              serving millions of customers worldwide.
            </p>
            <p className="text-gray-700">
              We believe in quality, transparency, and putting our customers first. Every product in our 
              store is carefully curated to ensure it meets our high standards.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image 
              src={image4} 
              alt="Our office"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We rigorously test every product to ensure it meets our quality standards before it reaches you.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Customer Centric</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. Our support team is available 24/7 to assist you.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Sustainable Growth</h3>
              <p className="text-gray-600">
                We`re committed to ethical sourcing and reducing our environmental footprint.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet The Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="w-full mb-20 bg-orange-50 p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <p className="font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full bg-gray-900 text-white p-12 rounded-xl mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop With Us?</h2>
          <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for quality products and exceptional service.
          </p>
          <Link href="/all-products"><button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-full transition">
            Shop Now
          </button></Link>
          
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;