import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { TrackingCodes } from '@/components/TrackingCodes';
import { defaultHomeContent, getHomeContent, siteImage } from '@/lib/home-content';

// The favicon is editable in the admin (Header).
export async function generateMetadata(): Promise<Metadata> {
  const { header } = await getHomeContent();
  return {
    title: 'AMCO Valves | High-Quality Industrial Valves',
    description: 'Specializing in 1 Pc, 2 Pc, and 3 Pc Ball Valves. Screwed, Socket Weld, Butt Weld, and Flanged connections available.',
    icons: {
      icon: siteImage(header.favicon, defaultHomeContent.header.favicon),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <TrackingCodes />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
