import { HomeIcon, MessageCircle, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>
        {/* SIDEBAR LINKS */}
        <nav className="space-y-5 text-md">
          {/* Home */}
          <Link to="/">
            <div className="flex items-center gap-2 cursor-pointer font-semibold">
              <HomeIcon />
              <span>Home</span>
            </div>
          </Link>
          {/* Search */}
          <Link to="">
            <div className="flex items-center gap-2 cursor-pointer">
              <Search /> <span>Search</span>
            </div>
          </Link>
          {/* Account */}
          <Link to="">
            <div className="flex items-center gap-2 cursor-pointer">
              <User />
              <span>Account</span>
            </div>
          </Link>
          {/* Messages */}
          <Link to="/messages">
            <div className="flex items-center gap-2 cursor-pointer">
              <MessageCircle />
              <span>Messages</span>
            </div>
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
