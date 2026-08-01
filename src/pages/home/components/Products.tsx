import { products } from "@/data/products";
import { useCart } from "@/context/cart";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();
  const { addToCart, addAllToCart, openCart } = useCart();

  const handleAddAll = () => {
    addAllToCart(products);
    openCart();
  };

  return (
    <section id="colecao" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">{t("products.badge")}</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] mt-3 mb-4">{t("products.title")}</h2>
          <p className="text-[#8a7a6a] text-base max-w-xl mx-auto leading-relaxed">
            {t("products.description")}
          </p>
        </div>

        {/* Add all to cart */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleAddAll}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#7a8c5e] text-[#7a8c5e] text-sm font-medium rounded-full hover:bg-[#7a8c5e] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-add-line text-base"></i>
            {t("products.addAll")}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden bg-[#f5f0e8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 md:p-5">
                <h3 className="font-serif text-sm md:text-base text-[#3a2a1e] mb-2 leading-snug flex-1">{product.name}</h3>
                <p className="text-[#7a8c5e] font-medium text-sm md:text-base mb-4">{product.price}</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      addToCart(product);
                      openCart();
                    }}
                    className="inline-flex items-center justify-center w-full py-2.5 bg-[#7a8c5e] text-white text-xs font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-1 text-sm"></i>
                    {t("products.addToCart")}
                  </button>
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center w-full py-2.5 border border-[#d4c9bc] text-[#6a5a4a] text-xs font-medium rounded-full hover:bg-[#f0ebe3] transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    {t("products.order")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-[#8a7a6a] text-sm mb-4">{t("products.cta.question")}</p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-[#7a8c5e] text-sm font-medium border-b border-[#7a8c5e] pb-0.5 hover:gap-3 transition-all duration-200 cursor-pointer"
          >
            {t("products.cta.link")}
            <i className="ri-arrow-right-line text-base"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
