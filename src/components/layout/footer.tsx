import React from 'react';

const paymentMethods = [
  { 
    name: 'Visa', 
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.186 15.112l1.417-8.712h2.27l-1.417 8.712zM22.93 6.399c-.478-.182-1.22-.379-2.136-.379-2.35 0-4.003 1.25-4.014 3.037-.012 1.32 1.18 2.056 2.08 2.643.925.587 1.237.875 1.233 1.352-.007.73-.875 1.065-1.687 1.065-1.125 0-1.725-.171-2.643-.574l-.371-.175-.394 2.448c.66.304 1.88.568 3.14.581 2.5 0 4.125-1.237 4.144-3.15.019-1.05-.625-1.85-1.994-2.506-.83-.412-1.344-.687-1.344-1.106 0-.394.437-.812 1.387-.812.787-.013 1.356.168 1.8.362l.213.1.394-2.448c-.531-.219-1.21-.412-1.814-.412zm-13.587 0L7.13 12.302l-.228-1.163-.834-4.22c-.106-.519-.45-.919-.9-.919H.225l-.037.175c.95.244 2.031.637 2.687 1.062.406.256.519.481.656.956l2.188 8.32h2.381l3.625-8.712h-2.4zm6.244 0h-1.813c-.563 0-.987.163-1.231.737l-3.488 8.375h2.388l.475-1.312h2.913l.275 1.312h2.1l-1.838-8.712c-.187-.737-.6-1.1-.781-1.1zm-1.331 2.5l.831 4.012h-1.9l1.069-4.012z" fill="#1A1F71"/>
      </svg>
    ),
    width: 'w-10'
  },
  { 
    name: 'Mastercard', 
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="12" r="7" fill="#EB001B"/>
        <circle cx="17" cy="12" r="7" fill="#F79E1B" fillOpacity=".8"/>
        <path d="M12 12a6.99 6.99 0 0 1 2.614-5.441 6.99 6.99 0 0 0-5.228 0A6.99 6.99 0 0 1 12 12z" fill="#FF5F00"/>
      </svg>
    ),
    width: 'w-10'
  },
  { 
    name: 'American Express', 
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#007BC1"/>
        <path d="M4 16h2.5l.5-1.5h2l.5 1.5H12l-2.5-7h-3L4 16zm4.5-3.5h-1l.5-1.5.5 1.5zM13 9v7h4.5v-1.5h-2.5v-1.5h2v-1.5h-2v-1h2.5V9H13zm6 0l-1 2-1-2h-2l2 3.5-2 3.5h2l1-2 1 2h2l-2-3.5 2-3.5h-2z" fill="#FFFFFF"/>
      </svg>
    ),
    width: 'w-8'
  },
  { 
    name: 'Klarna', 
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg" fill="#FFB3C7">
        <path d="M12.4 0H8.2v32h4.2V0zM33.6 0h-4.2v13.7l-8.1-13.7H17l9.6 15.7-10 16.3h4.3l8.4-14V32h4.2V0zM58.8 24.3c-1.9 0-3.3-.7-4.4-1.9-1.1-1.2-1.6-2.9-1.6-5.1 0-2.1.5-3.9 1.6-5.1 1.1-1.2 2.5-1.9 4.4-1.9 1.9 0 3.3.7 4.4 1.9 1.1 1.2 1.6 2.9 1.6 5.1 0 2.1-.5 3.9-1.6 5.1-1.1 1.2-2.5 1.9-4.4 1.9zm0-13.9c-3.2 0-5.7 1.1-7.5 3.2-1.7 2.1-2.6 4.9-2.6 8.3s.9 6.2 2.6 8.3c1.7 2.1 4.2 3.2 7.5 3.2s5.7-1.1 7.5-3.2c1.7-2.1 2.6-4.9 2.6-8.3s-.9-6.2-2.6-8.3c-1.7-2.1-4.2-3.2-7.5-3.2zM100 24c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/>
      </svg>
    ),
    width: 'w-14'
  },
  { 
    name: 'Revolut Pay', 
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M10.5 0h3.4v24h-3.4V0zM0 0h3.4v24H0V0zm17.4 0h3.4v10.3l6.1-10.3h3.9l-7.2 11.8 7.5 12.2h-4l-6.3-10.5V24h-3.4V0zM44.1 18.2c-1.4 0-2.5-.5-3.3-1.4-.8-.9-1.2-2.2-1.2-3.8 0-1.6.4-2.9 1.2-3.8.8-.9 1.9-1.4 3.3-1.4 1.4 0 2.5.5 3.3 1.4.8.9 1.2 2.2 1.2 3.8 0 1.6-.4 2.9-1.2 3.8-.8.9-1.9 1.4-3.3 1.4zm0-10.4c-2.4 0-4.3.8-5.6 2.4-1.3 1.6-2 3.7-2 6.2s.7 4.6 2 6.2c1.3 1.6 3.2 2.4 5.6 2.4s4.3-.8 5.6-2.4c1.3-1.6 2-3.7 2-6.2s-.7-4.6-2-6.2c-1.3-1.6-3.2-2.4-5.6-2.4z"/>
      </svg>
    ),
    width: 'w-16'
  }
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
              <div key={method.name} className={`relative h-6 flex items-center justify-center ${method.width}`}>
                {method.icon("h-full w-full")}
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
