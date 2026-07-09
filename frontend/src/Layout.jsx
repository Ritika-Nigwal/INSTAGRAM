// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import { useState } from "react";
const Layout = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshPost = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <>
      <Sidebar />
      <main className="md:ml-20 ml-0 p-4 min-h-screen bg-white overflow-y-auto">
        <Outlet context={{ refreshKey, refreshPost }} />
      </main>
      <div className="sm:pl-[50%] pl-[40%] z-10 fixed bottom-0 bg-gray-100 border-t-2 border-t-amber-700 w-full ">
        <CreatePost refresh={refreshPost} />
      </div>
    </>
  );
};
export default Layout;
