export default function GlobalStyles() {
  return (
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .anim-fadeup-0 { animation: fadeUp .6s ease both; }
      .anim-fadeup-1 { animation: fadeUp .6s .10s ease both; }
      .anim-fadeup-2 { animation: fadeUp .6s .20s ease both; }
      .anim-fadeup-3 { animation: fadeUp .6s .30s ease both; }
      .anim-fadeup-4 { animation: fadeUp .7s .40s ease both; }

      .hero-section::before {
        content: ''; position: absolute; top: -120px; right: -80px;
        width: 600px; height: 600px; border-radius: 50%;
        background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
        pointer-events: none;
      }
      .hero-section::after {
        content: ''; position: absolute; bottom: -80px; left: -60px;
        width: 400px; height: 400px; border-radius: 50%;
        background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%);
        pointer-events: none;
      }

      .reveal-el {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity .7s ease, transform .7s ease;
      }
      .reveal-el.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      .step-arrow-el:last-child .step-arrow { display: none; }
    `}</style>
  );
}
