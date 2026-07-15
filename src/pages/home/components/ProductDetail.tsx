const productDetails = [
  {
    id: 1,
    name: 'Vela Bubble',
    category: 'Velas de Decoración',
    price: '$75.000',
    burnTime: '40-50 horas',
    weight: '200g',
    description:
      'Nuestra Vela Bubble es una obra de arte funcional. Moldeada a mano con cera de soja 100% natural, esta vela decorativa traz elegancia y sofisticación a cualquier espacio. El aroma es a elección del cliente.',
    features: ['Cera de soja 100% natural', 'Mecha de algodón orgánico', 'Sin parabenos ni toxinas', 'Empaque reciclable'],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/7a8dc39c50f804f625fcea84a48d1f82.jpeg',
  },
  {
    id: 2,
    name: 'Vela Frasco de Madera',
    category: 'Momentos y Aromas',
    price: '$100.000',
    burnTime: '35-45 horas',
    weight: '180g',
    description:
      'En un frasco de vidro reutilizable con tapa de madera natural, esta vela combina estética y funcionalidad. La mecha de madera crepita suavemente al arder, creando una experiencia sensorial completa. El aroma es a elección del cliente.',
    features: ['Frasco de vidro reutilizable', 'Mecha de madera natural', 'Aroma terapéutico', 'Tapa de madera incluida'],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/78e9de1d64cf2591a67b3f46522f49fb.jpeg',
  },
  {
    id: 3,
    name: 'Bouquet de Rosas',
    category: 'Regalos Especiales',
    price: '$250.000',
    burnTime: '30-40 horas',
    weight: '150g',
    description:
      'Una vela que es también una obra de arte. Decorada con flores secas de rosa y margarita, cada pieza es única e irrepetible. Presentada en un empaque de papel kraft artesanal, es el regalo perfecto para quien aprecia lo bello y lo natural.',
    features: ['Flores secas naturales', 'Empaque kraft artesanal', 'Edición limitada', 'Ideal para regalar'],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/487beb695b07a487e7af8d7d1e36dc95.jpeg',
  },
];

import { useTranslation } from "react-i18next";

export default function ProductDetail() {
  const { t } = useTranslation();
  return (
    <section id="aromas" className="bg-[#f5f0e8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">{t("productDetail.badge")}</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] mt-3 mb-4">{t("productDetail.title")}</h2>
          <p className="text-[#8a7a6a] text-base max-w-xl mx-auto leading-relaxed">
            {t("productDetail.description")}
          </p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-16 md:gap-24">
          {productDetails.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-[45%]">
                <div className="relative rounded-2xl overflow-hidden w-full h-[360px] md:h-[440px] bg-[#ede8df]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-[55%]">
                <span className="text-xs tracking-[0.25em] text-[#7a8c5e] uppercase font-medium">{product.category}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#3a2a1e] mt-2 mb-4">{product.name}</h3>
                <p className="text-[#6a5a4a] text-base leading-relaxed mb-6">{product.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-[#8a7a6a] mb-1">{t("productDetail.price")}</p>
                    <p className="font-serif text-lg text-[#3a2a1e] font-medium">{product.price}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-[#8a7a6a] mb-1">{t("productDetail.duration")}</p>
                    <p className="font-serif text-lg text-[#3a2a1e] font-medium">{product.burnTime}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#6a5a4a]">
                      <span className="w-5 h-5 flex items-center justify-center bg-[#7a8c5e]/15 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-[#7a8c5e] text-xs"></i>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7a8c5e] text-white text-sm font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  {t("productDetail.order")}
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
