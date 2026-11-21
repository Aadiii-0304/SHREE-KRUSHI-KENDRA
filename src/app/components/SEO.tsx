import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'agricultural products, pesticides, fertilizers, seeds, farming, krishi kendra, mohan damdhar, pune agriculture',
  ogImage = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
  ogUrl,
  canonicalUrl,
}) => {
  const fullTitle = `${title} | Shree Krushi Kendra - By Mohan Damdhar`;
  const siteUrl = window.location.origin;
  const currentUrl = ogUrl || window.location.href;
  const canonical = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Shree Krushi Kendra" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English, Hindi" />
      <meta name="author" content="Mohan Damdhar" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Jamod" />
      <meta name="geo.position" content="20.8380;76.5299" />
      <meta name="ICBM" content="20.8380, 76.5299" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Shree Krushi Kendra',
          image: ogImage,
          '@id': siteUrl,
          url: siteUrl,
          telephone: '+917219437160',
          priceRange: '₹₹',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Shree Krushi Kendra',
            addressLocality: 'Jamod',
            addressRegion: 'MH',
            postalCode: '444503',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 20.8380,
            longitude: 76.5299,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '07:30',
            closes: '21:00',
          },
          founder: {
            '@type': 'Person',
            name: 'Mohan Damdhar',
          },
        })}
      </script>
    </Helmet>
  );
};

