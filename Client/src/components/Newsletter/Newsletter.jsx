import "./Newsletter.css";

function Newsletter() {
  return (
    <div className="newsletter">
      <h1 className="newsletter-heading">get exclusive offers on your email</h1>
      <p className="newsletter-info">
        subscribe to our newsletter and stay updated
      </p>
      <div className="emailNewsletter">
        <input type="email" placeholder="your email" />
        <button className="newsletter-button">subscribe</button>
      </div>
    </div>
  );
}

export default Newsletter;
