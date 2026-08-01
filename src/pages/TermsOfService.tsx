import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./home/components/Navbar";
import Footer from "./home/components/Footer";

export default function TermsOfService() {
  const { t } = useTranslation();

  const sections = [
    { title: t("terms.s1.title"), body: t("terms.s1.text") },
    { title: t("terms.s2.title"), body: t("terms.s2.text") },
    { title: t("terms.s3.title"), body: t("terms.s3.text") },
    {
      title: t("terms.s4.title"),
      body: [t("terms.s4.p1"), t("terms.s4.p2"), t("terms.s4.p3")],
    },
    { title: t("terms.s5.title"), body: t("terms.s5.text") },
    { title: t("terms.s6.title"), body: t("terms.s6.text") },
    { title: t("terms.s7.title"), body: t("terms.s7.text") },
    { title: t("terms.s8.title"), body: t("terms.s8.text") },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#faf7f2]">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#7a8c5e] text-sm font-medium hover:underline cursor-pointer mb-8"
          >
            <i className="ri-arrow-left-line"></i>
            {t("legal.back")}
          </Link>
          <span className="text-xs tracking-[0.3em] text-[#7a8c5e] uppercase font-medium">
            Vela Mia
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3a2a1e] leading-tight mt-3 mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-[#8a7a6a] text-sm italic mb-2">{t("terms.subtitle")}</p>
          <p className="text-[#b0a090] text-xs mb-10">
            {t("legal.updated")} 2026
          </p>

          <div className="flex flex-col gap-8">
            {sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="font-serif text-xl text-[#3a2a1e] font-medium mb-3">
                  {section.title}
                </h2>
                {Array.isArray(section.body) ? (
                  <ul className="flex flex-col gap-3 list-disc list-outside pl-5">
                    {section.body.map((item, i) => (
                      <li key={i} className="text-[#6a5a4a] text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#6a5a4a] text-sm leading-relaxed">{section.body}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
