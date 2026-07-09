import {useState} from "react"
const Toast = (props) => {
    const [flag,setFlag]=useState(true);
    setTimeout(()=>setFlag(false),3000)
  return(<div className="absolute top-0 left-40">
    {flag &&<h1> {props.message}</h1>}
  </div>)
};
export default Toast;