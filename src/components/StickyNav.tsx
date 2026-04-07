import { useState, useEffect } from 'react';
import { Road, Signpost, ScrollText, BookA } from 'lucide-react';

const SECTIONS = [
  {
    id: 'top',
    label: 'Back to Top',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <polyline points="17 11 12 6 7 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'intro',
    label: 'The Legend',
    icon: <ScrollText size={20} aria-hidden="true" />,
  },
  {
    id: 'rules',
    label: 'The Rules',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'spots',
    label: 'The Spots',
    icon: <Signpost size={20} aria-hidden="true" />,
  },
  {
    id: 'itineraries',
    label: 'Routes',
    icon: <Road size={20} aria-hidden="true" />,
  },
  {
    id: 'lexicon',
    label: 'Vernacular',
    icon: <BookA size={20} aria-hidden="true" />,
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
