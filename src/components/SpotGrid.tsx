import { useState } from 'react';
import type { Place } from '../types/place';
import SpotModal from './SpotModal';

interface SpotGridProps {
  places: Place[];
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  breakfast: 'Breakfast',
  coffee: 'Coffee',
  lunch: 'Lunch',
  dinner: 'Dinner',
  bar: 'Bar',
  culture: 'Culture',
  other: 'Other',
};

const PRICE_DOTS: Record<number, string> = { 1: '€', 2: '€€', 3: '€€€' };

const CATEGORY_ORDER = ['all', 'breakfast', 'coffee', 'lunch', 'dinner', 'bar', 'culture', 'other'];

function SpotCard({ place, onClick }: { place: Place; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#F2EFEA',
        border: 'none',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
        <img
          src={place.image ?? `https://picsum.photos/seed/${encodeURIComponent(place.image_query)}/400/500`}
          alt={place.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: hovered ? 'grayscale(0%) contrast(1.1)' : 'grayscale(20%) contrast(1.1)',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
          }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#C85A40',
          marginBottom: '0.5rem',
        }}>
          <span>{CATEGORY_LABELS[place.category] ?? place.category}</span>
          <span>{PRICE_DOTS[place.price] ?? ''}</span>
        </div>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.2,
          color: '#2A2826',
          marginBottom: '6px',
        }}>
          {place.name}
        </h3>
        <p style={{ fontSize: '11px', color: '#8A857D' }}>{place.neighborhood}</p>
      </div>
    </button>
  );
}

export default function SpotGrid({ places }: SpotGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const presentCategories = CATEGORY_ORDER.filter(
    (cat) => cat === 'all' || places.some((p) => p.category === cat)
  );

  const filtered = activeCategory === 'all'
    ? places
    : places.filter((p) => p.category === activeCategory);

  const selectedPlace = selectedIdx !== null ? filtered[selectedIdx] ?? null : null;

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {presentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: '20px',
              border: `1px solid ${activeCategory === cat ? '#C85A40' : '#D5D1CB'}`,
              background: activeCategory === cat ? '#C85A40' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#2A2826',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
            }}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        {filtered.map((place, idx) => (
          <SpotCard key={place.id} place={place} onClick={() => setSelectedIdx(idx)} />
        ))}
      </div>
      {selectedPlace && selectedIdx !== null && (
        <SpotModal
          place={selectedPlace}
          onClose={() => setSelectedIdx(null)}
          onPrev={selectedIdx > 0 ? () => setSelectedIdx(selectedIdx - 1) : undefined}
          onNext={selectedIdx < filtered.length - 1 ? () => setSelectedIdx(selectedIdx + 1) : undefined}
        />
      )}
    </div>
  );
}
