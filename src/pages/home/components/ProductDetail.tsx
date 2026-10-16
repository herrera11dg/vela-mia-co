import { useTranslation } from "react-i18next";

const productDetails = [
  {
    id: 1,
    nameKey: 'productDetail.data.1.name',
    categoryKey: 'productDetail.data.1.category',
    price: '$75.000',
    burnTimeKey: 'productDetail.data.1.burnTime',
    weight: '200g',
    descriptionKey: 'productDetail.data.1.description',
    featuresKeys: [
      'productDetail.data.1.f1',
      'productDetail.data.1.f2',
      'productDetail.data.1.f3',
      'productDetail.data.1.f4',
    ],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/7a8dc39c50f804f625fcea84a48d1f82.jpeg',
  },
  {
    id: 2,
    nameKey: 'productDetail.data.2.name',
    categoryKey: 'productDetail.data.2.category',
    price: '$100.000',
    burnTimeKey: 'productDetail.data.2.burnTime',
    weight: '180g',
    descriptionKey: 'productDetail.data.2.description',
    featuresKeys: [
      'productDetail.data.2.f1',
      'productDetail.data.2.f2',
      'productDetail.data.2.f3',
      'productDetail.data.2.f4',
    ],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/78e9de1d64cf2591a67b3f46522f49fb.jpeg',
  },
  {
    id: 3,
    nameKey: 'productDetail.data.3.name',
    categoryKey: 'productDetail.data.3.category',
    price: '$250.000',
    burnTimeKey: 'productDetail.data.3.burnTime',
    weight: '150g',
    descriptionKey: 'productDetail.data.3.description',
    featuresKeys: [
      'productDetail.data.3.f1',
      'productDetail.data.3.f2',
      'productDetail.data.3.f3',
      'productDetail.data.3.f4',
    ],
    image: 'https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/487beb695b07a487e7af8d7d1e36dc95.jpeg',
  },
];

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
                    alt={t(product.nameKey)}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-[55%]">
                <span className="text-xs tracking-[0.25em] text-[#7a8c5e] uppercase font-medium">{t(product.categoryKey)}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#3a2a1e] mt-2 mb-4">{t(product.nameKey)}</h3>
                <p className="text-[#6a5a4a] text-base leading-relaxed mb-6">{t(product.descriptionKey)}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-[#8a7a6a] mb-1">{t("productDetail.price")}</p>
                    <p className="font-serif text-lg text-[#3a2a1e] font-medium">{product.price}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-[#8a7a6a] mb-1">{t("productDetail.duration")}</p>
                    <p className="font-serif text-lg text-[#3a2a1e] font-medium">{t(product.burnTimeKey)}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2 mb-8">
                  {product.featuresKeys.map((fKey) => (
                    <li key={fKey} className="flex items-center gap-3 text-sm text-[#6a5a4a]">
                      <span className="w-5 h-5 flex items-center justify-center bg-[#7a8c5e]/15 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-[#7a8c5e] text-xs"></i>
                      </span>
                      {t(fKey)}
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
