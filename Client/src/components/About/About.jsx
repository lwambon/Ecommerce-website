import "./About.css";
import AboutVideo from "../../assets/herovideo.mp4";

function About() {
  return (
    <div className="about-container">
      <div className="about-video">
        <video autoPlay loop muted className="about-video-player">
          <source src={AboutVideo} type="video/mp4" />
        </video>
      </div>
      <div className="about-description">
        <h2>Welcome to Radiant Online Store</h2>
        <p>
          At Radiant, we strive to bring you the best in online shopping.
          Whether you’re searching for high-quality beauty products, fresh
          groceries, elegant furniture, luxurious fragrances, or the latest in
          styling trends, we’ve got something for everyone. Our store is
          dedicated to offering a diverse range of items that suit your
          lifestyle and needs.
        </p>
        <p>
          With our commitment to providing only the finest products, Radiant
          makes shopping easier and more enjoyable. Our collection is carefully
          curated to ensure that you have access to the latest trends,
          exceptional quality, and great prices all in one place.
        </p>
        <p>
          Join us as we bring beauty, convenience, and style into your life –
          all with the simple click of a button!
        </p>
      </div>
    </div>
  );
}

export default About;
