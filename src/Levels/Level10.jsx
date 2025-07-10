import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle } from "react-icons/fa";
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
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2]);

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

  // const getText1 = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards1(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(deck, setSelectedCards2);
  //   }
  // };

  // const getText2 = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards2(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(setSelectedCards1, deck);
  //   }
  // };

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
    // handleCompleteLevel10(); // This should now be modified to navigate to Level 13
    // You can directly navigate to Level 13 here if that is the desired behavior
    // navigate("/level14");
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
      {/* Icons on the top-right corner */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />

          {/*<h2 className="text-xl text-blue-600 font-bold">
           {countdown} s
          </h2>*/}
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* <h2 className="text-xl font-bold mx-auto mr-54">Choose card from deck</h2> */}
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 mb-6">
        Not improving after 30 min:
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-36 h-24 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200"
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
            <p>{card.text}</p>
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
                  {/* Add any content for this div here if needed */}
                </div>
              </div>
              {/* Add any additional closing tags for parent divs if needed */}
            </div>
          );
        };
        
        export default Level10;
