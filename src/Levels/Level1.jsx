import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/snake11.png";

const Level1 = ({ setCompletedLevels }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Show logo image for 30 seconds, then show rules
    const timer = setTimeout(() => {
      console.log("Image finished showing, now showing rules.");
      setShowImage(false);
      setShowRules(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const startGame = () => {
    console.log("Game started.");
    setShowRules(false);
    setGameStarted(true);
  };

  return (
    <div
      className="relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Initial Image Screen */}
      {showImage && (
        <img
          src="/whatsapp.jpeg"
          alt="Intro Logo"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
            width: "50%",
            maxWidth: "600px",
          }}
          onError={() => console.log("Image failed to load")}
        />
      )}

      {/* Rules Screen */}
      {showRules && !gameStarted && (
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-2xl border">
            <h2 className="text-2xl font-bold mb-4">Rules of the Snake Bite Game</h2>
            <p className="mb-2">A patient of snake bite needs your urgent help.</p>
            <p className="mb-2">
              As the game progresses, you will come across different situations which you need to handle correctly by selecting appropriate ones from given options.
            </p>
            <p className="mb-2">
              There are possibilities like no envenomations, haemotoxic envenomation or neurotoxic envenomation.
            </p>
            <p className="mb-2">
              In case of them, these are different clinical scenarios leading to different management paths.
            </p>
            <p className="mb-4">
              By completing each path successfully, you will get a star. <br />
              <strong>Collect 8 stars to complete the game.</strong>
            </p>
            <button
              onClick={startGame}
              className="bg-[#432818] hover:bg-[#614034] text-white font-bold py-2 px-4 rounded"
            >
              Start Playing
            </button>
          </div>
        </div>
      )}

      {/* Game UI Placeholder (can be replaced with actual game later) */}
      {gameStarted && (
        <div className="text-white text-center pt-20 text-xl font-semibold">
          Game is now starting... (You can now add your game logic/UI here)
        </div>
      )}
    </div>
  );
};

export default Level1;
