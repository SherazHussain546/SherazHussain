
export default function LinkedInBadgeSection() {
  return (
    <section id="linkedin-badge" className="py-20 md:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Connect on <span className="text-primary">LinkedIn</span>
        </h2>
        <div 
          className="badge-base LI-profile-badge" 
          data-locale="en_US" 
          data-size="medium" 
          data-theme="dark" 
          data-type="VERTICAL" 
          data-vanity="sherazhussain546" 
          data-version="v1"
        >
          {/* The script in the layout will populate this div */}
        </div>
      </div>
    </section>
  );
}
