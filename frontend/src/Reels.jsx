import Reel1 from "./ReelFolder/Reel1.mp4";
import Reel2 from "./ReelFolder/Reel2.mp4";
import Reel3 from "./ReelFolder/Reel3.mp4";
import Reel4 from "./ReelFolder/Reel4.mp4";
import Reel5 from "./ReelFolder/Reel5.mp4";
import Reel6 from "./ReelFolder/Reel6.mp4";
import { Spin } from "antd";
import { useEffect, useRef,useState } from "react";

const reels = [Reel1, Reel2, Reel3, Reel4, Reel5, Reel6];

const Reels = () => {
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }, // play when 70% visible
    );

    videoRefs.current.forEach((video) => {
      setLoading(false)
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://th.bing.com/th/id/OIP.zqGuGQNW-UYxaPqHqa7CsQHaEo?w=263&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {reels.map((reel, index) => (
          <div key={index} className="">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay
              loop
              className=" sm:h-180 sm:m-2 ml-10 h-120 m-2 sm:ml-40 border-2  "
            >
              <source src={reel} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      {loading && (
        <div className="fixed inset-0 bg-[#121111ba] ">
          <div className="sm:mt-80 mt-75 ml-36 inline-block sm:ml-180 ">
            <Spin size="large" tip="Loading..." style={{ color: "skyblue" }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;
