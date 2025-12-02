import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level4 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  // const [countdown, setCountdown] = useState(1000);
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0); // Track the current index in the deck
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [level3Selection, setLevel3Selection] = useState(null);
  const [heading, setHeading] = useState("");
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel4 = (level) => {
    // Mark level 4 as completed
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);

    console.log(array);
    localStorage.setItem("level4Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    // Navigate to level 6
    navigate(level, { state: { prev: location.state?.prev + '-4' || "1-2-3-4" } });
  };
  useEffect(() => {
    // Save the current level path to localStorage
    localStorage.setItem("currentLevel", location.pathname);

    // Retrieve current level from localStorage on reload
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel); // Navigate to the saved level if it's different
    }
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "AVS" },
    { id: 2, text: "10 vials in 1 hour" },
    { id: 3, text: "5 vials in 30 minutes" },
    { id: 4, text: "15 vials in 1 hour" },
    { id: 5, text: "1 vial in 30 minutes" },
    { id: 6, text: "Transfer the patient immediately" },
    { id: 7, text: "Measure AVS according to body weight" },
    { id: 8, text: "AVS slow IV over 24 hours" },
  ];

  // Correct sequence of cards
  const correctSequence = [
    { id: 1, text: "AVS" },
    { id: 2, text: "10 vials in 1 hour" },
  ];

  // Set initial deck without shuffling (no shuffle applied)
  useEffect(() => {
    setDeck(initialDeck); // Set the deck to the defined order
  }, []);

  // Function to select a card from the deck
  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card); // Set the selected card in the respective box

    // Remove selected card from deck and show the next card
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0); // Show the first card from the remaining deck
    } else {
      setDeckIndex(null); // No more cards left in the deck
    }
  };

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2]);

  useEffect(() => {
    // Retrieve the selection from Level 2 from localStorage
    const level3Result = JSON.parse(localStorage.getItem("level3Result")) || [];
    if (level3Result) {
      setLevel3Selection(level3Result);
    }
  }, []);

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

  // Shuffle function
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Shuffle and set the deck every time Level 4 is loaded
    const shuffledDeck = shuffle([...initialDeck]);
    setDeck(shuffledDeck);
  }, [location]);

  useEffect(() => {
    // Retrieve the selection from Level 3 from localStorage
    const level3Result = JSON.parse(localStorage.getItem("level3Result")) || [];

    // Determine the heading based on the code selection
    if (level3Result.some((code) => code === "h")) {
      setHeading("Options available for management, Select from below options (Haemotoxic envenomation selected)");
    } else if (level3Result.some((code) => code === "n")) {
      setHeading("Options available for management, Select from below options (Neurotoxic envenomation selected)");
    } else {
      setHeading("Options available for management");
    }
  }, []);

  const res = () => {
    // Create an array of selected cards
    const selectedCards = [selectedCards1.text, selectedCards2.text];

    // Create an array of correct cards
    const correctCards = correctSequence.map((card) => card.text);

    // Check if all selected cards exist in the correct sequence (regardless of order)
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level4Result", JSON.stringify(selectedCards));
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

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel4();
  };

  const resetGame = () => {
    // setCountdown(1000);
    // Reset the selected cards
    setSelectedCards1({});
    setSelectedCards2({});
    setDeckIndex(0); // Restart from the first card in the deck
    // Reset the deck to initial deck
    setDeck(initialDeck);
  };

  const codeSelection = () => {
    const level3Result = JSON.parse(localStorage.getItem("level3Result")) || [];
    for (let i = 0; i < level3Result.length; i++) {
      if (level3Result[i] === "X") {
        return false;
      }
    }
    return true;
  };

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative h-screen w-full overflow-auto"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
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
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mt-10"> {/* Added mt-10 to push header down */}
          {heading} {/* Render the heading dynamically */}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-36 h-32 border-blue-500 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center"
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
          <h2 className="text-center text-slate-50 text-2xl font-bold">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {[selectedCards1, selectedCards2].map((card, idx) => (
            <div
              key={idx}
              className="border-2 border-blue-400 w-48 h-24 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            >
              <p className="text-md text-center">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Your choices are correct
            </h2>
            {codeSelection && ( // Check if codeSelection is valid
              <button
                onClick={() => handleCompleteLevel4("/level6")} // Ensure this function navigates correctly
                className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
              >
                Go to next step
              </button>
            )}
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

export default Level4;
