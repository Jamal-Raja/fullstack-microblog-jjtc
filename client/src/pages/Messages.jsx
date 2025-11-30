import Sidebar from "../components/Sidebar";

const Messages = () => {
  return (
    <>
      <div className="flex min-h-screen bg-white text-black">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="outline text-center">YOU ARE ON ME33AGES PAGE</h1>
        </main>
      </div>
    </>
  );
};

export default Messages;
