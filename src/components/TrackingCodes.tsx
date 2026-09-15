'use client';

import Script from 'next/script';

/**
 * A centralized component for management of all third-party tracking scripts.
 * Uses standard script tags for inline code to ensure visibility in "View Source".
 */
export function TrackingCodes() {
  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Z5TD5GGZJE"
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z5TD5GGZJE');
          `,
        }}
      />

      {/* Microsoft Clarity */}
      <script
        id="microsoft-clarity"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yijetc7rnc");
          `,
        }}
      />
    </>
  );
}
