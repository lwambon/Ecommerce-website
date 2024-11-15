function Hero() {
    return (
      <div
        className="bg-hero-pattern bg-cover bg-center min-h-[60rem] flex items-center justify-center"
      >
        <div className="text-center text-white p-6  bg-opacity-50 rounded-lg">
          <h1 className="text-6xl font-bold mb-4 text-white capitalize">Welcome to Zappy Cart</h1>
          <p className="text-xl mb-6 capitalize mt-2 text-white" >
            Discover the best collection of shoes at unbeatable prices!
          </p>
          <button className="px-6 py-3 text-3xl text-white bg-yellow-500  rounded-md hover:bg-yellow-900">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  
  export default Hero;
  