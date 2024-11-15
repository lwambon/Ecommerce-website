import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="bg-hero-pattern bg-blend-darken bg-cover bg-gradient-to-bl-9 bg-center h-[100vh]  flex items-center justify-center">
      <div className="text-center text-white p-6  bg-opacity-50 rounded-lg">
        <h1 className="text-7xl font-bold mb-4 text-pink-700 uppercase">
          Welcome to Zappy Cart
        </h1>
        <p className="text-4xl mb-6 capitalize mt-6 text-white">
          Discover the best collection of shoes at unbeatable prices!
        </p>
        <button className="px-6 py-3 text-3xl text-white bg-yellow-500  rounded-md hover:bg-yellow-900">
          <Link to="/sign up">Shop Now</Link>
        </button>
      </div>
    </div>
  );
}

export default Hero;
