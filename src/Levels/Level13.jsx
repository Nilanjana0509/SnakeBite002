import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level13 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deck, setDeck] = useState([]); // Deck of cards
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards, setSelectedCards] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel13 = () => {
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
      level12: true,
      level13: true,
      level14: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

    const array = [];
    array.push(selectedCards.text);
    console.log(array);
    localStorage.setItem("level13Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    const isPathB =
      localStorage.getItem("level10Result") &&
      localStorage.getItem("level14Result");

    if (isPathB) {
      navigate("/result13", { state: { isPathB: true } });
    } else {
      navigate("/result13", { state: { isPathB: false } });
    }
    const path = location.state.prev + '-' + 13;
    const storedData = JSON.parse(localStorage.getItem("path")) || {};
    if (storedData[path] == false) {
      storedData[path] = true;
      localStorage.setItem("path", JSON.stringify(storedData));
    }
  };
  useEffect(() => {
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 13!");
      navigate("/level1");
    }
    const path = location.state.prev + '-' + 13;
    const storedData = JSON.parse(localStorage.getItem("path")) || {};
    if (storedData[path]) {
      alert("You have completed this path");
      navigate("/level1");
    }
    localStorage.setItem("currentLevel", location.pathname);

    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
  }, [location, navigate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, []);

  const initialDeck = [
    { id: 1, text: "Discharge only when no neuro-deficit present" },
    { id: 2, text: "Discharge after 6 hours" },
    { id: 3, text: "Discharge after 24 hours irrespective of improvement" },
    { id: 4, text: "Transfer to referral hospital" },
  ];

  const correctSequence = [
    { id: 1, text: "Discharge only when no neuro-deficit present" },
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
    if (selectedCards.text !== undefined) {
      res();
    }
  }, [selectedCards]);

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

  const showNextCard = () => {
    if (deckIndex === null) {
      setDeckIndex(0);
    } else if (deckIndex < deck.length - 1) {
      setDeckIndex(deckIndex + 1);
    } else {
      setDeckIndex(0);
    }
  };

  const res = () => {
    const selectCard = [selectedCards.text];

    const correctCards = correctSequence.map((card) => card.text);

    const isCorrect = selectCard.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level13Result", JSON.stringify(selectCard));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel13();
  };

  const resetGame = () => {
    setSelectedCards({});
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
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full my-6">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 mb-6">
          Options available when there is persistent improvement seen after 1 hour:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-40 h-24 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200"
            onClick={() => selectCard(card, setSelectedCards)}
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-slate-50 text-center text-2xl font-bold mt-14">
          Select the Correct Option
        </h2>
      </div>
      <div className="mt-8 w-40 h-24 border-2 border-blue-500 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700">
        <p className="text-md text-center">{selectedCards.text}</p>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">Your choices are correct</h2>
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
            <h2 className="text-2xl font-bold text-red-400 mb-4">Your choices are incorrect</h2>
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

export default Level13;
