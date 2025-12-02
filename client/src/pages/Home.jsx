// Icons from Lucide
import {
  Home as HomeIcon, // Home component already exists
  Search,
  User,
  Heart,
  MessageCircle,
  Repeat,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null); // <-- add state

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data } = await axios.get("http://localhost:6969/api/posts");
      const allPosts = data.data;
      setPosts(allPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  // Close modal when clicking outside
  function closeModal(e) {
    if (e.target.id === "modal-overlay") {
      setSelectedPost(null);
    }
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 pb-2 mb-6 font-medium text-sm">
          <button className="border-b-2 border-black pb-2">For you</button>
          <button className="text-gray-500 pb-2">Following</button>
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
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-gray-500 text-sm">Loading posts...</span>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex gap-3 border border-gray-200 rounded-2xl p-4 shadow-sm hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedPost(post)} // modal open
              >
                {/* Avatar using imageURL */}
                <img
                  src={post.User.avatarURL}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />

                <div className="flex-1">
                  {/* Show user_id until you have usernames */}
                  <div className="font-semibold text-sm mb-1">
                   {post.User.displayName || post.User.username}
                  </div>

                  {/* Post content */}
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>

                  {/* Action buttons with live counts */}
                  <div className="flex gap-4 text-xs text-gray-400">
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-100">
                      <Heart size={16} /> {post.likeCount} Likes
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-100">
                      <MessageCircle size={16} /> {post.commentCount} Comments
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-100">
                      <Repeat size={16} /> Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Modal */}
        {selectedPost && (
          <div
            id="modal-overlay"
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
              <h2 className="text-lg font-bold mb-4">{selectedPost.title}</h2>
              <p className="text-gray-700 mb-6">{selectedPost.content}</p>
              <div className="text-sm text-gray-500">
                Written by {selectedPost.User.displayName || selectedPost.User.username}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
