import { useState, FormEvent } from 'react';
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    try {
      await fetch('https://readdy.ai/api/form/d7f6p9fimhg6tri2v5s0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Left Info */}
          <div className="w-full lg:w-[45%]">
            <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">{t("contact.badge")}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] mt-3 mb-6 leading-tight">
              {t("contact.title")}
            </h2>
            <p className="text-[#6a5a4a] text-base leading-relaxed mb-10">
              {t("contact.description")}
            </p>

            <div className="flex flex-col gap-6">
              {[
                { icon: 'ri-mail-line', label: t("contact.email"), value: 'velamia_col@gmail.com' },
                { icon: 'ri-instagram-line', label: t("contact.instagram"), value: '@velamia_co' },
                { icon: 'ri-whatsapp-line', label: t("contact.whatsapp"), value: '+57 323 287 9452', href: 'https://wa.me/573232879452' },
                { icon: 'ri-map-pin-line', label: t("contact.location"), value: t("contact.location.value") },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#7a8c5e]/10 rounded-full flex-shrink-0">
                    <i className={`${item.icon} text-[#7a8c5e] text-lg`}></i>
                  </div>
                  <div>
                    <p className="text-xs text-[#8a7a6a] mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#3a2a1e] font-medium hover:text-[#7a8c5e] transition-colors cursor-pointer">{item.value}</a>
                    ) : (
                      <p className="text-sm text-[#3a2a1e] font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="mt-10 rounded-2xl overflow-hidden w-full h-[220px] md:h-[260px]">
              <img
                src="https://readdy.ai/api/search-image?query=artisan%20candle%20making%20workshop%2C%20hands%20crafting%20soy%20wax%20candles%2C%20natural%20light%2C%20warm%20tones%2C%20wooden%20table%2C%20botanical%20elements%2C%20cozy%20atmosphere%2C%20handmade%20craft%20studio%20Portugal&width=700&height=260&seq=contact-workshop-001&orientation=landscape"
                alt="Atelier Vela Mia"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-[55%]">
            {submitted ? (
              <div className="bg-[#7a8c5e]/10 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#7a8c5e] rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-white text-2xl"></i>
                </div>
                <h3 className="font-serif text-2xl text-[#3a2a1e] mb-2">{t("contact.success.title")}</h3>
                <p className="text-[#6a5a4a] text-sm">{t("contact.success.description")}</p>
              </div>
            ) : (
              <form
                data-readdy-form
                id="contact-form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-10 flex flex-col gap-5"
              >
                <h3 className="font-serif text-2xl text-[#3a2a1e] mb-2">{t("contact.form.title")}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[#8a7a6a] mb-1.5 font-medium">{t("contact.form.name")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t("contact.form.name.placeholder")}
                      className="w-full px-4 py-3 text-sm bg-[#faf7f2] border border-[#e8e0d5] rounded-xl text-[#3a2a1e] placeholder-[#b0a090] focus:outline-none focus:border-[#7a8c5e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8a7a6a] mb-1.5 font-medium">{t("contact.form.email")}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t("contact.form.email.placeholder")}
                      className="w-full px-4 py-3 text-sm bg-[#faf7f2] border border-[#e8e0d5] rounded-xl text-[#3a2a1e] placeholder-[#b0a090] focus:outline-none focus:border-[#7a8c5e] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#8a7a6a] mb-1.5 font-medium">{t("contact.form.subject")}</label>
                  <select
                    name="subject"
                    required
                    className="w-full px-4 py-3 text-sm bg-[#faf7f2] border border-[#e8e0d5] rounded-xl text-[#3a2a1e] focus:outline-none focus:border-[#7a8c5e] transition-colors cursor-pointer"
                  >
                    <option value="">{t("contact.form.subject.placeholder")}</option>
                    <option value="encomenda">{t("contact.form.subject.order")}</option>
                    <option value="informacao">{t("contact.form.subject.info")}</option>
                    <option value="presente">{t("contact.form.subject.gift")}</option>
                    <option value="parceria">{t("contact.form.subject.partnership")}</option>
                    <option value="outro">{t("contact.form.subject.other")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#8a7a6a] mb-1.5 font-medium">{t("contact.form.message")}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    placeholder={t("contact.form.message.placeholder")}
                    className="w-full px-4 py-3 text-sm bg-[#faf7f2] border border-[#e8e0d5] rounded-xl text-[#3a2a1e] placeholder-[#b0a090] focus:outline-none focus:border-[#7a8c5e] transition-colors resize-none"
                  />
                  <p className="text-xs text-[#b0a090] mt-1">{t("contact.form.charLimit")}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#7a8c5e] text-white text-sm font-medium rounded-full hover:bg-[#6a7a50] transition-colors duration-200 cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? t("contact.form.sending") : t("contact.form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
