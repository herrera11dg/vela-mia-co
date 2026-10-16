import { useState } from 'react';
import { useTranslation } from "react-i18next";

const aromas = [
  { id: 1, cat: 'tropical', nameKey: 'aromas.data.1.name', descKey: 'aromas.data.1.desc', icon: 'ri-sun-line', color: '#f5a623' },
  { id: 2, cat: 'frutal', nameKey: 'aromas.data.2.name', descKey: 'aromas.data.2.desc', icon: 'ri-drop-line', color: '#e85d75' },
  { id: 3, cat: 'frutal', nameKey: 'aromas.data.3.name', descKey: 'aromas.data.3.desc', icon: 'ri-heart-line', color: '#c0392b' },
  { id: 4, cat: 'herbal', nameKey: 'aromas.data.4.name', descKey: 'aromas.data.4.desc', icon: 'ri-leaf-line', color: '#7a8c5e' },
  { id: 5, cat: 'herbal', nameKey: 'aromas.data.5.name', descKey: 'aromas.data.5.desc', icon: 'ri-plant-line', color: '#4a7c6f' },
  { id: 6, cat: 'herbal', nameKey: 'aromas.data.6.name', descKey: 'aromas.data.6.desc', icon: 'ri-contrast-drop-line', color: '#2ecc71' },
  { id: 7, cat: 'citrico', nameKey: 'aromas.data.7.name', descKey: 'aromas.data.7.desc', icon: 'ri-sun-foggy-line', color: '#f1c40f' },
  { id: 8, cat: 'gourmand', nameKey: 'aromas.data.8.name', descKey: 'aromas.data.8.desc', icon: 'ri-cup-line', color: '#6b3a2a' },
  { id: 9, cat: 'tropical', nameKey: 'aromas.data.9.name', descKey: 'aromas.data.9.desc', icon: 'ri-seedling-line', color: '#8bc34a' },
  { id: 10, cat: 'tropical', nameKey: 'aromas.data.10.name', descKey: 'aromas.data.10.desc', icon: 'ri-sun-line', color: '#ff8c00' },
  { id: 11, cat: 'suave', nameKey: 'aromas.data.11.name', descKey: 'aromas.data.11.desc', icon: 'ri-cloud-line', color: '#d4a5c9' },
  { id: 12, cat: 'acuatico', nameKey: 'aromas.data.12.name', descKey: 'aromas.data.12.desc', icon: 'ri-sailboat-line', color: '#5b9bd5' },
  { id: 13, cat: 'citrico', nameKey: 'aromas.data.13.name', descKey: 'aromas.data.13.desc', icon: 'ri-sparkling-line', color: '#c8a951' },
  { id: 14, cat: 'gourmand', nameKey: 'aromas.data.14.name', descKey: 'aromas.data.14.desc', icon: 'ri-cup-fill', color: '#5c3d2e' },
  { id: 15, cat: 'gourmand', nameKey: 'aromas.data.15.name', descKey: 'aromas.data.15.desc', icon: 'ri-star-line', color: '#d4a96a' },
  { id: 16, cat: 'natal', nameKey: 'aromas.data.16.name', descKey: 'aromas.data.16.desc', icon: 'ri-gift-line', color: '#8b1a1a' },
  { id: 17, cat: 'natal', nameKey: 'aromas.data.17.name', descKey: 'aromas.data.17.desc', icon: 'ri-snowflake-line', color: '#b5651d' },
  { id: 18, cat: 'herbal', nameKey: 'aromas.data.18.name', descKey: 'aromas.data.18.desc', icon: 'ri-bug-line', color: '#9acd32' },
];

const categoryKeys = ['todos', 'tropical', 'frutal', 'herbal', 'citrico', 'gourmand', 'suave', 'acuatico', 'natal'];

export default function Aromas() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === 'todos'
    ? aromas
    : aromas.filter((a) => a.cat === activeCategory);

  return (
    <section id="aromas" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">{t("aromas.badge")}</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] mt-3 mb-4">{t("aromas.title")}</h2>
          <p className="text-[#8a7a6a] text-base max-w-xl mx-auto leading-relaxed">
            {t("aromas.description")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#7a8c5e] text-white'
                  : 'bg-white text-[#7a8c5e] border border-[#7a8c5e]/30 hover:border-[#7a8c5e] hover:bg-[#7a8c5e]/5'
              }`}
            >
              {t(`aromas.filter.${cat}`)}
            </button>
          ))}
        </div>

        {/* Aromas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {filtered.map((aroma) => (
            <div
              key={aroma.id}
              onMouseEnter={() => setHoveredId(aroma.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group bg-white rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer hover:translate-y-[-4px] transition-all duration-300 overflow-hidden"
            >
              {/* Color accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: aroma.color }}
              />

              {/* Icon circle */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-3 mt-2 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${aroma.color}18` }}
              >
                <i
                  className={`${aroma.icon} text-2xl`}
                  style={{ color: aroma.color }}
                />
              </div>

              {/* Name */}
              <h3 className="font-serif text-[#3a2a1e] text-sm font-medium leading-tight mb-1">{t(aroma.nameKey)}</h3>

              {/* Category badge */}
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: `${aroma.color}18`, color: aroma.color }}
              >
                {t(`aromas.filter.${aroma.cat}`)}
              </span>

              {/* Hover description */}
              <div
                className={`absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                  hoveredId === aroma.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: `${aroma.color}20` }}
                >
                  <i className={`${aroma.icon} text-xl`} style={{ color: aroma.color }} />
                </div>
                <h4 className="font-serif text-[#3a2a1e] text-sm font-semibold mb-2">{t(aroma.nameKey)}</h4>
                <p className="text-[#8a7a6a] text-xs leading-relaxed">{t(aroma.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 bg-[#7a8c5e]/10 rounded-full px-6 py-3">
            <i className="ri-information-line text-[#7a8c5e] text-base"></i>
            <p className="text-[#7a8c5e] text-sm">
              {t("aromas.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
