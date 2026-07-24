import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import ExpImage from "../assets/ExpireImage.gif";
const ExpireModal = () => {
  const navigate = useNavigate();
  const login = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className="  z-30 text-center  align-middle absolute top-0 bottom-0 right-0 left-0 bg-[#3d3b3bcc]">
          <div className="sm:left-[38%] sm:top-[40%] sm:h-50 sm:w-80 fixed top-[30%]  h-40 border-3 border-gray-800  w-55 rounded-2xl bg-gray-50 left-[20%]">
            <p className=" sm:text-2xl font-bold text-xl text-blue-700">
              Session Expired
            </p>
            <img
              className="sm:my-4 sm:ml-25 sm:h-20 sm:w-25 h-16 w-20 ml-16 mb-4 "
              src={ExpImage}
            />

            <button
              className=" sm:text-xl bg-blue-600  px-4 py-1 border-2 border-amber-400 rounded-xl text-white "
              onClick={login}
            >
              Login Again
            </button>
          </div>
        </div>,
        document.getElementById("modal"),
      )}
    </>
  );
};
export default ExpireModal;
