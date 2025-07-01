import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";
import companyImage from "/whatsapp.jpg";

const Level1 = ({ setCompletedLevels }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null);
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [selectedCards4, setSelectedCards4] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [sc, setsc] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Handle image display for 10 seconds and transition to rules
  useEffect(() => {
    console.log("Image display started");
    const timer = setTimeout(() => {
      console.log("Image fading out after 10 seconds");
      setShowImage(false);
      setShowRules(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleCompleteLevel1 = () => {
    const completedLevels = { level1: true };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);
    navigate("/level2");
  };

  useEffect(() => {
    localStorage.setItem("currentLevel", location.pathname);
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "Reassure" },
    { id: 2, text: "Apply tourniquets tightly to occlude blood flow" },
    { id: 3, text: "Immobilize like a fractured limb" },
    { id: 4, text: "Apply suction at wound site" },
    { id: 5, text: "Apply turmeric/antiseptic ointment to local wound" },
    { id: 6, text: "Make an incision at the bite site" },
    { id: 7, text: "Consult traditional healers, because they are locally accessible" },
    { id: 8, text: "Go to nearest Govt. hospital" },
    { id: 9, text: "Tell the doctor of any emergent sign" },
    { id: 10, text: "Try to capture the snake or take a picture of the snake" },
  ];

  const correctSequence = [
    { id: 1, text: "Reassure" },
    { id: 3, text: "Immobilize like a fractured limb" },
    { id: 8, text: "Go to nearest Govt. hospital" },
    { id: 9, text: "Tell the doctor of any emergent sign" },
  ];

  useEffect(() => {
    setDeck(initialDeck);
  }, []);

  useEffect(() => {
    const shuffledDeck = shuffle([...initialDeck]);
    setDeck(shuffledDeck);
  }, []);

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined &&
      selectedCards3.text !== undefined &&
      selectedCards4.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3, selectedCards4]);

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

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getText1 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      SetResult((prevResult) => [...prevResult, deck]);
      setSelectedCards1(deck);
      setDeck(initialDeck[1]);
    }
  };

  const getText2 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards2(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck(initialDeck[2]);
    }
  };

  const getText3 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards3(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck(initialDeck[3]);
    }
  };

  const getText4 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards4(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck({});
    }
  };

  const res = () => {
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
      selectedCards4.text,
    ];
    const correctCards = correctSequence.map((card) => card.text);
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );
    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level1Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel1();
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setSelectedCards4({});
    setDeck(initialDeck);
  };

  const handleBoxClick = (card, boxSetter) => {
    if (!card || !card.text) return;
    setDeck((prevDeck) => [...prevDeck, card]);
    boxSetter({});
  };

  const startGame = () => {
    console.log("Game started");
    setShowRules(false);
    setGameStarted(true);
  };

  return (
    <div
      className="relative w-full h-full overflow-auto"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
    >
      {showImage && (
        <img
          src={companyImage}
          alt="Company Logo"
          style={{
            opacity: showImage ? 1 : 0,
            transition: "opacity 1s",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: "50%",
          }}
          onError={() => console.log("Image failed to load")}
        />
      )}
      {showRules && !gameStarted && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 p-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center border-4 border-gray-300">
            <h2 className="text-3xl font-bold mb-4">Rules of the Snake Bite Game</h2>
            <p className="mb-2 text-lg">
              A patient of snake bite needs your urgent help.
            </p>
            <p className="mb-2 text-lg">
              As the game progresses, you will come across different situations which you need to handle correctly by selecting appropriate ones from given options.
            </p>
            <p className="mb-2 text-lg">
              There are possibilities like no envenomations, haemotoxic envenomation or neurotoxic envenomation.
            </p>
            <p className="mb-2 text-lg">
              In case of them, these are different clinical scenarios leading to different management paths.
            </p>
            <p className="mb-4 text-lg">
              By completing each path successfully, you will get a star.
            </p>
            <p className="mb-4 text-lg">Collect 8 stars to complete the game.</p>
            <button
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-md"
              onClick={startGame}
            >
              Start Playing
            </button>
          </div>
        </div>
      )}
      {gameStarted && (
        <div className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto">
          <div className="absolute top-4 right-4 flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaClock className="text-slate-50 text-xl sm:text-2xl" />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
              <span className="text-slate-50 text-sm sm:text-base">Help</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-50 mx-auto">
            You have come across a patient of Snake bite. Now choose appropriate
            actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10 items-center w-full max-w-screen-md mx-auto">
            {deck.map((card) => (
              <div
                key={card.id}
                className="border w-full h-20 sm:h-24 md:h-32 border-blue-500 p-2 sm:p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center"
                onClick={() =>
                  selectCard(
                    card,
                    !selectedCards1.text
                      ? setSelectedCards1
                      : !selectedCards2.text
                      ? setSelectedCards2
                      : !selectedCards3.text
                      ? setSelectedCards3
                      : setSelectedCards4
                  )
                }
              >
                <p className="text-sm sm:text-md">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="text-xl w-full h-30">
            <div>
              <h2 className="text-center text-3xl font-bold text-slate-50">
                Select Correct options
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[selectedCards1, selectedCards2, selectedCards3, selectedCards4].map(
                (card, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-blue-400 w-40 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() =>
                      handleBoxClick(
                        card,
                        [
                          setSelectedCards1,
                          setSelectedCards2,
                          setSelectedCards3,
                          setSelectedCards4,
                        ][idx]
                      )
                    }
                  >
                    <p className="text-sm text-center">{card.text}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {showSuccessPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
                <h2 className="text-lg sm:text-2xl font-bold text-green-600 mb-4">
                  Your choices are correct
                </h2>
                <button
                  className="bg-amber-950 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
                  onClick={handleSuccessClose}
                >
                  Proceed to the next level
                </button>
              </div>
            </div>
          )}

          {showWrongPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
                <h2 className="text-lg sm:text-2xl font-bold text-red-400 mb-4">
                  Your choices are incorrect
                </h2>
                <button
                  className="bg-red-400 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
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
      )}
    </div>
  );
};

export default Level1;
