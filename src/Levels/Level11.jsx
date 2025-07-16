import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level11 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null);
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel11 = () => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      level6: true,
      level7: true,
      level8: true,
      level9: true,
      level10: true,
      level11: true,
      level12: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);
    array.push(selectedCards3.text);

    console.log(array);
    localStorage.setItem("level11Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    navigate("/level12");
  };
  useEffect(() => {
    localStorage.setItem('currentLevel', location.pathname);
    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "20 WBCT" },
    { id: 2, text: "Every hour" },
    { id: 3, text: "Till next 4 hours" },
    { id: 4, text: "10 WBCT" },
    { id: 5, text: "INR" },
    { id: 6, text: "Every 4 hours" },
    { id: 7, text: "Till next 24 hours" },
  ];

  const correctSequence = [
    { id: 1, text: "20 WBCT" },
    { id: 2, text: "Every hour" },
    { id: 3, text: "Till next 4 hours" },
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
      selectedCards2.text !== undefined &&
      selectedCards3.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3]);

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    if (!selectedCards1.text) {
      setSelectedCards1(card);
    } else if (!selectedCards2.text) {
      setSelectedCards2(card);
    } else if (!selectedCards3.text) {
      setSelectedCards3(card);
    } else {
      console.log("All selections are filled.");
      return;
    }

    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0);
    } else {
      setDeckIndex(null);
    }
  };

  const res = () => {
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
    ];

    const correctCards = correctSequence.map((card) => card.text);

    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level11Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel11();
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setDeck(initialDeck);
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
          Options available when initial WBCT comes clotted
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
  {deck.map((card) => (
    <div
      key={card.id}
      className="border w-48 h-32 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200"
      onClick={() => selectCard(card)}
    >
      <p className="text-xs break-words text-center">{card.text}</p>
    </div>
  ))}
</div>

      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-slate-50 text-center text-2xl font-bold">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {[selectedCards1, selectedCards2, selectedCards3].map((card, idx) => (
            <div
              key={idx}
              className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            >
              <p className="text-md text-center">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Your options are correct
            </h2>
            <button
              onClick={() => {
                handleCompleteLevel11();
                navigate("/level12");
              }}
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
            >
              Situation: Not clotted in any occasion
            </button>

            <button
              onClick={() => {
                handleCompleteLevel11();
                navigate("/level15");
              }}
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
            >
              Situation: Clotted in all occasions
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

export default Level11;
