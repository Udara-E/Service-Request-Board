import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'TradeCraft - Find Trusted Tradespeople',
  description: 'Browse service requests or post your own — plumbers, electricians, builders & more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f7f6f3] antialiased">
         <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
       
      </body>
    </html>
  );
}