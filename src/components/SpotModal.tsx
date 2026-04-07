import { useEffect } from 'react';
import type { Place } from '../types/place';

interface SpotModalProps {
  place: Place;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const PRICE_DOTS: Record<number, string> = { 1: '€', 2: '€€', 3: '€€€' };

const CATEGORY_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  coffee: 'Coffee',
  lunch: 'Lunch',
  dinner: 'Dinner',
  bar: 'Bar',
  culture: 'Culture',
  other: 'Other',
};

export default function SpotModal({ place, onClose, onPrev, onNext }: SpotModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const imageUrl = place.image
    ? place.image.replace(/\.webp$/, '-full.webp')
    : `https://picsum.photos/seed/${encodeURIComponent(place.image_query)}/800/600`;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(42,40,38,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous spot"
          style={{
            position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(249,247,241,0.95)', border: '1px solid #D5D1CB',
            borderRadius: '50%', width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#2A2826', zIndex: 1001,
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next spot"
          style={{
            position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(249,247,241,0.95)', border: '1px solid #D5D1CB',
            borderRadius: '50%', width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#2A2826', zIndex: 1001,
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="spot-modal-title"
        style={{
          background: '#F2EFEA', borderRadius: '4px', overflow: 'hidden',
          maxWidth: '860px', width: '100%', maxHeight: '90vh',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: 'relative', minHeight: '400px', background: '#E3DFDA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={imageUrl}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={onClose}
            style={{
              alignSelf: 'flex-end', background: 'none', border: 'none',
              cursor: 'pointer', color: '#8A857D', fontSize: '20px', lineHeight: 1,
              padding: '4px',
            }}
            aria-label="Close"
          >×</button>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#C85A40',
              }}>
                {CATEGORY_LABELS[place.category] ?? place.category}
              </span>
              <span style={{ color: '#D5D1CB' }}>·</span>
              <span style={{ fontSize: '13px', color: '#8A857D' }}>
                {PRICE_DOTS[place.price] ?? ''}
              </span>
            </div>
            <h2 id="spot-modal-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: '28px', fontWeight: 400, lineHeight: 1.15 }}>
              {place.name}
            </h2>
            <p style={{ fontSize: '12px', color: '#8A857D', marginTop: '4px' }}>{place.neighborhood}</p>
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#2A2826' }}>{place.note}</p>
          {place.tip && (
            <div style={{
              background: '#E3DFDA', borderRadius: '3px', padding: '14px 16px',
              fontSize: '13px', color: '#2A2826', lineHeight: 1.6,
            }}>
              <span style={{ fontWeight: 600, color: '#C85A40' }}>Tip: </span>{place.tip}
            </div>
          )}
          <a
            href={place.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: 'auto', padding: '10px 18px',
              background: '#2A2826', color: '#F2EFEA',
              textDecoration: 'none', borderRadius: '3px',
              fontSize: '13px', fontWeight: 500, alignSelf: 'flex-start',
            }}
          >
            ↗ Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
}
