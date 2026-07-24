import OIP from "../assets/OIP.png";
import { useState, useEffect } from "react";
import Image3 from "../assets/delete.png";
import Insta from "../assets/Insta.webp";
import { deleteComment } from "../Services/deleteComment";
import OtherProfile from "../OtherProfile";
import ReactDOM from "react-dom";
import { getPost } from "../Services/getPosts";
import { Spin } from "antd";
import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import DeleteModal from "../Modals/DeleteModal";
import { LikePost, postLike, getLike } from "../Services/like.js";
import { followUser } from "../Services/followers.js";
import { message } from "antd";
const Posts = (props) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(props.comments || []);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [likeState, setLike] = useState(true);
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [showComment, setShowComment] = useState(false);
  const follow = async () => {
    setLoading(true);
    const response = await followUser(user.user_id, props.id);
    if (response) {
      setLoading(false);
    }
    const detail = await response.json();
    console.log(detail);
    if (detail.detail == 403) {
      message.error(`you already followed ${props.name}`, 4);
    } else {
      message.success(`you followed ${props.name}`, 4);
    }
  };
  const fetchRefresh = () => {
    setCommentList(props.comments);
  };
  useEffect(() => {
    fetchRefresh();
  }, [props.comments, props.likes]);
  const doLike = async () => {
    setLike((prev) => !prev);
    if (!likeState) {
      setTotalLikes((prev) => prev + 1);
      const postlike = await LikePost(totalLikes + 1, props.id);
      const addlike = await postLike(props.id, !likeState);
    } else {
      setTotalLikes((prev) => prev - 1);
      const postlike = await LikePost(totalLikes - 1, props.id);
      const addlike = await postLike(props.id, !likeState);
    }
  };

  useEffect(() => {
    const call = async () => {
      const response = await getLike(props.id);
      setLike(response.liked);
    };
    call();
  }, []);
  const onConfirm = async () => {
    setLoading(true);
    setShowDeleteModal(false);
    if (!commentToDelete) return;
    const data = await deleteComment(commentToDelete);
    if (data) {
      setLoading(false);
    }
    setCommentList((prev) => prev.filter((c) => c.id !== commentToDelete));
    setCommentToDelete(null);
    try {
      getPost(user.access_token);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  const onCloseDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };
  const createComment = async (e) => {
    setLoading(true);
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
    setLoading(false);
    const data = await postComment.json();
    setCommentList((prev) => [...prev, data]);
    setComment("");
  };
  return (
    <>
      <span className="flex flex-col  sm:m-20 sm:my-10 sm:justify-evenly">
        <div className="relative">
          <span className="absolute justify-around sm:border-x-2 sm:border-x-white bg-[#5e5c5c52] w-full flex text-white  sm:w-120">
            <img
              src={props.profile}
              className="sm:h-16 h-16 w-16 z-10 border-2 border-white cursor-pointer  sm:w-16  rounded-full my-1"
              onClick={() => setFlag(true)}
            />

            <h1
              className="pt-5 cursor-pointer font-semibold shadow-2xl font-serif text-[14px] text-white sm:text-xl whitespace-nowrap "
              onClick={() => {
                props.onClose(true);

                props.setId(props.user_id);
              }}
            >
              User : {props.name}
            </h1>
            <button
              onClick={follow}
              className=" h-8 mt-4 px-1 bg-[#ffffff79] hover:bg-amber-400 text-black border-2 border-white font-medium rounded "
            >
              +Follow
            </button>
          </span>
          <img
            src={props.post}
            className="h-130 w-full cursor-pointer sm:h-170 sm:w-120 sm:p-1 bg-blue-100 "
          />
        </div>
          <em className="font-sans font-bold w-full  bg-white">  {props.caption}</em>
        <div className="flex pt-2 mb-4 bg-[#ffffffe0] sm:bg-white sm:rounded-b-2xl sm:mb-2">
   
          <span onClick={doLike}>
            {!likeState ? (
              <HeartOutlined
                style={{ fontSize: "30px", height: "40px" }}
                className="hover:animate-bounce "
              />
            ) : (
              <HeartFilled
                style={{ color: "red", fontSize: "30px", height: "40px" }}
                className="hover:animate-bounce"
              />
            )}
            <p className=" ">{totalLikes} Likes💗</p>
          </span>
          <span onClick={() => setShowComment(!showComment)} className="mt-1 ml-8">
            <MessageOutlined className="text-2xl " />
            <p className="ml-2">{commentList.length}</p>
          </span>
         
        </div>
        
        {showComment && (
          <div>
            {" "}
            <p className="sm:text-2xl font-serif text-purple-950">Comments</p>
            <div className="bg-[#4a484832] h-25 my-2 p-2 rounded-xl sm:h-30 sm:rounded-3xl flex flex-col gap-2 overflow-auto align-middle">
              {commentList.map((comment) => (
                <div key={comment.id}>
                  <p className=" flex justify-between sm:p-1 border-b-2 px-1  my-1 mx-2 rounded-b-2xl bg-white">
                    {comment.text}
                    <button
                      onClick={() => {
                        setCommentToDelete(comment.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <img
                        src={Image3}
                        className="h-6 m-1 cursor-pointer"
                      ></img>
                    </button>
                  </p>
                </div>
              ))}
            </div>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="add comment..."
              className="my-1 outline-none w-full p-2 sm:rounded-2xl rounded-xl bg-gray-100"
            />
            <button
              onClick={createComment}
              className="bg-green-400 cursor-pointer w-16 mb-16 text-center sm:py-1 sm:px-3 rounded"
            >
              send
            </button>
          </div>
        )}

        {showDeleteModal &&
          ReactDOM.createPortal(
            <DeleteModal
              isOpen={showDeleteModal}
              onClose={onCloseDelete}
              onConfirm={onConfirm}
            />,
            document.getElementById("modal"),
          )}
      </span>
      {flag &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-[#2e3031ce]">
            <div className="absolute h-30 w-80 sm:left-150 left-20 top-50 sm:top-50 ">
              <img
                src={props.profile}
                className="sm:left-16 h-45 w-45 shadow-2xl border-2 border-white rounded-full sm:rounded-full sm:h-80 sm:w-100"
                onClick={() => setFlag(false)}
              />
            </div>
          </div>,
          document.getElementById("modal"),
        )}
      {loading && (
        <div className="fixed inset-0 bg-[#121111ba] ">
          <div className="sm:mt-80 mt-75 ml-36 inline-block sm:ml-180 ">
            <Spin
              size="large"
              description="Loading..."
              style={{ color: "skyblue" }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Posts;
