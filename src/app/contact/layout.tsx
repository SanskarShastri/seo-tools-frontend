import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | SEO Tools',
  description: 'Get in touch with our team for personalized SEO solutions and support.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 