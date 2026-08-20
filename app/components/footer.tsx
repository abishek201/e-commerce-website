import "../css-components/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="contact">
          <h3>STAY CONNECTED</h3>
          <h4>abhi@gmail.com</h4>
          <h4>PH: 9353802818</h4>
        </div>

        <div className="logo-contact">
          <ul>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Mail</li>
          </ul>
        </div>
      </div>

      <div className="brand-name">
        <p>BRAND NAME</p>
      </div>
    </footer>
  );
}