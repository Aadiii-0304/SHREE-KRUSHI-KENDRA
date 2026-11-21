import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Browse our products, add items to cart, proceed to checkout, fill in your delivery details, select payment method, and confirm your order.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), and Mobile Wallets (Paytm, Amazon Pay, Mobikwik).',
        },
        {
          q: 'Is online payment safe?',
          a: 'Yes, absolutely. All online payments are processed through secure payment gateways with SSL encryption. We do not store your card or banking details.',
        },
        {
          q: 'Can I cancel my order?',
          a: 'Yes, you can cancel your order before it is dispatched. Contact us immediately at +91 7219437160 or through your dashboard.',
        },
        {
          q: 'Do you provide invoices?',
          a: 'Yes, we provide detailed invoices with all orders. You can view and download invoices from your dashboard.',
        },
      ],
    },
    {
      category: 'Products',
      questions: [
        {
          q: 'Are your products genuine?',
          a: 'Yes, 100%. All our products are sourced directly from authorized distributors and manufacturers. We guarantee authenticity.',
        },
        {
          q: 'How do I know which product is right for my crop?',
          a: 'Each product listing mentions suitable crops. You can also filter products by crop type. For personalized advice, contact us at +91 7219437160.',
        },
        {
          q: 'Do you sell organic products?',
          a: 'Yes, we have a range of organic fertilizers and bio-pesticides. Look for products labeled as "organic" or filter by organic category.',
        },
        {
          q: 'How should I store these products?',
          a: 'Store in a cool, dry place away from direct sunlight. Keep pesticides and fertilizers out of reach of children and pets. Follow label instructions for specific storage requirements.',
        },
        {
          q: 'What is the shelf life of products?',
          a: 'Shelf life varies by product. Most pesticides and fertilizers have 2-3 years shelf life when stored properly. Check the manufacturing date on the package.',
        },
      ],
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'Do you charge for delivery?',
          a: 'No, we offer FREE delivery on all orders within our service area.',
        },
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery time is 3-5 business days. Local deliveries within 50 km may arrive in 1-2 days.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes, you can track your order status from your dashboard after logging in.',
        },
        {
          q: 'What if I am not available during delivery?',
          a: 'Our delivery partner will contact you before delivery. If you are unavailable, we will make up to 2 delivery attempts.',
        },
        {
          q: 'Do you deliver to my area?',
          a: 'We deliver to most areas across the region. Enter your PIN code during checkout to check availability or contact us.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'Can I return a product?',
          a: 'Agricultural products are generally non-returnable. However, we accept returns for damaged, defective, wrong, or expired products within 48 hours of delivery.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact us within 48 hours of delivery with order details and photographs of the issue. Our team will guide you through the return process.',
        },
        {
          q: 'When will I receive my refund?',
          a: 'Approved refunds are processed within 7-10 business days to the original payment method.',
        },
        {
          q: 'What if I receive a damaged product?',
          a: 'Do not accept the delivery or make a note on the delivery receipt. Take photos and contact us immediately. We will arrange replacement or refund.',
        },
      ],
    },
    {
      category: 'Account & Support',
      questions: [
        {
          q: 'Do I need an account to order?',
          a: 'Yes, you need to create an account to place orders. This helps you track orders, view order history, and manage your profile.',
        },
        {
          q: 'How do I reset my password?',
          a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email.',
        },
        {
          q: 'Can I change my delivery address?',
          a: 'You can update your default address in your dashboard. For changing address of a placed order, contact us immediately before dispatch.',
        },
        {
          q: 'How can I contact customer support?',
          a: 'Contact us via phone at +91 7219437160, email at aadityadamdhar342006@gmail.com, or WhatsApp. We are available Monday-Sunday, 7:30 AM - 9:00 PM.',
        },
        {
          q: 'Can I visit your physical store?',
          a: 'Yes! We welcome you to visit Shree Krushi Kendra. Check our location on Google Maps or contact us for directions.',
        },
      ],
    },
    {
      category: 'Product Usage',
      questions: [
        {
          q: 'How do I use pesticides safely?',
          a: 'Always read the product label carefully. Wear protective gear, follow recommended dosage, spray during early morning or evening, and maintain safety period before harvest.',
        },
        {
          q: 'What is the right dosage for my crop?',
          a: 'Dosage information is provided in each product description. For specific recommendations, consult with our experts or agricultural extension officers.',
        },
        {
          q: 'Can I mix different pesticides/fertilizers?',
          a: 'Some products can be mixed, others cannot. Check product compatibility or consult our experts before mixing products.',
        },
        {
          q: 'When is the best time to apply fertilizers?',
          a: 'Timing depends on crop and fertilizer type. Generally, apply at sowing, vegetative stage, and flowering/fruiting stage. Follow crop-specific recommendations.',
        },
      ],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-green-100">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="mb-6">{category.category}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`${categoryIndex}-${index}`}
                  className="bg-white border rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="mt-16 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <h2 className="mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our friendly team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+917219437160"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Call Us: +91 7219437160
            </a>
            <a
              href="mailto:aadityadamdhar342006@gmail.com"
              className="bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

