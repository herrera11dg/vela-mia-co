import { useState, FormEvent } from 'react';
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const data = new URLSearchParams({ email });
    try {
      await fetch('https://readdy.ai/api/form/d7f6p9fimhg6tri2v5rg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.collection'), href: '#colecao' },
    { label: t('nav.aromas'), href: '#aromas' },
    { label: t('nav.about'), href: '#sobre' },
    { label: t('nav.contact'), href: '#contacto' },
  ];

  return (
    <footer className="bg-[#faf7f2] border-t border-[#e8e0d5]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left - Brand */}
          <div className="flex flex-col items-start">
            <img
              src="https://static.readdy.ai/image/74d0e45231b3fc4ae0501b2bf4ea35dd/f55d8f286982cc72b4405a9014abd498.png"
              alt="Vela Mia Logo"
              className="h-12 w-auto object-contain mb-3"
            />
            <p className="text-[#8a7a6a] text-sm italic mb-4">{t("footer.brand.tagline")}</p>
            <p className="text-[#8a7a6a] text-xs leading-relaxed max-w-xs">
              {t("footer.brand.description")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: 'ri-instagram-line', href: '#' },
                { icon: 'ri-facebook-line', href: '#' },
                { icon: 'ri-pinterest-line', href: '#' },
                { icon: 'ri-tiktok-line', href: '#' },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center text-[#8a7a6a] hover:text-[#7a8c5e] transition-colors duration-200 cursor-pointer"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="text-[#3a2a1e] text-sm font-semibold mb-5 tracking-wide">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#8a7a6a] text-sm hover:text-[#7a8c5e] transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Newsletter */}
          <div className="flex flex-col items-start">
            <h4 className="text-[#3a2a1e] text-sm font-semibold mb-2 tracking-wide">{t("footer.newsletter.title")}</h4>
            <p className="text-[#8a7a6a] text-xs leading-relaxed mb-5">
              {t("footer.newsletter.description")}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#7a8c5e] text-sm">
                <i className="ri-checkbox-circle-line text-lg"></i>
                <span>{t("footer.newsletter.success")}</span>
              </div>
            ) : (
              <form
                data-readdy-form
                id="newsletter-form"
                onSubmit={handleSubscribe}
                className="flex w-full max-w-xs"
              >
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.placeholder")}
                  className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#e8e0d5] rounded-l-full text-[#3a2a1e] placeholder-[#b0a090] focus:outline-none focus:border-[#7a8c5e] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-[#7a8c5e] text-white rounded-r-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  <i className="ri-arrow-right-line text-sm"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e8e0d5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#b0a090] text-xs">
            {t("footer.copyright")}
          </p>
          <p className="text-[#b0a090] text-xs">
            {t("footer.madeWith")} <span className="text-[#7a8c5e]">{t("footer.madeWith.heart")}</span> {t("footer.madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}
