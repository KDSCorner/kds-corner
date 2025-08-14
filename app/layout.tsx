import './globals.css'
import { AuthProvider } from '../lib/auth-context'
import { DarkModeProvider } from '../lib/dark-mode-context'

export const metadata = {
  title: 'KDS Corner - Your Creative Digital Solutions Partner',
  description: 'KDS Corner - Tempat di mana kreativitas bertemu dengan teknologi. Solusi digital inovatif untuk website, aplikasi mobile, dan layanan kreatif lainnya.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    shortcut: '/logo.svg',
    apple: [
      { url: '/logo.svg', sizes: '180x180', type: 'image/svg+xml' }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical CSS */}
        <link rel="preload" href="/styles/main.css" as="style" />
        <link rel="preload" href="/styles/auth.css" as="style" />
        <link rel="preload" href="/styles/responsive.css" as="style" />
        
        {/* Load CSS immediately */}
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/auth.css" />
        <link rel="stylesheet" href="/styles/responsive.css" />
        
        {/* Google Fonts with preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Font Awesome with preload */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        
        {/* Custom Favicon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Prevent FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              visibility: hidden; 
              opacity: 0; 
              transition: opacity 0.3s ease-in-out;
            }
            body.loaded { 
              visibility: visible; 
              opacity: 1; 
            }
          `
        }} />
        
        {/* Load body visibility script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              document.body.classList.add('loaded');
            });
          `
        }} />
      </head>
      <body className="min-h-screen">
        <DarkModeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}
