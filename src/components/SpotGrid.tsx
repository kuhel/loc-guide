import { useState } from 'react';
import SpotModal from './SpotModal';

interface Place {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  price: number;
  note: string;
  tip?: string;
  maps_url: string;
  image_query: string;
}

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

const PRICE_DOTS = ['', '•', '••', '•••'];

export default function SpotGrid({ places }: SpotGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const presentCategories = ['all', ...Array.from(new Set(places.map((p) => p.category)))];

  const filtered = activeCategory === 'all'
    ? places
    : places.filter((p) => p.category === activeCategory);

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
        {filtered.map((place) => (
          <button
            key={place.id}
            onClick={() => setSelectedPlace(place)}
            style={{
              background: '#F2EFEA',
              border: 'none',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            <img
              src={`https://source.unsplash.com/featured/400x280/?${encodeURIComponent(place.image_query)}`}
              alt={place.name}
              style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            <div style={{ padding: '16px 18px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: '#2A2826',
                }}>
                  {place.name}
                </h3>
                <span style={{ fontSize: '12px', color: '#8A857D', marginLeft: '8px', flexShrink: 0 }}>
                  {PRICE_DOTS[place.price]}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#8A857D', marginBottom: '8px' }}>{place.neighborhood}</p>
              <span style={{
                display: 'inline-block',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C85A40',
                background: 'rgba(200,90,64,0.08)',
                padding: '3px 8px',
                borderRadius: '2px',
              }}>
                {CATEGORY_LABELS[place.category] ?? place.category}
              </span>
            </div>
          </button>
        ))}
      </div>
      {selectedPlace && (
        <SpotModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </div>
  );
}
