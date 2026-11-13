const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
  {
    imgPath: "/images/extra.png",
    title: "Extra Value",
    desc: "Adding more than promised, going beyond expectations.",
  },
];

const FeatureCards = () => (
  <section aria-label="How I work" className="relative w-full px-5 md:px-10 py-16 md:py-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:border-white/30 transition-colors duration-300"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-white/5">
            <img src={imgPath} alt={title} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="text-white text-xl md:text-2xl font-semibold">{title}</h3>
          <p className="text-white/70 text-base leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
