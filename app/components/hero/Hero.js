const HeroSection = () => {
    return (
      <div className="hero-section">
        <video className="hero-background-video" autoPlay loop muted>
          <source src="/Cube-Blockchain.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>Explore the World of Blockchain</h1>
          <p>Stay updated with the latest trends and insights</p>
          <button className="hero-cta">Discover More</button>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  