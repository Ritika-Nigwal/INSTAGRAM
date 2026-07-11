import Posts from "./Cards/Posts.jsx";
import { useEffect, useState } from "react";
import { getPost } from "./Services/getPosts.js";
import { useOutletContext } from "react-router-dom";
import ExpireModal from "./Modals/ExpireModal.jsx";
import OtherProfile from "./OtherProfile.jsx";
import {Spin} from "antd"
const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { refreshKey, refreshPost } = useOutletContext();
  const [sessionExpire, setSessionExpire] = useState(false);
  const [flag,setFlag]=useState(false);
  const [Id,setId]=useState(null)
  const [loading,setLoading]=useState(false)
  const onClose=(f)=>{
    setFlag(f)
  }
  const selectId=(id)=>{
    setId(id)
  }
  async function fetchPost() {
    if (user) {
      setLoading(false)
      const getPosts = await getPost(user.access_token);
      if(getPosts){
        setLoading(false)
      }
      if (getPosts === 401) {
        console.log("hello byy");
        setSessionExpire(true);
        setLoading(false)
      }
      setPosts(getPosts);
    } else {
      setSessionExpire(true);
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPost();
  }, [refreshKey]);
  const urltype = (type, url) => {
    if (type === "relative") {
      return `${import.meta.env.VITE_API_URL}/${url}`;
    }
    return url;
  };

  return (
    <>
      <div
        className="flex mr-0"
        style={{
          backgroundImage:
            'url("https://th.bing.com/th/id/OIP.zqGuGQNW-UYxaPqHqa7CsQHaEo?w=263&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {sessionExpire ? (
          <ExpireModal />
        ) : (
          <span className="ml-0 mt-10 ">
            {(!flag || loading)?posts.map((user) => (
              <Posts
                key={user.id}
                name={user.user.username}
                post={urltype(user.image_url_type, user.image_url)}
                profile={
                  user.user.profile === ""
                    ? "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?w=192&h=192&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3"
                    : `${import.meta.env.VITE_API_URL}/${user.user.profile}`
                }
                comments={user.comments}
                refresh={fetchPost}
                onClose={onClose}
                setId={selectId}
                id={user.id}
                user_id={user.user.id}
              />
            )):<OtherProfile id={Id} closeFlag={onClose}/>}
          </span>
        )}
        
      </div>
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
export default Home;
