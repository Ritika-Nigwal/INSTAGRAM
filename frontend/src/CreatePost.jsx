import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { uploadFile } from "./Services/uploadImage.js";
import { createPost } from "./Services/createPost.js";
import { get_post } from "./Services/profile.js";
import { CameraOutlined } from "@ant-design/icons";
const CreatePost = (props) => {
  const [caption, setCaption] = useState();
  const [flag, setFlag] = useState(false);
  const [image, setImage] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const create = async (e) => {
    if (user) {
      e.preventDefault();
      const url = await uploadFile(image, user.access_token);
      if (!image) {
        alert("image is required....");
        return;
      }
      const successMessage = await createPost(
        url.filename,
        caption,
        user.access_token,
      );
      setFlag(false);
      get_post(user.user_id);
      props.refresh();
      setCaption("");
    }
  };
  return (
    <div className="">
      <button
        className="text-4xl text-black bg-white m-2  px-4 "
        onClick={() => setFlag(true)}
      >
        <CameraOutlined />
      </button>
      {flag &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-[rgba(39,38,38,0.87)]">
            <form
              onSubmit={create}
              className="absolute z-50 sm:left-[35%] border-t-10 border-t-blue-400 sm:w-100 sm:border-t-20 sm:border-t-blue-400 top-[30%] w-65 left-[12%] p-4 rounded-xl bg-white  "
            >
              <p className="sm:text-2xl sm:mb-4 font-bold text-blue-800">
                Upload File
              </p>
              <input
                placeholder=" "
                className=" border w-50 sm:w-85 sm:mb-4 bg-gray-200"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
              ></input>
              <p className="sm:text-2xl font-bold sm:mb-4 text-blue-800">
                Caption
              </p>
              <input
                placeholder=""
                className="border w-50 sm:w-85 bg-gray-200"
                type="text"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              ></input>
              <br />
              <button className="m-2 text-blue-200 sm:text-2xl bg-blue-800 cursor-pointer rounded px-1">
                Submit
              </button>
              <button
                onClick={() => setFlag(false)}
                className="text-white cursor-pointer sm:text-2xl rounded px-1 bg-[#f60101a4]"
              >
                Cancel
              </button>
            </form>
          </div>,
          document.getElementById("modal"),
        )}
    </div>
  );
};
export default CreatePost;
