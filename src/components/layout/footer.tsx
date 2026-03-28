import Image from 'next/image';

const paymentMethods = [
  { 
    name: 'Visa', 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FVisa-Logo.png',
    width: 40,
    height: 25
  },
  { 
    name: 'Mastercard', 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F09%2FMastercard-Logo.png',
    width: 40,
    height: 25
  },
  { 
    name: 'American Express', 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F11%2FAmerican-Express-Logo.png',
    width: 40,
    height: 25
  },
  { 
    name: 'Klarna', 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F11%2FKlarna-Logo.png',
    width: 50,
    height: 25
  },
  { 
    name: 'Revolut Pay', 
    src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F11%2FRevolut-Logo.png',
    width: 60,
    height: 25
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/50 py-12 px-6 text-center border-t">
      <div className="max-w-[860px] mx-auto space-y-8">
        
        {/* Payment Methods Section */}
        <div className="space-y-4">
          <p className="font-space-mono text-[8px] uppercase tracking-[0.3em] opacity-40">
            Secure Payments Accepted Via
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-40 grayscale hover:opacity-100 transition-all duration-500 hover:grayscale-0">
            {paymentMethods.map((method) => (
              <div key={method.name} className="relative h-6 flex items-center justify-center">
                <Image
                  src={method.src}
                  alt={`${method.name} accepted`}
                  width={method.width}
                  height={method.height}
                  className="object-contain"
                  data-ai-hint="payment logo"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="thick-rule !my-8 opacity-10" />

        <div className="space-y-4">
          <p className="font-space-mono text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} <strong className="text-primary">Sheraz Hussain</strong> · Dublin, Ireland · First-Class Honours Software Engineer & AI Architect
          </p>
          <p className="font-space-mono text-[9px] uppercase tracking-widest opacity-60">
            github.com/SherazHussain546 · linkedin.com/in/sherazhussain546 · synctech.ie
          </p>
        </div>
      </div>
    </footer>
  );
}
