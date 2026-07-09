import OIP from "../assets/OIP.png";
import { useState, useEffect } from "react";
import Image3 from "../assets/delete.png";
import Insta from "../assets/Insta.webp";
import { deleteComment } from "../Services/deleteComment";
import OtherProfile from "../OtherProfile";
import ReactDOM from "react-dom"
const Posts = (props) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(props.comments || []);
  const [flag,setFlag]=useState(false)
  // styling="sm:h-16 h-14 w-14  sm:w-16  rounded-full my-1"
  const fetchRefresh = () => {
    setCommentList(props.comments);
  };
  useEffect(() => {
    fetchRefresh();
  }, [props.comments]);
  console.log(props.id);
  const createComment = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const postComment = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment, post_id: props.id }),
      },
    );
    const data = await postComment.json();
    setCommentList((prev) => [...prev, data]);
    setComment("");
  };
  return (
    <>

      <span className="flex flex-col  ml-2 sm:m-20 sm:my-10 sm:justify-evenly">
        <span className="flex h-20 gap-4 sm:gap-10 w-65 bg-[#f7f6f6] border-t-4 border-t-gray-300  sm:w-130">
          <img
            src={props.profile}
            className="sm:h-16 h-14 w-14 cursor-pointer  sm:w-16  rounded-full my-1"
            onClick={()=>setFlag(true)}
          />
          <h1 className="pt-5 cursor-pointer text-[14px] text-indigo-800 sm:text-2xl whitespace-nowrap "  onClick={()=>{props.onClose(true);
              props.setId(props.user_id)
            }
            }>
            user : {props.name} ..........
          </h1>
          <img src={Insta} className=" hidden w-10 h-10 mt-2 sm:mt-4  sm:block md:block " />
        </span>
        <img
          src={props.post}
          className="h-80 w-65 sm:h-150 sm:w-130 sm:p-1 bg-blue-100 "
        />
        <p className="sm:text-2xl font-serif text-purple-950">Comments</p>
        <div className="bg-gray-300 h-15 my-1 rounded-xl sm:h-25 sm:rounded-3xl flex flex-col gap-2 overflow-auto align-middle">
          {commentList.map((comment) => (
            <div key={comment.id}>
              <p className="text-cyan-900 flex justify-between sm:p-2 px-1  my-1 mx-2 rounded-b-2xl bg-green-400">
                {comment.text}
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  <img src={Image3} className="h-6 m-1"></img>
                </button>
              </p>
            </div>
          ))}
        </div>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="add comment..."
          className="my-1 outline-none p-2 sm:rounded-2xl rounded-xl bg-gray-100"
        />
        <button
          onClick={createComment}
          className="bg-green-400 w-16 mb-16 text-center sm:py-1 sm:px-3 rounded"
        >
          send
        </button>
      </span>
      {flag && ReactDOM.createPortal(<div className="fixed inset-0 bg-[#ffffffce]">
        <div className="absolute sm:left-140 left-20 top-50 sm:top-50 ">
          <img src={props.profile} className="sm:left-20 h-40 w-40 shadow-2xl rounded-full sm:h-100 sm:w-100" onClick={()=>setFlag(false)}/>
        </div>
      </div>,document.getElementById("modal"))}
    </>
  );
};
export default Posts;
