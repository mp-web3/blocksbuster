import text from "@/i18n/en/text.json";

const HeroSection = () => {
    return (
      <div id="hero" className="hero-section">
        <video className="hero-background-video" autoPlay loop muted>
          <source src="/Cube-Blockchain.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>{text.hero.title}</h1>
          <p>{text.hero.subTitle}</p>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  