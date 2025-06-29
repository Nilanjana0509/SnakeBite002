import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

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
  const [showImage, setShowImage] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    console.log("Image display started");
    const timer = setTimeout(() => {
      console.log("Image fading out after 30 seconds");
      setShowImage(false);
      setShowRules(true);
    }, 30000);
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
      selectedCards1.text &&
      selectedCards2.text &&
      selectedCards3.text &&
      selectedCards4.text
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3, selectedCards4]);

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card);
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    setDeckIndex(newDeck.length > 0 ? 0 : null);
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
    if (!deck.text) {
      alert("Please select the card from the deck");
    } else {
      SetResult((prev) => [...prev, deck]);
      setSelectedCards1(deck);
      setDeck(initialDeck[1]);
    }
  };

  const getText2 = () => {
    if (!deck.text) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards2(deck);
      SetResult((prev) => [...prev, deck]);
      setDeck(initialDeck[2]);
    }
  };

  const getText3 = () => {
    if (!deck.text) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards3(deck);
      SetResult((prev) => [...prev, deck]);
      setDeck(initialDeck[3]);
    }
  };

  const getText4 = () => {
    if (!deck.text) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards4(deck);
      SetResult((prev) => [...prev, deck]);
      setDeck({});
    }
  };

  const res = () => {
    const selected = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
      selectedCards4.text,
    ];
    const correct = correctSequence.map((card) => card.text);
    const isCorrect = selected.every((text) => correct.includes(text));
    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level1Result", JSON.stringify(selected));
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
    setDeck((prev) => [...prev, card]);
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
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {showImage && (
        <img
          src="/whatsapp.jpeg"
          alt="Company Logo"
          style={{
            opacity: 1,
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

      {/* Add your actual game UI below here */}
    </div>
  );
};

export default Level1;
