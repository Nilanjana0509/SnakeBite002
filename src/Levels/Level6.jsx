import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level6 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deck, setDeck] = useState([]); // Track the deck of cards
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [level3Selection, setLevel3Selection] = useState("");
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel6 = (nextLevel) => {
    // Mark level 6 as completed
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      level6: true,
      level7: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);
    array.push(selectedCards3.text);

    console.log(array);
    localStorage.setItem("level6Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    // Navigate to the specified next level
    navigate(nextLevel, { state: { prev: location.state?.prev + '-' + 6 , origin: 'level6'} });
  };

  useEffect(() => {
    console.log(location.state?.prev);
    
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 6!");
      navigate("/level1"); // Redirect to home or another page
    }

    // Save the current level path to localStorage
    localStorage.setItem("currentLevel", location.pathname);

    // Retrieve current level from localStorage on reload
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel); // Navigate to the saved level if it's different
    }
  }, [location, navigate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, []);

  const initialDeck = [
    { id: 1, text: "Inj. Adrenalin" },
    { id: 2, text: "0.25 ml" },
    { id: 3, text: "IM" },
    { id: 4, text: "1 ml" },
    { id: 5, text: "IV" },
    { id: 6, text: "SC" },
    { id: 7, text: "Inj. Hydrocortisone" },
    { id: 8, text: "Inj. Promethazine" },
    { id: 9, text: "Inj. Prochlorperazine" },
  ];

  // Correct sequence of cards
  const correctSequence = [
    { id: 1, text: "Inj. Adrenalin" },
    { id: 2, text: "0.25 ml" },
    { id: 3, text: "IM" },
  ];

  // Shuffle the deck when the component mounts
  useEffect(() => {
    setDeck(shuffle(initialDeck));
  }, []);

  // Function to shuffle the deck
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined &&
      selectedCards3.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3]);

  useEffect(() => {
    // Retrieve the selected envenomation type from Level 3
    const envenomationType = localStorage.getItem("selectedEnvenomationType") || "";
    setLevel3Selection(envenomationType);
  }, []);

  // Function to select a card from the deck
  const selectCard = (card) => {
    if (!card || !card.text) return;

    // Set the selected card in the respective empty box
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

    // Remove selected card from deck
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
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
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
    ];

    // Create an array of correct cards
    const correctCards = correctSequence.map((card) => card.text);

    // Check if all selected cards exist in the correct sequence (regardless of order)
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level6Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true); // Show wrong popup
    }
  };

  const handleBoxClick = () => {
    if (selectedCards1 && selectedCards2 && selectedCards3) {
      const userSequence = [selectedCards1, selectedCards2, selectedCards3];
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
    handleCompleteLevel6(nextLevel);
  };

  const resetGame = () => {
    // Reset the selected cards
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setDeck(initialDeck); // Reset to the initial deck
  };

  const res1 = (card) => {
    console.log(card);
    setSelectedCards1({});
    const newCards = [...deck, card];
    setDeck(newCards);
  };

  const res2 = (card) => {
    console.log(card);
    setSelectedCards2({});
    const newCards = [...deck, card];
    setDeck(newCards);
  };

  const getNextLevel = () => {
    if (level3Selection === "Haemotoxic Envenomation") {
      return "/level11"; // Redirect to Level 11 for Situation 1 or 12 for Situation 2
    } else if (level3Selection === "Neurotoxic Envenomation") {
      return "/level7"; // Redirect to Level 7 for Neurological sign
    }
    return "/level7"; // Default to Level 7
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
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>

      {/* Icons on the top-right corner */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-6 mb-3">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 text-center">
          5 mins after starting AVS, patient develops Anaphylactoid reactions.<br />{" "}
          Options available for management:
        </h2>
      </div>

      {/* Deck Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-10 mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border border-blue-500 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center text-sm sm:text-base p-2"
            style={{ minWidth: "100px", minHeight: "80px" }}
            onClick={() => selectCard(card)}
          >
            <p className="text-center">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Selected Boxes */}
      <div className="text-xl w-full">
        <div>
          <h2 className="text-slate-50 text-center text-2xl font-bold">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div
            className="border-2 border-blue-400 bg-gray-100 rounded-lg shadow-md text-gray-700 flex justify-center items-center text-sm sm:text-base p-2"
            style={{ minWidth: "120px", minHeight: "90px" }}
            onClick={() => res1(selectedCards1)}
          >
            <p className="text-center">{selectedCards1.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 bg-gray-100 rounded-lg shadow-md text-gray-700 flex justify-center items-center text-sm sm:text-base p-2"
            style={{ minWidth: "120px", minHeight: "90px" }}
            onClick={() => res2(selectedCards2)}
          >
            <p className="text-center">{selectedCards2.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 bg-gray-100 rounded-lg shadow-md text-gray-700 flex justify-center items-center text-sm sm:text-base p-2"
            style={{ minWidth: "120px", minHeight: "90px" }}
          >
            <p className="text-center">{selectedCards3.text}</p>
          </div>
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">
              Your choices are correct
            </h2>
            {level3Selection === "Haemotoxic Envenomation" ? (
              <>
                <button
                  onClick={() => handleSuccessClose("/level11")}
                  className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg"
                >
                  Situation 1: Initial WBCT result shows clotted
                </button>
                <button
                  onClick={() => handleSuccessClose("/level12")}
                  className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg"
                >
                  Situation 2: Initial WBCT result shows not clotted
                </button>
              </>
            ) : (
              <button
                onClick={() => handleSuccessClose("/level7")}
                className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg"
              >
                Situation: Neurological sign
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

export default Level6;
