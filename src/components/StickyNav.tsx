import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'spots', label: 'Spots' },
  { id: 'itineraries', label: 'Routes' },
  { id: 'lexicon', label: 'Lexicon' },
];

export default function StickyNav() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav style={{
      position: 'fixed', bottom: '32px', left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(42,40,38,0.92)', backdropFilter: 'blur(12px)',
      borderRadius: '40px', padding: '8px 8px',
      display: 'flex', gap: '4px',
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          style={{
            padding: '8px 18px',
            borderRadius: '32px',
            border: 'none',
            background: active === id ? '#C85A40' : 'transparent',
            color: active === id ? '#fff' : 'rgba(242,239,234,0.7)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s ease',
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
