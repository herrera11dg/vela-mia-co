import { useState } from 'react';

const aromas = [
  { id: 1, name: 'Maracuyá', icon: 'ri-sun-line', category: 'Tropical', color: '#f5a623', desc: 'Fresco y exótico, evoca veranos tropicales y energía vibrante.' },
  { id: 2, name: 'Sandía', icon: 'ri-drop-line', category: 'Frutal', color: '#e85d75', desc: 'Dulce y refrescante, perfecto para días calurosos y momentos de ligereza.' },
  { id: 3, name: 'Frutos Rojos', icon: 'ri-heart-line', category: 'Frutal', color: '#c0392b', desc: 'Una mezcla intensa de frambuesa, fresa y arándano silvestre.' },
  { id: 4, name: 'Verbena', icon: 'ri-leaf-line', category: 'Herbal', color: '#7a8c5e', desc: 'Herbal y cítrico, limpia el ambiente y traz frescura al hogar.' },
  { id: 5, name: 'Eucalipto', icon: 'ri-plant-line', category: 'Herbal', color: '#4a7c6f', desc: 'Purificante y revigorante, ideal para momentos de relajación profunda.' },
  { id: 6, name: 'Menta', icon: 'ri-contrast-drop-line', category: 'Herbal', color: '#2ecc71', desc: 'Fresco y estimulante, despierta los sentidos y aclara la mente.' },
  { id: 7, name: 'Limón', icon: 'ri-sun-foggy-line', category: 'Cítrico', color: '#f1c40f', desc: 'Cítrico y alegre, traz luz y buen humor a cualquier habitación.' },
  { id: 8, name: 'Chocolate', icon: 'ri-cup-line', category: 'Gourmand', color: '#6b3a2a', desc: 'Caliente y envolvente, como un abrazo en forma de aroma.' },
  { id: 9, name: 'Kiwi', icon: 'ri-seedling-line', category: 'Tropical', color: '#8bc34a', desc: 'Ácido y fresco, una explosión de vitalidad y naturaleza.' },
  { id: 10, name: 'Mango', icon: 'ri-sun-line', category: 'Tropical', color: '#ff8c00', desc: 'Dulce y tropical, te transporta a playas paradisíacas.' },
  { id: 11, name: 'Talco de Bebé', icon: 'ri-cloud-line', category: 'Suave', color: '#d4a5c9', desc: 'Delicado y reconfortante, evoca ternura y momentos de paz.' },
  { id: 12, name: 'Brisas Marinas', icon: 'ri-sailboat-line', category: 'Aquático', color: '#5b9bd5', desc: 'Fresco y salado, como una brisa del océano al amanecer.' },
  { id: 13, name: 'Bergamota', icon: 'ri-sparkling-line', category: 'Cítrico', color: '#c8a951', desc: 'Elegante y sofisticado, con notas cítricas y florales únicas.' },
  { id: 14, name: 'Café', icon: 'ri-cup-fill', category: 'Gourmand', color: '#5c3d2e', desc: 'Intenso y acogedor, el aroma perfecto para mañanas especiales.' },
  { id: 15, name: 'Vainilla', icon: 'ri-star-line', category: 'Gourmand', color: '#d4a96a', desc: 'Dulce y aterciopelado, crea una atmósfera cálida y acogedora.' },
  { id: 16, name: 'Bayas Navideñas', icon: 'ri-gift-line', category: 'Natal', color: '#8b1a1a', desc: 'Bayas rojas y especias, el espíritu navideño en cada llama.' },
  { id: 17, name: 'Dulce de Navidad', icon: 'ri-snowflake-line', category: 'Natal', color: '#b5651d', desc: 'Canela, naranja y vainilla — la magia de Navidad en forma de aroma.' },
  { id: 18, name: 'Citronela', icon: 'ri-bug-line', category: 'Herbal', color: '#9acd32', desc: 'Natural y refrescante, aleja insectos mientras perfuma el ambiente.' },
];

const categoryKeys = ['todos', 'tropical', 'frutal', 'herbal', 'citrico', 'gourmand', 'suave', 'aquatico', 'natal'];

import { useTranslation } from "react-i18next";

export default function Aromas() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const catMap: Record<string, string> = {
    todos: 'Todos', tropical: 'Tropical', frutal: 'Frutal', herbal: 'Herbal',
    citrico: 'Cítrico', gourmand: 'Gourmand', suave: 'Suave',
    aquatico: 'Acuático', natal: 'Natal'
  };

  const filtered = activeCategory === 'todos'
    ? aromas
    : aromas.filter((a) => a.category === catMap[activeCategory]);

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
              <h3 className="font-serif text-[#3a2a1e] text-sm font-medium leading-tight mb-1">{aroma.name}</h3>

              {/* Category badge */}
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: `${aroma.color}18`, color: aroma.color }}
              >
                {aroma.category}
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
                <h4 className="font-serif text-[#3a2a1e] text-sm font-semibold mb-2">{aroma.name}</h4>
                <p className="text-[#8a7a6a] text-xs leading-relaxed">{aroma.desc}</p>
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
