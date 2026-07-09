import {useState} from "react"
const UserPosts = (props) => {
  const [style,setStyle]=useState("")
  const [bgStyle,setBgStyle]=useState("")
  const [flag,setFlag]=useState(false)
  const size=()=>{
    setStyle(" sm:h-160 sm:w-200 sm:ml-[20%] sm:mt-[5%]")
    setBgStyle("fixed sm:top-0 sm:left-0 sm:h-[100%] sm:w-[100%] bg-[#000000ac] ")
    setFlag(!flag)
    console.log(flag)
  }
  return (
    <div className={(flag)?`${bgStyle}`:""}>
      <img
        src={props.post}
        className={(flag)?` p-1 center bg-blue-100 ${style}`:" h-80 w-75 my-2 sm:h-120 sm:w-85 p-1 sm:my-0  bg-blue-100"}
        onClick={size}
      />
    </div>
  );
};
export default UserPosts;
