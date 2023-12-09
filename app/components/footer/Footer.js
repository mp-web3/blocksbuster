import text from "@/i18n/en/text.json";
const Footer = () => {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <p>{text.footer.copyright}</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  