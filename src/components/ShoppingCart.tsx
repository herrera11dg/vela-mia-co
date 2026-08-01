import { useCart } from "../context/cart";
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
  const { t } = useTranslation();
  const {
    items,
    isOpen,
    openCart,
    closeCart,
    removeFromCart,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div>
      {/* Floating cart button */}
      <button
        onClick={openCart}
        aria-label={t("cart.title")}
        className="fixed bottom-6 right-6 bg-[#7a8c5e] text-white p-4 rounded-full shadow-lg hover:bg-[#6a7a50] transition-colors duration-200 z-50 cursor-pointer"
      >
        <div className="relative">
          <i className="ri-shopping-bag-line text-xl"></i>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-[#3a2a1e] text-white text-[10px] font-bold rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeCart}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#faf7f2] shadow-2xl transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e8e0d5] flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#3a2a1e]">
            {t("cart.title")}
            {totalItems > 0 && (
              <span className="ml-2 text-sm text-[#8a7a6a]">
                ({totalItems} {t("cart.items")})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label={t("cart.close")}
            className="w-8 h-8 flex items-center justify-center text-[#8a7a6a] hover:text-[#3a2a1e] transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#f0ebe3] rounded-full">
              <i className="ri-shopping-bag-line text-2xl text-[#b0a090]"></i>
            </div>
            <p className="text-[#8a7a6a] text-sm">{t("cart.empty")}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-xl p-3 border border-[#e8e0d5]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-[#3a2a1e] font-medium leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[#7a8c5e] text-sm font-medium mt-1">
                    {formatPrice(item.priceValue)}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 border border-[#d4c9bc] rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={t("cart.decrease")}
                        className="w-6 h-6 flex items-center justify-center text-[#6a5a4a] hover:text-[#7a8c5e] transition-colors cursor-pointer"
                      >
                        <i className="ri-subtract-line text-sm"></i>
                      </button>
                      <span className="text-sm text-[#3a2a1e] font-medium w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label={t("cart.increase")}
                        className="w-6 h-6 flex items-center justify-center text-[#6a5a4a] hover:text-[#7a8c5e] transition-colors cursor-pointer"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={t("cart.remove")}
                      className="text-[#b0a090] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-base"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e8e0d5] p-5 flex flex-col gap-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8a7a6a]">{t("cart.total")}</span>
              <span className="font-serif text-xl text-[#3a2a1e] font-medium">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => {
                window.location.hash = "#contacto";
                closeCart();
              }}
              className="w-full py-3 bg-[#7a8c5e] text-white text-sm font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer"
            >
              {t("cart.checkout")}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2.5 border border-[#d4c9bc] text-[#8a7a6a] text-xs font-medium rounded-full hover:bg-[#f0ebe3] transition-colors duration-200 cursor-pointer"
            >
              {t("cart.clear")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
