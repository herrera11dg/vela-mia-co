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
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-[#faf7f2] border border-[#e8e0d5] rounded-2xl shadow-lg px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-[#3a2a1e] font-semibold text-sm mb-1">{t("cookies.banner.title")}</p>
          <p className="text-[#8a7a6a] text-xs leading-relaxed">{t("cookies.banner.text")}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Link
            to="/cookies"
            className="text-[#7a8c5e] text-xs font-medium hover:underline cursor-pointer whitespace-nowrap text-center"
          >
            {t("cookies.banner.link")}
          </Link>
          <button
            onClick={() => handleChoice("rejected")}
            className="px-5 py-2.5 border border-[#d4c9bc] text-[#6a5a4a] text-xs font-medium rounded-full hover:bg-[#f0ebe3] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            {t("cookies.banner.reject")}
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="px-5 py-2.5 bg-[#7a8c5e] text-white text-xs font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            {t("cookies.banner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
