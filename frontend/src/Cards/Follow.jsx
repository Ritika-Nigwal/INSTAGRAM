import { useState } from "react";
import { ReactDOM } from "react-dom";
const Follow = (props) => {
  const [empty,setEmpty]=useState(false)
  if (props.data==[]){
    setEmpty(true)
  }
  return (
    <div onClick={()=>props.close(false)} className="bg-[white] py-4 px-2 rounded w-60 h-60 overflow-auto border-4 border-y-blue-400 border-x-pink-200 sm:h-100 sm:w-120">
      <p className="mb-4 font-semibold text-2xl text-gray-800 underline" onClick={()=>props.close(false)}>Close</p>
      {!empty ? props.data.map((follower) => (
        <div
          key={follower.id}
          className="flex p-1 z-10  m-1  gap-4 sm:gap-10 items-center bg-[linear-gradient(45deg,#df84c2,white,#84afdf)]"
        >
          <img
            className="h-10 w-10 rounded-full bg-[#84afdf]"
            src={
              follower.profile == ""
                ? "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?w=192&h=192&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3"
                : follower.profile
            }
          />
          <div>
            <p className="text-[14px]">{follower.username}</p>
            <p className="text-[10px] whitespace-nowrap hidden sm:block">{follower.bio}</p>
          </div>
        </div>
      )):<p>not found</p>}
    </div>
  );
};
export default Follow;
