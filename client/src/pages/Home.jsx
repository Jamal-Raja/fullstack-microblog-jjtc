const Home = () => (
  <div className="flex min-h-screen bg-white text-black">
    {/* Sidebar */}
    <aside className="w-64 border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
        />
      </div>

      <nav className="space-y-3 text-sm">
        <div className="flex items-center gap-2 cursor-pointer font-semibold">
           {/* magnify glass pic */} <span>Home</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          {/* mag glass pic */} <span>Search</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
         {/* user pic */}<span>Account Details</span>
        </div>
      </nav>
    </aside>

    {/* Main content */}
    <main className="flex-1 p-6">

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 pb-2 mb-6 font-medium text-sm">
        <button className="border-b-2 border-black pb-2">For you</button>
        <button className="text-gray-500">Following</button>
      </div>

      {/* Post input box */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <textarea
          placeholder="What’s on your mind?"
          className="flex-1 border border-gray-300 rounded-xl p-3 text-sm h-24 resize-none"
        />
      </div>

      {/* Feed */}
      <section className="space-y-5">
        {[1, 2, 3].map(post => (
          <div
            key={post}
            className="flex gap-3 border border-gray-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full shrink-0"></div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">Displayname</div>
              <p className="text-sm text-gray-700 mb-3">
                This is a sample post content...
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                
                <a href="#" className="inline-block">
                  <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100">
                    *heart* Like
                  </button>
                </a>

                <a href="#" className="inline-block">
                  <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100">
                    *comment* Comment
                  </button>
                </a>

                <a href="#" className="inline-block">
                  <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100">
                    *twitter arrow thingy* Share
                  </button>
                </a>

              </div>
            </div>
          </div>
        ))}
      </section>

    </main>
  </div>
);

export default Home;