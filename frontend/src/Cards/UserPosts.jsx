import { useState } from "react";
import Image3 from "../assets/delete.png";
import { deletePost } from "../Services/deletePost";
import DeleteModal from "../Modals/DeleteModal";
const UserPosts = (props) => {
  const [style, setStyle] = useState("");
  const [bgStyle, setBgStyle] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading,setLoading]=useState(false)
  const deletePostHandler = () => {
    setLoading(true)
    setConfirm(false)
    const response=deletePost(props.id);
    if (response){
      setLoading(false)
    }
  };
  const size = () => {
    setStyle(
      " sm:h-160 h-120 mt-14 ml-10  w-70 sm:w-200 sm:ml-[20%] sm:mt-[5%]",
    );
    setBgStyle(
      "fixed inset-0  sm:top-0 sm:left-0 sm:h-[100%] sm:w-[100%] bg-[#c2bebeb9] ",
    );
    setFlag(!flag);
    console.log(flag);
  };
  return (
    <div className={flag ? `${bgStyle}` : ""}>
      {props.isYou && (
        <div className="relative">
          <img src={Image3} className="sm:h-10 absolute h-8 m-1" onClick={()=>setConfirm(true)}></img>
        </div>
      )}
      <img
        src={props.post}
        className={
          flag
            ? ` p-1 center bg-blue-100 ${style}`
            : " h-120 w-75 my-2 sm:h-120 sm:w-85 p-1 sm:my-0  bg-blue-100"
        }
        onClick={size}
      />
      {
        confirm && <DeleteModal isOpen={true} onClose={()=>{setConfirm(false);setLoading(false)}} onConfirm={deletePostHandler}/>
      }
    </div>
  );
};
export default UserPosts;
