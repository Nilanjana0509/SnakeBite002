import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

function Rules() {
    const [showImage, setShowImage] = useState(true); // State to control the image visibility
    const navigate = useNavigate();

    useEffect(() => {
        // Timer to hide the image after 3 seconds
        const timer = setTimeout(() => {
            setShowImage(false);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    const handleClick = () => {
        const data = {
            "1-2-3-5": false,
            "1-2-3-4-6-11-15": false,
            "1-2-3-4-6-11-12": false,
            "1-2-3-4-6-12": false,
            "1-2-3-4-6-7-9-13": false,
            "1-2-3-4-6-7-10-13": false,
            "1-2-3-4-6-7-10-14-13": false,
            "1-2-3-4-6-7-10-14-16": false
        };
        localStorage.setItem("path", JSON.stringify(data));
        
        navigate("/level1");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {showImage ? (
                <img
                    src={logo}
                    alt="Snake Bite Game"
                    className="w-1/2 h-auto rounded"
                />
            ) : (
                <div className="flex justify-center items-center flex-col border border-amber-950 m-2 bg-amber-50/40 rounded-xl mb-10 p-4">
                    <h2 className="text-center text-4xl my-4">Rules of the Snake Bite Game</h2>
                    <div className="m-5 text-center text-xl">
                        A patient of snake bite needs your urgent help.
                        <div>As the game progresses, you will come across different situations which you need to handle correctly by selecting appropriate ones from given options.</div>
                    </div>
                    <div className="m-5 text-center text-xl">
                        <div>There are possibilities like no envenomations, haemotoxic envenomation or neurotoxic envenomation.</div>
                        <div>In case of them, these are different clinical scenarios leading to different management paths.</div>
                        <div>By completing each path successfully, you will get a star.</div>
                        <div>Collect 8 stars to complete the game.</div>
                    </div>
                    <button
                        className=" bg-amber-900 text-white hover:bg-amber-950 hover:scale-102 p-2 rounded-xl w-40 cursor-pointer transition-transform duration-200 ease-in-out"
                        onClick={handleClick}
                    >
                        Start Playing
                    </button>
                </div>
            )}
        </div>
    );
}

export default Rules;
//gg