import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level16 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null);
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel16 = () => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level6: true,
      level7: true,
      level10: true,
      level14: true,
      level16: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);
    console.log(array);
    localStorage.setItem("level16Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    const currentPath = "1-2-3-4-6-7-10-14-16";
    const prevPath = JSON.parse(localStorage.getItem("path")) || {};
    prevPath[currentPath] = true;
    localStorage.setItem("path", JSON.stringify(prevPath));

    navigate("/result16");
  };

  useEffect(() => {
    localStorage.setItem("currentLevel", location.pathname);
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
    const pathData = JSON.parse(localStorage.getItem("path")) || {};
    const completedPaths = Object.values(pathData).filter(value => value === true).length;
    setStarCount(completedPaths);
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "AN loading dose" },
    { id: 2, text: "Artificial ventilation SOS" },
    { id: 3, text: "Transfer to referral hospital" },
    { id: 4, text: "10 vials AVS" },
    { id: 5, text: "Inj. Hydrocortisone" },
    { id: 6, text: "AN maintenance dose" },
    { id: 7, text: "Wait for 30 mins" },
    { id: 8, text: "Wait for 1 hour" },
  ];

  const correctSequence = [
    { id: 2, text: "Artificial ventilation SOS" },
    { id: 3, text: "Transfer to referral hospital" },
  ];

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const shuffledDeck = shuffle(initialDeck);
    setDeck(shuffledDeck);
  }, []);

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2]);

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card);

    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0);
    } else {
      setDeckIndex(null);
    }
  };

  const res = () => {
    const selectedCards = [selectedCards1.text, selectedCards2.text];
    const correctCards = correctSequence.map((card) => card.text);
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level16Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel16();
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setDeck(shuffle(initialDeck));
    setDeckIndex(0);
  };

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-10 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>
      <div className="absolute top-10 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mt-10">
          Not improving after 1 hour:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-36 h-32 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200"
            onClick={() => {
              if (!selectedCards1.text) {
                selectCard(card, setSelectedCards1);
              } else if (!selectedCards2.text) {
                selectCard(card, setSelectedCards2);
              } else {
                console.log("Both selections are filled.");
              }
            }}
          >
            <p className="text-xs break-words text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-slate-50 text-center text-2xl font-bold">
            Select Correct option
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {[selectedCards1, selectedCards2].map((card, idx) => (
            <div
              key={idx}
              className="border-2 border-blue-400 w-48 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            >
              <p className="text-md text-center">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {showSuccessPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center z-50">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Your choices are correct
            </h2>
            <h2 className="text-xl mb-4">
              To start the game again click on the button below
            </h2>
            <button
              className="bg-amber-950 text-white px-4 py-2 rounded-md "
              onClick={handleSuccessClose}
            >
              Submit & Start Over
            </button>
          </div>
        </div>
      )}

      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Your choices are incorrect
            </h2>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShowWrongPopup(false);
                resetGame();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level16;
