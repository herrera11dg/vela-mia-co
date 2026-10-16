import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation();
  const [activeTag, setActiveTag] = useState('all');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [lightboxItem, setLightboxItem] = useState<{ id: number; src: string; alt: string; caption: string; likes: number; tag: string } | null>(null);

  const tagKeys = ['all', 'process', 'ingredients', 'collection', 'aromas', 'packaging', 'lifestyle'];

  const galleryItems = [
    {
      id: 1,
      src: "https://readdy.ai/api/search-image?query=artisan%20hands%20pouring%20melted%20soy%20wax%20into%20glass%20jar%20candle%20mold%2C%20warm%20golden%20light%2C%20close%20up%20detail%20shot%2C%20natural%20textures%2C%20handmade%20candle%20making%20process%2C%20cream%20ivory%20background%2C%20rustic%20wooden%20table%2C%20craft%20workshop%20atmosphere%2C%20high%20quality%20photography&width=600&height=600&seq=gallery-vela-001&orientation=squarish",
      alt: t("gallery.alt.pouring"),
      caption: t("gallery.caption.pouring"),
      likes: 247,
      tag: "process"
    },
    {
      id: 2,
      src: "https://readdy.ai/api/search-image?query=dried%20botanicals%20flowers%20lavender%20rose%20petals%20arranged%20on%20white%20marble%20surface%20next%20to%20soy%20wax%20candle%2C%20flat%20lay%20photography%2C%20natural%20light%2C%20artisan%20candle%20ingredients%2C%20minimalist%20styling%2C%20soft%20pastel%20tones%2C%20handmade%20craft&width=600&height=600&seq=gallery-vela-002&orientation=squarish",
      alt: t("gallery.alt.ingredients"),
      caption: t("gallery.caption.ingredients"),
      likes: 312,
      tag: "ingredients"
    },
    {
      id: 3,
      src: "https://readdy.ai/api/search-image?query=wooden%20wick%20being%20placed%20carefully%20into%20glass%20candle%20jar%20filled%20with%20creamy%20soy%20wax%2C%20artisan%20hands%20close%20up%2C%20warm%20workshop%20light%2C%20handmade%20candle%20making%2C%20natural%20materials%2C%20craft%20process%20detail%2C%20ivory%20cream%20tones&width=600&height=600&seq=gallery-vela-003&orientation=squarish",
      alt: t("gallery.alt.wick"),
      caption: t("gallery.caption.wick"),
      likes: 189,
      tag: "process"
    }
  ];

  const filtered = activeTag === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.tag === activeTag);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="galeria" className="py-24 bg-[#faf7f2]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">
            {t("gallery.badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] mt-3 mb-4">
            {t("gallery.title")}
          </h2>
          <p className="text-[#8a7a6a] text-base max-w-xl mx-auto leading-relaxed">
            {t("gallery.description")}
          </p>

          {/* Instagram handle badge */}
          <a
            href="https://instagram.com/velamiavela"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-[#d4c9bc] rounded-full text-sm text-[#6a5a4a] hover:border-[#7a8c5e] hover:text-[#7a8c5e] transition-all duration-300 cursor-pointer"
          >
            <i className="ri-instagram-line text-base"></i>
            <span>{t("gallery.instagram")}</span>
          </a>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tagKeys.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide capitalize transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTag === tag
                  ? 'bg-[#7a8c5e] text-white'
                  : 'bg-white border border-[#d4c9bc] text-[#6a5a4a] hover:border-[#7a8c5e] hover:text-[#7a8c5e]'
              }`}
            >
               {t(`gallery.filter.${tag}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? 'sm:col-span-1 lg:col-span-1' : ''
              }`}
              onClick={() => setLightboxItem(item)}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#3a2a1e]/0 group-hover:bg-[#3a2a1e]/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <p className="text-white text-sm font-medium text-center px-4 leading-snug">
                  {item.caption}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className="flex items-center gap-1.5 text-white text-sm cursor-pointer"
                  >
                    <i className={`${likedItems.has(item.id) ? 'ri-heart-fill text-red-400' : 'ri-heart-line'} text-lg`}></i>
                    <span>{likedItems.has(item.id) ? item.likes + 1 : item.likes}</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-white text-sm">
                    <i className="ri-expand-diagonal-line text-lg"></i>
                  </div>
                </div>
              </div>

              {/* Tag badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white/90 backdrop-blur-sm text-[#7a8c5e] text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                  #{item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-[#8a7a6a] text-sm mb-5">
            {t("gallery.cta")} <strong className="text-[#7a8c5e]">{t("gallery.cta.hashtag")}</strong> {t("gallery.cta.suffix")}
          </p>
          <a
            href="#colecao"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7a8c5e] text-white text-sm font-medium rounded-full hover:bg-[#6a7a50] transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-bag-line"></i>
            {t("gallery.cta.button")}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Instagram-style header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f0ebe3]">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7a8c5e] to-[#a8b88a]">
                <span className="text-white text-xs font-serif font-bold">VM</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3a2a1e]">velamia.co</p>
                <p className="text-xs text-[#8a7a6a]">{t("gallery.lightbox.location")}</p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="ml-auto w-8 h-8 flex items-center justify-center text-[#6a5a4a] hover:text-[#3a2a1e] cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Image */}
            <div className="w-full aspect-square">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-4 mb-3">
                <button
                  onClick={(e) => toggleLike(lightboxItem.id, e)}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer"
                >
                  <i className={`${likedItems.has(lightboxItem.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-[#3a2a1e]'} text-2xl`}></i>
                </button>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-chat-1-line text-2xl text-[#3a2a1e]"></i>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-share-forward-line text-2xl text-[#3a2a1e]"></i>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#3a2a1e] mb-1">
                {likedItems.has(lightboxItem.id) ? lightboxItem.likes + 1 : lightboxItem.likes} {t("gallery.likes")}
              </p>
              <p className="text-sm text-[#3a2a1e]">
                <span className="font-semibold">velamia.co</span>{' '}
                {lightboxItem.caption}
              </p>
              <p className="text-xs text-[#8a7a6a] mt-2 uppercase tracking-wide">
                #{lightboxItem.tag} #velamia #velaartesanal #ceradesoja
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
