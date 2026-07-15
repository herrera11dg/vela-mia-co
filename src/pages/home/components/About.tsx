import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="sobre" className="bg-[#7a8c5e] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Title */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs tracking-[0.3em] text-white/60 uppercase font-medium">{t("about.badge")}</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 leading-tight">
            {t("about.title.p1")}<br className="hidden md:block" />{t("about.title.p2")}
          </h2>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("about.description")}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="h-px w-16 bg-white/30"></div>
          <i className="ri-leaf-line text-white/50 text-lg"></i>
          <div className="h-px w-16 bg-white/30"></div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <div className="bg-white/10 rounded-2xl p-8 md:p-10">
            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full mb-5">
              <i className="ri-heart-line text-white text-lg"></i>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{t("about.mission.title")}</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {t("about.mission.p1")}
            </p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mt-4">
              {t("about.mission.p2")}
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 md:p-10">
            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full mb-5">
              <i className="ri-eye-line text-white text-lg"></i>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{t("about.vision.title")}</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {t("about.vision.p1")}
            </p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mt-4">
              {t("about.vision.p2")}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: 'ri-leaf-line', label: t("about.value.natural"), desc: t("about.value.natural.desc") },
            { icon: 'ri-hand-heart-line', label: t("about.value.artisan"), desc: t("about.value.artisan.desc") },
            { icon: 'ri-recycle-line', label: t("about.value.sustainable"), desc: t("about.value.sustainable.desc") },
            { icon: 'ri-map-pin-line', label: t("about.value.colombian"), desc: t("about.value.colombian.desc") },
          ].map((value) => (
            <div key={value.label} className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-full mx-auto mb-3">
                <i className={`${value.icon} text-white text-xl`}></i>
              </div>
              <p className="text-white font-medium text-sm mb-1">{value.label}</p>
              <p className="text-white/60 text-xs leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
