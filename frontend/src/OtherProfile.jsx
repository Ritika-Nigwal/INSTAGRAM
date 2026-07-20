import ExpireModal from "./Modals/ExpireModal";
import UserPosts from "./Cards/UserPosts";
import { useState, useEffect } from "react";
import { get_post } from "./Services/profile";
import { getCurrentUser } from "./Services/getUser";
import ReactDOM from "react-dom";
import {Spin} from "antd"
const OtherProfile = ({ id, closeFlag }) => {
  const [expire, setExpire] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [user_post, setUserPost] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(id);
  const fetchPost = async () => {
    if (user) {
      const data = await get_post(user.access_token, id);
      if (data === 401) {
        setExpire(true);
        setLoading(false);
      } else {
        setUserPost([...data]);
        setLoading(false)
      }
    } else {
      setExpire(true);
      setLoading(false)
    }
  };
  const fetchUser = async () => {
    const data = await getCurrentUser(id);
    setOtherUser({ ...data });
  };
  useEffect(() => {
    fetchUser();
    fetchPost();
  }, []);
  return (
    <>
      {expire ? (
        <ExpireModal />
      ) : (
        <div className="absolute inset-0 sm:inset-0 sm:left-20 mb-30 ">
          <div
            style={{
              backgroundImage:
                'url("https://th.bing.com/th/id/OIP.zqGuGQNW-UYxaPqHqa7CsQHaEo?w=263&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3")',
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="flex justify-end">
              <button
                className="sm:m-2 sm:px-4 px-2 text-xl sm:py-2 mt-2 bg-blue-700 sm:text-3xl text-white rounded-2xl"
                onClick={() => closeFlag(false)}
              >
                Close
              </button>
            </div>
            <div className="h-40 p-2 items-center ml-4 w-78 sm:w-280 mt-10 flex justify-between bg-[linear-gradient(135deg,#52c2eef0,rgb(100,320,320),rgb(200,400,200))] sm:h-70 rounded-xl sm:p-10 ">
              <div className="">
                <img
                  className="h-20 w-20 mt-1 sm:w-30  cursor-pointer sm:h-30  text-[#52c2eef0] rounded-full border-2 border-amber-50"
                  src={`${otherUser.profile}`}
                  onClick={() => setFlag(true)}
                />
                <p className="ml-2 mt-2 text-l sm:text-2xl sm:my-4  font-serif">
                  {otherUser.username}
                </p>
                <p className="ml-2">{otherUser.bio}</p>
              </div>
            </div>
            <div className="ml-10 sm:my-10 mt-2 sm:text-3xl font-medium font-[cursive] underline">
              All Posts
            </div>
            <div className=" ml-4 flex flex-wrap justify-start">
              {user_post.map((user) => (
                <UserPosts
                  key={user.id}
                  isYou={false}
                  post={`${user.image_url}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {flag &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-[#ffffffce]">
            <div className="absolute sm:left-140 left-20 top-50 sm:top-50 ">
              <img
                src={`${otherUser.profile}`}
                className="sm:left-20 shadow-2xl h-40 w-40  rounded-full sm:h-100 sm:w-100"
                onClick={() => setFlag(false)}
                style={{ boxShadow: "10px 20px 2px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>,
          document.getElementById("modal"),
        )}
         {loading && (
        <div className="fixed inset-0 bg-[#121111ba] ">
          <div className="sm:mt-80 mt-75 ml-36 inline-block sm:ml-180 ">
            <Spin size="large" tip="Loading..." style={{color:"skyblue"}} />
          </div>
        </div>
      )}
    </>
  );
};
export default OtherProfile;
