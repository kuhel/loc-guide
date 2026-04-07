import { useState, useEffect } from 'react';

const SECTIONS = [
  {
    id: 'top',
    label: 'Back to Top',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'intro',
    label: 'Manifesto',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2a10 10 0 0 0-6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 2a10 10 0 0 1 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'spots',
    label: 'Field Notes',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'itineraries',
    label: 'Routes',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'lexicon',
    label: 'Vernacular',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function StickyNav() {
  const [active, setActive] = useState('intro');
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

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

    SECTIONS.filter((s) => s.id !== 'top').forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(249, 247, 241, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        padding: '0.5rem',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #D5D1CB',
      }}
    >
      {SECTIONS.map(({ id, label, icon }) => (
        <button
          key={id}
          data-nav-id={id}
          onClick={() => scrollTo(id)}
          onMouseEnter={() => setHoveredBtn(id)}
          onMouseLeave={() => setHoveredBtn(null)}
          aria-label={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: active === id || hoveredBtn === id ? '#C85A40' : 'transparent',
            color: active === id || hoveredBtn === id ? '#fff' : '#2A2826',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
            position: 'relative',
          }}
        >
          {icon}
          <span
            style={{
              position: 'absolute',
              bottom: '140%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#2A2826',
              color: '#F2EFEA',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              opacity: hoveredBtn === id ? 1 : 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'none',
              zIndex: 200,
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
