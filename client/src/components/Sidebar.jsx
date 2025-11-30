import { HomeIcon, MessageCircle, Search, User } from "lucide-react";

function Sidebar() {
  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>

        <nav className="space-y-5 text-md">
          <div className="flex items-center gap-2 cursor-pointer font-semibold">
            <HomeIcon />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Search /> <span>Search</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <User />
            <span>Account</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <MessageCircle />
            <span>Messages</span>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
