'use client';

import Script from 'next/script';

/**
 * A centralized component for management of all third-party tracking scripts.
 * Add scripts for Google Analytics, Microsoft Clarity, etc., here.
 */
export function TrackingCodes() {
  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z5TD5GGZJE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z5TD5GGZJE');
        `}
      </Script>

      {/* 
        To add Microsoft Clarity in the future, paste its snippet here:
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                ...
            })(window, document, "clarity", "script", "ID");
          `}
        </Script>
      */}
    </>
  );
}
