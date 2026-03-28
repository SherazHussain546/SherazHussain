export default function Footer() {
  return (
    <footer className="bg-foreground text-background/50 py-12 px-6 text-center border-t">
      <div className="max-w-[860px] mx-auto space-y-4">
        <p className="font-space-mono text-[10px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} <strong className="text-primary">Sheraz Hussain</strong> · Dublin, Ireland · First-Class Honours Software Engineer & AI Architect
        </p>
        <p className="font-space-mono text-[9px] uppercase tracking-widest opacity-60">
          github.com/SherazHussain546 · linkedin.com/in/sherazhussain546 · synctech.ie
        </p>
      </div>
    </footer>
  );
}
