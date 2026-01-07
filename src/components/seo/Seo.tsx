import React from "react";
import { Helmet } from "react-helmet-async";
import { defaultSeo } from "@/config/seoDefaults";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export const Seo: React.FC<SeoProps> = ({ title, description, image, url }) => {
  const seo = {
    title: title ?? defaultSeo.title,
    description: description ?? defaultSeo.description,
    image: image ?? defaultSeo.image,
    url: url ?? defaultSeo.url,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};
