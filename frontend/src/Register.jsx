import { get_post } from "./Services/profile";
import { useState, useEffect } from "react";
import UserPosts from "./Cards/UserPosts";
import ReactDOM from "react-dom";
import { update_user } from "./Services/register";
import { uploadFile } from "./Services/uploadImage";
import { getCurrentUser } from "./Services/getUser";
import ExpireModal from "./Modals/ExpireModal";
import { useOutletContext } from "react-router-dom";

import { Spin } from "antd";
const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user_post, setUserPost] = useState([]);
  const { refreshKey, refreshPost } = useOutletContext();
  const [flag, setFlag] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [expire, setExpire] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchUserInfo = async () => {
    if (user) {
      const Userdata = await getCurrentUser(user.user_id);
      if (Userdata === 401) {
        setExpire(true);
        setLoading(false);
      }
      setLoading(false);
      setUserInfo(Userdata);
    } else {
      setExpire(true);
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    if (user) {
      const data = await get_post(user.access_token, user.user_id);
      if (data === 401) {
        setExpire(true);
      } else {
        setUserPost([...data]);
      }
    } else {
      setExpire(true);
    }
  };
  const create = async (e) => {
    setLoading(true)
    setFlag(false)
    e.preventDefault();
    if (user) {
      const url = await uploadFile(image, user.access_token);
      if (url === 401) {
        setLoading(false)
        setExpire(true);
      }
      if (!image) {
        alert("image is required....");
        return;
      }
      const successMessage = await update_user(url.filename, bio);
      if(successMessage){
        setLoading(false)
      }
      setBio("");
      fetchUserInfo();
    } else {
      setExpire(true);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUser();
  }, [refreshKey]);
  return (
    <>
      {expire ? (
        <ExpireModal />
      ) : (
        <div
          style={{
            backgroundImage:
              'url("https://th.bing.com/th/id/OIP.zqGuGQNW-UYxaPqHqa7CsQHaEo?w=263&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3")',
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
          className=""
        >
          <div className="h-40 p-2 items-center ml-4 w-78 sm:w-280 mt-10 flex justify-between bg-[linear-gradient(135deg,#52c2eef0,rgb(100,320,320),rgb(200,400,200))] sm:h-70 rounded-xl sm:p-10 ">
            <div className="">
              <img
                className="h-14 w-16 sm:w-30  sm:h-30 text-[#52c2eef0] cursor-pointer rounded-full border-2 border-amber-50"
                src={`${userInfo.profile}`}
                onClick={() => setShowProfile(true)}
              />
              <p className="ml-2 mt-2 text-l sm:text-2xl sm:my-4  font-serif">
                {userInfo.username}
              </p>
              <p className="ml-2">{userInfo.bio}</p>
            </div>
            <button
              onClick={() => setFlag(true)}
              className="bg-blue-600 cursor-pointer sm:h-12 p-1 sm:p-1 text-[10px] sm:text-2xl whitespace-nowrap mt-20 h-8 rounded-xl border-2 border-blue-900 text-white"
            >
              Edit Profile
            </button>
          </div>
          <div className="ml-10 sm:my-10 sm:text-3xl font-medium font-[cursive] underline">
            All Posts
          </div>
          <div className=" ml-4 flex flex-wrap justify-start">
            {user_post.map((user) => (
              <UserPosts
                key={user.id}
                id={user.id}
                isYou={true}
                post={`${user.image_url}`}
              />
            ))}
          </div>
          {flag &&
            ReactDOM.createPortal(
              <div className="fixed  inset-0 bg-[rgba(39,38,38,0.87)]">
                <form
                  onSubmit={create}
                  className="absolute z-50 sm:left-[35%] border-t-10 border-t-blue-500 sm:w-100 sm:border-t-20  top-[30%] w-65 left-[12%] p-4 rounded-xl bg-white "
                >
                  <p className="sm:text-2xl sm:mb-4 font-bold text-blue-800">
                    upload File
                  </p>
                  <input
                    placeholder=" "
                    className="border w-50 sm:w-85 sm:mb-4 bg-gray-200"
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                  ></input>
                  <p className="sm:text-2xl font-bold sm:mb-4 text-blue-800">
                    Bio
                  </p>
                  <input
                    placeholder=""
                    className="border w-50 sm:w-85 bg-gray-200"
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  ></input>
                  <br />
                  <button className="m-2 bg-blue-700 text-white sm:px-2 sm:py-1 cursor-pointer rounded px-1">
                    Submit
                  </button>
                  <button
                    onClick={() => setFlag(false)}
                    className="text-white cursor-pointer sm:px-2 sm:py-1  rounded px-1 bg-red-600"
                  >
                    Cancel
                  </button>
                </form>
              </div>,
              document.getElementById("modal"),
            )}
        </div>
      )}
      {showProfile &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-[#ffffffce]">
            <div className="absolute sm:left-140 left-20 top-50 sm:top-50 ">
              <img
                src={`${userInfo.profile}`}
                className="sm:left-20 shadow-2xl rounded-full h-40 w-40 sm:h-100 sm:w-100"
                onClick={() => setShowProfile(false)}
              />
            </div>
          </div>,
          document.getElementById("modal"),
        )}
      {loading && (
        <div className="fixed inset-0 bg-[#121111ba] ">
          <div className="sm:mt-80 mt-75 ml-36 inline-block sm:ml-180 ">
            <Spin size="large" tip="Loading..." style={{ color: "skyblue" }} />
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
