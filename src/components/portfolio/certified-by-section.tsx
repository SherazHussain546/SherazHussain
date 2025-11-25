'use client';

import Link from 'next/link';

const logos = [
  { name: 'EA', path: 'M8.32,15.17H.11V8.89H8.32ZM2.3,13.09H6.13V10.95H2.3ZM10,15.17V8.89h1.83v2.85h4.15V8.89h1.83v6.28H15.93v-2.8H11.83v2.8Z' },
  { name: 'Mastercard', path: 'M10.1,0A10.1,10.1,0,1,0,20.2,10.1,10.1,10.1,0,0,0,10.1,0Zm0,18.5a8.4,8.4,0,1,1,8.4-8.4A8.4,8.4,0,0,1,10.1,18.5Z M13.8,10.1a3.7,3.7,0,0,1-3.7-3.7,3.7,3.7,0,1,0,0,7.4A3.7,3.7,0,0,1,13.8,10.1Z' },
  { name: 'Deloitte', path: 'M10.4.3A10.13,10.13,0,0,0,.3,10.4,10.13,10.13,0,0,0,10.4,20.5,10.13,10.13,0,0,0,20.5,10.4,10.13,10.13,0,0,0,10.4.3Zm0,18a7.88,7.88,0,0,1-7.8-7.9A7.88,7.88,0,0,1,10.4,2.5a7.88,7.88,0,0,1,7.8,7.9A7.88,7.88,0,0,1,10.4,18.3Z' },
  { name: 'Dublin Business School', path: 'M11.6,7.8V5.3H6.1V15.9h5.5V13.4h-3V11.2h3V8.9h-3V7.8h3.1m5.8-2.5V15.9H15.1V5.3h2.3Z' },
  { name: 'Google', path: 'M10.1,11.2v2.3h5.6c-.2,1.5-1.9,4-5.6,4a6,6,0,1,1,0-12,5.9,5.9,0,0,1,4.4,1.7L16.2,5.4a10,10,0,1,0-6.1,12,9.6,9.6,0,0,0,6.6-2.5,7.3,7.3,0,0,0,2.2-5.7,8.2,8.2,0,0,0-.1-1H10.1Z' },
  { name: 'Crypto.com', path: 'M10,2,4,6V14l6,4,6-4V6Zm0,1.3L5.3,6,10,8.7,14.7,6ZM5,13.3V7l5,3.3v6.7Zm10,0L10,16.7V10.3L15,7Z' },
  { name_to_display: 'duolingo', name: 'Duolingo', path: 'M19.1,6.5c-2.3-3-6-4.5-10.1-4.5S.9,3.5.9,6.5a10.6,10.6,0,0,0,2.1,6.3,13.2,13.2,0,0,1-3,5.1l1.1.9A14.2,14.2,0,0,0,9,14.8,14.2,14.2,0,0,0,17,18.9l1.1-.9a13.2,13.2,0,0,1-3-5.1A10.6,10.6,0,0,0,19.1,6.5Z' },
];

const duplicatedLogos = [...logos, ...logos];


export default function CertifiedBySection() {
  return (
    <section id="certified-by" className="py-16 md:py-24 bg-card">
        <style jsx>{`
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .scrolling-logos {
                animation: scroll 40s linear infinite;
            }
        `}</style>
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="mb-8 text-center text-lg font-medium text-muted-foreground">
          I am certified by:
        </h3>
        <Link href="/#certifications" scroll={true} aria-label="View my certifications">
          <div className="relative w-full overflow-hidden mask-gradient">
            <div className="flex w-[200%] scrolling-logos hover:pause">
              {duplicatedLogos.map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="mx-8 flex h-12 w-32 flex-shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 md:mx-12">
                   <svg
                      role="img"
                      aria-label={logo.name}
                      className="h-full w-full object-contain text-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                   >
                    <title>{logo.name}</title>
                    <path d={logo.path} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
