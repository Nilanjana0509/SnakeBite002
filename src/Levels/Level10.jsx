import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level10 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]); // Deck of cards
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  // const [countdown, setCountdown] = useState(1000);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel10 = () => {
    // Mark level 10 as completed
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
      level11: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);

    console.log(array);
    localStorage.setItem("level10Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    // Navigate to level 11
    // navigate("/level11");
  };
  useEffect(() => {
    // Save the current level path to localStorage
    localStorage.setItem('currentLevel', location.pathname);

    // Retrieve current level from localStorage on reload
    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel); // Navigate to the saved level if it's different
    }
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "AN maintenance dose" },
    { id: 2, text: "Wait for another 30 min for improvement" },
    { id: 3, text: "AN loading dose" },
    { id: 4, text: "Wait for 1 hour" },
    { id: 5, text: "Transfer to referral hospital" },
    { id: 6, text: "Ventilator Support" },
  ];

  // Correct sequence of cards
  const correctSequence = [
    { id: 2, text: "Wait for another 30 min for improvement" },
    { id: 1, text: "AN maintenance dose" },
  ];

  // Function to shuffle an array
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Set the shuffled deck when the component mounts
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

  // Function to select a card from the deck
  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    if (!selectedCards1.text) {
      boxSetter(card); // Set the selected card in the respective box
    } else if (!selectedCards2.text) {
      boxSetter(card); // Set the selected card in the respective box
    } else {
      console.log("Both selections are filled.");
    }

    // Remove selected card from deck and show the next card
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0); // Show the first card from the remaining deck
    } else {
      setDeckIndex(null); // No more cards left in the deck
    }
  };

  // Function to move to the next card in the deck
  const showNextCard = () => {
    if (deckIndex === null) {
      setDeckIndex(0); // Show the first card on the first click
    } else if (deckIndex < deck.length - 1) {
      setDeckIndex(deckIndex + 1); // Show the next card
    } else {
      setDeckIndex(0); // Reset to the first card when the deck ends
    }
  };

  const res = () => {
    // Create an array of selected cards
    const selectedCards = [selectedCards1.text, selectedCards2.text];

    // Create an array of correct cards
    const correctCards = correctSequence.map((card) => card.text);

    // Check if all selected cards exist in the correct sequence (regardless of order)
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    ) && selectedCards.length === correctCards.length;

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level10Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true); // Show wrong popup
    }
  };

  const handleBoxClick = () => {
    if (selectedCards1 && selectedCards2) {
      const userSequence = [selectedCards1, selectedCards2];
      const correctSequenceIds = correctSequence.map((card) => card.id);
      const userSequenceIds = userSequence.map((card) => card.id);
      if (userSequenceIds.join(",") === correctSequenceIds.join(",")) {
        setShowSuccessPopup(true); // Show success popup
      } else {
        setShowWrongPopup(true); // Show wrong popup
      }
    }
  };

  const handleSuccessClose = (nextLevel) => {
    setShowSuccessPopup(false);
    const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
    completedLevels.level10 = true; // Mark Level 10 as completed
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);

    // Navigate to the next level
    navigate(nextLevel);
  };

  const resetGame = () => {
    // setCountdown(1000);
    // Reset the selected cards
    setSelectedCards1({});
    setSelectedCards2({});
    setDeck(initialDeck); // Reset to the first card in the deck
    setDeckIndex(0); // Reset the index to start from the first card
  };

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Star count on the top-left corner */}
      <div className="absolute top-10 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>
      {/* Icons on the top-right corner */}
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
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mt-10"> {/* Added mt-10 to push header down */}
        Not improving after 30 min:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
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
            <p className="text-xs break-words text-center">{card.text}</p> {/* Reduced font size to text-xs and used break-words */}
          </div>
        ))}
      </div>

      {/* Selected Boxes */}
      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-slate-50 text-center text-lg font-bold">
            Select Correct option
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          <div
            className="border-2 border-blue-400 w-48 h-24 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
          >
            <p className="text-md text-center">{selectedCards1.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-48 h-24 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
          >
            <p className="text-md text-center">{selectedCards2.text}</p>
          </div>
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Your choices are correct
            </h2>
            <button
              className="bg-amber-950 text-white px-4 py-2 rounded-md "
              onClick={() => handleSuccessClose("/level11")}
            >
              Proceed to Next Level
            </button>
          </div>
        </div>
      )}

      {/* Wrong Popup for Incorrect Sequence */}
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

export default Level10;
