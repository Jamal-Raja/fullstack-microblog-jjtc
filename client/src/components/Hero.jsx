function Hero() {
  return (
    <>
      <div className="outline w-full bg-linear-to-bl from-teal-200 to-teal-500 from h-dvh flex-col flex-wrap items-center px-20 py-10">
        <h1 className="text-center text-9xl align animate-bounce">Ⓨ</h1>
        <h2 className="text-center text-5xl font-bold font-stretch-200% mb-4">
          The Answer to X
        </h2>
        <h3 className="text-center text-2xl font-medium mb-8 text-teal-800">
          MicroBlogs without the Toxicity
        </h3>
        <hr class="w-50 mx-auto my-8 border-teal-600"></hr>
        <div class="flex items-center justify-center">
          <button className="px-6 py-2 mx-2 text-2xl rounded-3xl bg-blue-800 hover:bg-blue-950 text-white">
            Sign In
          </button>
          <button className="px-6 py-2 mx-2 text-2xl rounded-3xl bg-teal-500 hover:bg-teal-600 text-gray-800">
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;