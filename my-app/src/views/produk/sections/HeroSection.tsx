import styles from "./HeroSection.module.scss";


const HeroSection = () => {
  return (
    <section className={`${styles.hero} px-6 py-12 text-center bg-blue-50`}>
      <h1 data-testid="hero-title" className={`${styles.title} text-4xl font-bold text-blue-700`}>
        Halaman Produk
      </h1>
      <p className={`${styles.subtitle} mt-3 text-lg text-slate-600`}>
        Temukan produk terbaik untuk kebutuhan Anda.
      </p>
    </section>
  );
};

export default HeroSection;
