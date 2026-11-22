import React from 'react';
import { Link } from 'react-router';
import { Sprout, Droplet, Wheat, ChevronRight, Star, TrendingUp, Users, Award, Shield, Truck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const Homepage: React.FC = () => {
  const featuredProducts = products.filter(p => p.originalPrice).slice(0, 6);
  
  const categories = [
    {
      name: 'Pesticides',
      icon: Droplet,
      description: 'Protect your crops from pests',
      link: '/products?category=pesticide',
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
    },
    {
      name: 'Fertilizers',
      icon: TrendingUp,
      description: 'Boost crop growth and yield',
      link: '/products?category=fertilizer',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
    },
    {
      name: 'Seeds',
      icon: Sprout,
      description: 'High-quality seeds for better harvest',
      link: '/products?category=seed',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
    },
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Happy Farmers' },
    { icon: Award, value: '14+', label: 'Years of Trust' },
    { icon: Droplet, value: '500+', label: 'Quality Products' },
    { icon: Star, value: '4.8', label: 'Customer Rating' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Patil',
      location: 'Cotton Farmer, Jamod',
      text: 'Best quality pesticides and fertilizers. Shri Mohan Damdhar always gives the right advice for crop protection.',
      rating: 5,
    },
    {
      name: 'Santosh Kamble',
      location: 'Wheat Farmer, Satara',
      text: 'Genuine products at fair prices. I have been buying from Shree Krushi Kendra for 8 years now.',
      rating: 5,
    },
    {
      name: 'Prakash Jadhav',
      location: 'Sugarcane Farmer, Solapur',
      text: 'Excellent service! They help me choose the right products for my sugarcane crop. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-green-700 via-green-600 to-green-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1685474442603-b27a68255660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Farming"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-15 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="bg-yellow-500 text-gray-900 inline-block px-4 py-2 rounded-full mb-4 text-sm">
              🌾 Serving Farmers Since 2011
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Your Trusted Partner in <span className="text-yellow-300">Agriculture</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed">
              Premium quality pesticides, fertilizers, and seeds from top brands like Bayer, Syngenta, UPL & more for exceptional yields
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/products">
                <Button size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30 backdrop-blur-sm shadow-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-green-100">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+91 7219437160</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="hidden sm:block">Mon-Sun: 7:30 AM - 9:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center transform hover:scale-105 transition-transform">
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl text-green-700 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Choose from our wide range of agricultural products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} to={category.link}>
                <div className={`${category.color} border-2 rounded-xl p-8 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300`}>
                  <Icon className={`h-16 w-16 ${category.iconColor} mb-6`} />
                  <h3 className="mb-3 text-2xl">{category.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{category.description}</p>
                  <Button variant="ghost" className="gap-2 p-0 text-base">
                    Browse {category.name}
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="mb-3">Featured Products</h2>
              <p className="text-gray-600 text-lg">Best deals on quality agricultural products</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50">
                View All Products
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose Shree Krushi Kendra?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by thousands of farmers since 2011 for quality products and expert guidance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl">Quality Products</h3>
            <p className="text-gray-600">Only authentic products from top brands like Bayer, Syngenta, UPL, BASF, FMC & more</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl">Expert Advice</h3>
            <p className="text-gray-600">Get personalized guidance from experienced agriculture experts</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl">Genuine & Safe</h3>
            <p className="text-gray-600">100% authentic products with proper certifications and safety guidelines</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery to your doorstep across the region</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">What Our Farmers Say</h2>
            <p className="text-gray-600 text-lg">Trusted by farmers across Maharashtra</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-green-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-white py-16 border-y-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Authorized Dealer of Top Brands</h2>
            <p className="text-gray-600 text-lg">We stock products from the world's leading agricultural companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Bayer', 'Syngenta', 'BASF', 'UPL', 'Corteva', 'FMC', 'Adama', 'Nufarm', 'Sumitomo', 'Dhanuka', 'IFFCO', 'Tata Rallis'].map((brand) => (
              <div key={brand} className="bg-gray-50 p-6 rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all">
                <span className="text-gray-700 text-center">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Visit Our Store</h2>
            <p className="text-gray-600 text-lg">Come visit us for personalized service and expert advice</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.5!2d76.5299!3d20.8380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUwJzE2LjgiTiA3NsKwMzEnNDcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://maps.app.goo.gl/ezXQAqdvmF2Pt9866"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-4xl">Ready to Boost Your Harvest?</h2>
          <p className="text-xl text-green-50 mb-10 leading-relaxed">
            Join thousands of satisfied farmers who trust Shree Krushi Kendra for their agricultural needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-xl transform hover:scale-105 transition-all">
                Browse Products
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+917219437160">
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30 backdrop-blur-sm shadow-xl">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
