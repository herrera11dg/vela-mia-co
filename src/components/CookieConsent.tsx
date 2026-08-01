import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const COOKIE_KEY = "velamia_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (value: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={() => handleChoice("rejected")}></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#faf7f2] border border-[#e8e0d5] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#7a8c5e] px-8 py-6 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0">
            <i className="ri-cookie-line text-2xl text-white"></i>
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-white font-medium">
              {t("cookies.banner.title")}
            </h2>
            <p className="text-white/80 text-xs mt-0.5">{t("cookies.banner.subtitle")}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-[#6a5a4a] text-sm leading-relaxed">
            {t("cookies.banner.text")}
          </p>
          <p className="text-[#8a7a6a] text-xs leading-relaxed mt-3">
            {t("cookies.banner.details")}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
            <button
              onClick={() => handleChoice("accepted")}
              className="flex-1 px-6 py-3 bg-[#7a8c5e] text-white text-sm font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {t("cookies.banner.accept")}
            </button>
            <button
              onClick={() => handleChoice("rejected")}
              className="flex-1 px-6 py-3 border border-[#d4c9bc] text-[#6a5a4a] text-sm font-medium rounded-full hover:bg-[#f0ebe3] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {t("cookies.banner.reject")}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 pt-5 border-t border-[#e8e0d5]">
            <Link
              to="/cookies"
              className="text-[#7a8c5e] text-xs font-medium hover:underline cursor-pointer"
            >
              {t("cookies.banner.link")}
            </Link>
            <Link
              to="/privacy-policy"
              className="text-[#7a8c5e] text-xs font-medium hover:underline cursor-pointer"
            >
              {t("footer.legal.privacy")}
            </Link>
            <Link
              to="/terms"
              className="text-[#7a8c5e] text-xs font-medium hover:underline cursor-pointer"
            >
              {t("footer.legal.terms")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
