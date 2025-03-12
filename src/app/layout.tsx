import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthModals from '@/components/AuthModals';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SEO Tools - Optimize Your Online Presence',
  description: 'Advanced SEO tools to optimize your website, improve rankings, and drive more organic traffic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <AuthModals />
        </AuthProvider>
      </body>
    </html>
  );
}
