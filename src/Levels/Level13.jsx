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
  // const [countdown, setCountdown] = useState(1000);
  const [starCount, setStarCount] = useState(0)


  const handleCompleteLevel13 = () => {
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
      level11: true,
      level12: true,
      level13: true,
      level14: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

    const array = [];
    array.push(selectedCards.text);
    console.log(array);
    localStorage.setItem("level13Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);

    // Navigate to FinalResult13 based on path condition
    // Navigate to FinalResult13 based on path condition
    const isPathA = localStorage.getItem("level9Result");
    var isPathC, isPathB;
    
    if(localStorage.getItem("level10Result")){
      if(localStorage.getItem("level14Result")){
        isPathC = true;
      }
      else{
        isPathB = true;
      }
    }
    
    navigate("/result13", { state: { isPathA: isPathA, isPathB: isPathB, isPathC: isPathC } });
    
    const path = location.state.prev + '-' + 13;
    const storedData = JSON.parse(localStorage.getItem("path")) || {};
    if (storedData[path] == false) {
      storedData[path] = true; // Update to true
      localStorage.setItem("path", JSON.stringify(storedData));
    }
  };
  useEffect(() => {
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 13!");
      navigate("/level1"); // Redirect to home or another page
    }
    const path = location.state.prev + '-' + 13;
    const storedData = JSON.parse(localStorage.getItem("path")) || {};
    if (storedData[path]) {
      alert("You have completed this path");
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
  }, [])

  const initialDeck = [
    { id: 1, text: "Discharge only when no neuro-deficit present" },
    { id: 2, text: "Discharge after 6 hours" },
    { id: 3, text: "Discharge after 24 hours irrespective of improvement" },
    { id: 4, text: "Transfer to referral hospital" },
  ];

  // Correct sequence of cards
  const correctSequence = [
    { id: 1, text: "Discharge only when no neuro-deficit present" },
  ];

  // Shuffle the deck when the component mounts
  // useEffect(() => {
  //   const shuffledDeck = shuffle(Array.from(initialDeck.entries()));
  //   setDeck(shuffledDeck);
  // }, []);

  // useEffect(() => {
  //   setDeck(initialDeck); // Set the first card as the initial card
  // }, []);

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
    if (selectedCards.text !== undefined) {
      res();
    }
  }, [selectedCards]);

  // useEffect(() => {
  //   if (countdown <= 0) {
  //     resetGame(); // Reload the page when countdown reaches zero
  //     return;
  //   }

  //   // Set the interval to decrease countdown every second (1000 ms)
  //   const timer = setInterval(() => {
  //     setCountdown((prev) => prev - 1);
  //   }, 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(timer);
  // }, [countdown]);

  // Shuffle function
  // const shuffle = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  // function getRandomObject() {
  //   const randomIndex = Math.floor(Math.random() * initialDeck.length);
  //   return initialDeck[randomIndex];
  // }

  // const initialfun = () => {
  //   setDeck(getRandomObject());
  // };

  // const getText = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(setSelectedCards);
  //   }
  // };

  // const res = () => {
  //   // console.log('sdsds');
  //   console.log(selectedCards);

  //   if (
  //     selectedCards.id === correctSequence[0].id
  //   ) {
  //     // console.log('correct');
  //     setShowSuccessPopup(true);
  //   } else {
  //     // console.log("incorrect");
  //     setShowWrongPopup(true); // Show wrong popup
  //   }

  //   // if(result.length>=3){
  //   //   console.log(result);

  //   // }
  // };

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
    const selectCard = [selectedCards.text];

    // Create an array of correct cards
    const correctCards = correctSequence.map((card) => card.text);

    // Check if all selected cards exist in the correct sequence (regardless of order)
    const isCorrect = selectCard.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level13Result", JSON.stringify(selectCard));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true); // Show wrong popup
    }
  };

  // const handleBoxClick = () => {
  //   if (selectedCards ) {
  //     const userSequence = [selectedCards];
  //     const correctSequenceIds = correctSequence.map((card) => card.id);
  //     const userSequenceIds = userSequence.map((card) => card.id);
  //     if (userSequenceIds.join(',') === correctSequenceIds.join(',')) {
  //       setShowSuccessPopup(true); // Show success popup
  //     } else {
  //       setShowWrongPopup(true); // Show wrong popup
  //     }
  //   }
  // };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel13();
  };

  const resetGame = () => {
    // setCountdown(1000);
    // Reset the selected cards
    setSelectedCards({});
    // Reset the deck
    setDeck(initialDeck);
    setDeckIndex(0); // Show the first card from the deck

    // Reshuffle the deck
    // const reshuffledDeck = shuffle(Array.from(initialDeck.entries()));
    // setDeck(reshuffledDeck);
  };

  // const handleWrongClose = () => {
  //   // setShowWrongPopup(false);
  //   // Optional: Reset the selected cards here if necessary
  // };

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
{/*         <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />

          <h2 className="text-xl text-blue-600 font-bold">
           {countdown} s
          </h2>
        </div> */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full my-6">
        {/* <h2 className="text-xl font-bold mx-auto mr-54">Choose card from deck</h2> */}
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 mb-6">
          Options available when there is persistent improvement seen after 1 hour:
        </h2>
      </div>

      {/* Display all deck cards in a grid format */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-40 h-24 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200" // Reduced from w-48 h-32 to w-40 h-24
            onClick={() => selectCard(card, setSelectedCards)}
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Selected card box */}
      <div>
        <h2 className="text-slate-50 text-center text-2xl font-bold mt-14">
          Select the Correct Option
        </h2>
      </div>
      <div className="mt-8 w-40 h-24 border-2 border-blue-500 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700"> {/* Reduced from w-60 h-32 to w-40 h-24 */}
        <p className="text-md text-center">{selectedCards.text}</p>
      </div>

      {/* <div className="flex w-full mt-10">
          <h2 className="text-xl text-blue-600 font-bold">Time Remaining: {countdown} seconds</h2>
        </div> */}

      {/* Success Popup for Correct Sequence */}
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

      {/* Wrong Popup for Incorrect Sequence */}
      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Your choices are incorrect</h2>
            {/* <p className="mb-6">You have selected the wrong sequence.</p> */}
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
