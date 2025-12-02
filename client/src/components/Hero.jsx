function Hero() {
  return (
    <>
      <div className="w-full bg-linear-to-bl from-teal-200 via-teal-400 to-teal-600 h-vh flex-col justify-center px-20 py-10 transition-all duration-500">
        <h1 className="text-center text-9xl text-white drop-shadow-lg animate-bounce">
          Ⓨ
        </h1>
        <h2 className="text-teal-900 text-center text-5xl font-bold font-stretch-200% mb-4">
          The Answer to X
        </h2>
        <h3 className="text-center text-2xl font-medium mb-8 text-teal-800">
          MicroBlogs without the Toxicity
        </h3>
        <hr className="w-50 mx-auto my-8 border-teal-600"></hr>
        <div className="flex items-center justify-center transition-all duration-500">
          <button className="px-6 py-2 mx-2 text-2xl rounded-3xl bg-blue-800 hover:bg-blue-950 text-white shadow-lg transition-all hover:scale-95">
            Log In
          </button>
          <button className="px-6 py-2 mx-2 text-2xl rounded-3xl bg-teal-300 hover:bg-teal-600 text-gray-800 shadow-lg transition-all hover:scale-95">
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
