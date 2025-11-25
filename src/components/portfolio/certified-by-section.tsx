'use client';

import Link from 'next/link';
import Image from 'next/image';

const logos = [
  { name: 'EA', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freelogovectors.net%2Fwp-content%2Fuploads%2F2023%2F09%2Fea_sports-logo-freelogovectors.net_.png&f=1&nofb=1&ipt=b8e7e9daf82c2503e1264b1d7ef46ab6e0c6391bb2663e68fb114c83c35aaf34' },
  { name: 'Mastercard', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fwp-content%2Fuploads%2Fmastercard.jpg&f=1&nofb=1&ipt=129340d8002f9ed7e1329b49ac0e7c80827124b542853c5b88727970ef0ec7e9' },
  { name: 'Deloitte', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F564%2F716%2Fpng-clipart-deloitte-logo-brand-management-consulting-product-lg-logo-text-logo.png&f=1&nofb=1&ipt=a75189c59043cab109e3b4c67ebad018f493b9a797fc2552b8a05248fb7113f5' },
  { name: 'Dublin Business School', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100064563767021&f=1&nofb=1&ipt=b658e80383e3d5a77bfe1608fcc9cd60686fb1400eb3591d615e18870dec319d' },
  { name: 'Google', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F09%2FGoogle-Logo.png&f=1&nofb=1&ipt=5d0006785e6eb0c4fb3332743434e051c94e8681def5b7dead3439e6ae8118cf' },
  { name: 'Crypto.com', src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.1V-ny0uCga2pZX_TdQ44hgHaE8%3Fpid%3DApi&f=1&ipt=4ec84e1b2b8ec25dce1afc304a5c8ef2a99c4b9abc0d0f5b131bf32aec800004' },
  { name: 'Duolingo', src: 'https://logos-world.net/wp-content/uploads/2021/08/Duolingo-Logo.png'},
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
                   <div className="relative h-full w-full">
                        <Image
                            src={logo.src}
                            alt={logo.name}
                            fill
                            className="object-contain"
                        />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
