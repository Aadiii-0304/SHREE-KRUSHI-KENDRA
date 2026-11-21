import React from 'react';
import { Truck, Package, MapPin, Clock } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="mb-8">Shipping & Delivery Policy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <Truck className="h-10 w-10 text-green-600 mb-3" />
          <h3 className="mb-2">Free Delivery</h3>
          <p className="text-gray-600">No delivery charges on all orders across our service area</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <Clock className="h-10 w-10 text-green-600 mb-3" />
          <h3 className="mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Delivered within 3-5 business days</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <Package className="h-10 w-10 text-green-600 mb-3" />
          <h3 className="mb-2">Secure Packaging</h3>
          <p className="text-gray-600">Products packed safely to prevent damage during transit</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <MapPin className="h-10 w-10 text-green-600 mb-3" />
          <h3 className="mb-2">Order Tracking</h3>
          <p className="text-gray-600">Track your order status from our dashboard</p>
        </div>
      </div>

      <div className="prose max-w-none space-y-6 text-gray-600">
        <section>
          <h2>Delivery Timeline</h2>
          <p>
            We process orders within 24 hours of receiving payment confirmation. Standard delivery
            time is 3-5 business days from the date of order processing.
          </p>
          <ul>
            <li>Local delivery (within 50 km): 1-2 business days</li>
            <li>Regional delivery (50-200 km): 3-4 business days</li>
            <li>Long distance delivery: 5-7 business days</li>
          </ul>
        </section>

        <section>
          <h2>Delivery Charges</h2>
          <p>
            We are pleased to offer FREE delivery on all orders. There are no minimum order requirements
            for free delivery within our standard service area.
          </p>
          <p>
            Additional charges may apply for:
          </p>
          <ul>
            <li>Remote or difficult-to-reach locations</li>
            <li>Delivery outside our standard service area</li>
            <li>Express or same-day delivery (if available)</li>
          </ul>
          <p>
            Any additional charges will be clearly communicated before order confirmation.
          </p>
        </section>

        <section>
          <h2>Delivery Process</h2>
          <h3>Order Confirmation</h3>
          <p>
            Once your order is placed, you will receive an order confirmation via SMS/Email with your
            order details and expected delivery date.
          </p>

          <h3>Order Processing</h3>
          <p>
            Our team will process and pack your order within 24 hours. You will receive a dispatch
            notification when your order is shipped.
          </p>

          <h3>Delivery Attempt</h3>
          <p>
            Our delivery partner will contact you before delivery. Please ensure someone is available
            at the delivery address to receive the order.
          </p>

          <h3>Product Verification</h3>
          <p>
            Please check the products at the time of delivery. Verify quantity, product details, and
            packaging condition before accepting the delivery.
          </p>
        </section>

        <section>
          <h2>Delivery Address</h2>
          <p>
            Please provide complete and accurate delivery address including:
          </p>
          <ul>
            <li>Full name of recipient</li>
            <li>Complete postal address with landmarks</li>
            <li>Mobile number for delivery coordination</li>
            <li>Alternate contact number (recommended)</li>
          </ul>
          <p>
            We are not responsible for delays or non-delivery due to incorrect or incomplete address
            information provided by customers.
          </p>
        </section>

        <section>
          <h2>Delivery Failure</h2>
          <p>
            If delivery cannot be completed due to:
          </p>
          <ul>
            <li>Recipient not available at the address</li>
            <li>Incorrect or incomplete address</li>
            <li>Recipient refuses to accept delivery</li>
          </ul>
          <p>
            We will make up to 2 delivery attempts. After failed attempts, the order will be returned
            to our facility. Re-delivery may incur additional charges.
          </p>
        </section>

        <section>
          <h2>Damaged/Defective Products</h2>
          <p>
            If you receive damaged or defective products:
          </p>
          <ol>
            <li>Do not accept the delivery or make a note on the delivery receipt</li>
            <li>Take photographs of the damaged product and packaging</li>
            <li>Contact us immediately at +91 7219437160 or aadityadamdhar342006@gmail.com</li>
            <li>We will arrange for replacement or refund as per our return policy</li>
          </ol>
        </section>

        <section>
          <h2>Service Areas</h2>
          <p>
            We currently deliver to most areas across the region. To check if we deliver to your
            location, please contact us or enter your PIN code during checkout.
          </p>
        </section>

        <section>
          <h2>Contact for Delivery Queries</h2>
          <p>For any questions or concerns about delivery:</p>
          <ul>
            <li>Phone: +91 7219437160</li>
            <li>Email: aadityadamdhar342006@gmail.com</li>
            <li>Working Hours: Monday - Sunday, 7:30 AM - 9:00 PM</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

