import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/snake11.png";
import { FaQuestionCircle, FaStar } from "react-icons/fa";

const Level3 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [his, setHis] = useState({});
  const [exam, setExam] = useState({});
  const [sc, setsc] = useState(0);
  const [box1, setBox1] = useState({});
  const [box2, setBox2] = useState({});
  const [box3, setBox3] = useState({});
  const [box4, setBox4] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [abc, setAbc] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedEnvenomationType, setSelectedEnvenomationType] = useState("");
  const [shuffledHistoryDeck, setShuffledHistoryDeck] = useState([]);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel3 = (nextLevel) => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [box1.code, box2.code, box3.code, box4.code];
    localStorage.setItem("level3Result", JSON.stringify(array));
    const array1 = [box1.text, box2.text, box3.text, box4.text];
    localStorage.setItem("level3TextResult", JSON.stringify(array1));
    // Store the selected envenomation type
    localStorage.setItem("selectedEnvenomationType", selectedEnvenomationType);
    setCompletedLevels(completedLevels);
    navigate(nextLevel, { state: { prev: location.state?.prev + '-3' || "1-2-3" } });
  };

  useEffect(() => {
    localStorage.setItem("currentLevel", location.pathname);
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, [location, navigate]);

  useEffect(() => {
    if (box1 && box2 && box3 && box4) {
      checkrules(box1, box2, box3, box4);
    }
  }, [box1, box2, box3, box4]);

  const initialHistoryDeck = [
    { id: 1, text: "Painful Progressive Swelling", code: "h", type: "history" },
    { id: 2, text: "Continuous bleeding from bite site", code: "h", type: "history" },
    { id: 3, text: "Bleeding from the gums and/or other orifices", code: "h", type: "history" },
    { id: 4, text: "Local necrosis with rancid smell in a swollen limb with taught and shiny skin and skip lesions", code: "h", type: "history" },
    { id: 5, text: "Significant painful swelling involving the whole limb and extending onto the trunk", code: "h", type: "history" },
    { id: 6, text: "Compartment Syndrome", code: "h", type: "history" },
    { id: 7, text: "Hypotension", code: "h", type: "history" },
    { id: 8, text: "Petechiae, purpura and ecchymosis", code: "h", type: "history" },
    { id: 9, text: "Numbness around lips and mouth", code: "n", type: "history" },
    { id: 10, text: "Paralysis noted early in the morning", code: "n", type: "history" },
    { id: 11, text: "Dyspnoea/ Dysphonia/ Dysphagia", code: "n", type: "history" },
    { id: 12, text: "Acute pain abdomen starting from early in the morning", code: "n", type: "history" },
    { id: 13, text: "Ptosis", code: "n", type: "history" },
    { id: 14, text: "Inability to swallow and aspiration of pooled secretions", code: "n", type: "history" },
    { id: 15, text: "Dysarthria", code: "n", type: "history" },
    { id: 16, text: "Unexplained respiratory distress in children in the presence of ptosis", code: "n", type: "history" },
  ];

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const shuffledHistory = shuffle(initialHistoryDeck);
    setShuffledHistoryDeck(shuffledHistory);
  }, [location]);

  const checkrules = (box1, box2, box3, box4) => {
    const boxes = [box1, box2, box3, box4];
    const allFilled = boxes.every((box) => box && Object.keys(box).length > 0);
    if (!allFilled) return;

    const codes = boxes.map((box) => box.code);
    const types = boxes.map((box) => box.type);
    const allSameCode = codes.every((code) => code === codes[0]);
    const historyCount = types.filter((type) => type === "history").length;
    const withinLimits = historyCount <= 4;

    if (allSameCode && withinLimits) {
      const envenomationType =
        codes[0] === "h"
          ? "Haemotoxic Envenomation"
          : codes[0] === "n"
          ? "Neurotoxic Envenomation"
          : "No Envenomation";

      setSelectedEnvenomationType(envenomationType);
      setShowSuccessPopup(true);
    } else {
      setAlertVisible(true);
    }
  };

  const handleCardSelect = (card) => {
    const isCardSelected = selectedCards.some((c) => c.id === card.id);
    if (isCardSelected) {
      setSelectedCards((prevCards) =>
        prevCards.filter((c) => c.id !== card.id)
      );
      if (card.type === "history") {
        setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      }
    } else if (selectedCards.length >= 4) {
      setAbc(false);
    } else {
      const newCards = [...selectedCards, card];
      const historyCount = newCards.filter((c) => c.type === "history").length;
      if (historyCount > 4) {
        setAbc(false);
      } else {
        setSelectedCards(newCards);
        if (card.type === "history") {
          setShuffledHistoryDeck((prevDeck) =>
            prevDeck.filter((c) => c.id !== card.id)
          );
          if (newCards.length === 1) setBox1(card);
          else if (newCards.length === 2) setBox2(card);
          else if (newCards.length === 3) setBox3(card);
          else if (newCards.length === 4) setBox4(card);
        }
      }
    }
  };

  const resetGame = () => {
    setBox1({});
    setBox2({});
    setBox3({});
    setBox4({});
    setSelectedCards([]);
    setAbc(false);
    setAlertVisible(false);
    setShowSuccessPopup(false);
    setShuffledHistoryDeck(shuffle(initialHistoryDeck));
  };

  const displayedCards = [...shuffledHistoryDeck];

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
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
        </div>
      </div>

      <p className="text-2xl font-bold text-slate-50 mx-auto text-center mt-4">
        Various findings related to Snake bite have been listed below. Select from the following optionsconsidering one type of
        envenomation to go to next level
      </p>

      <div className="w-full h-auto mt-6 flex flex-wrap justify-center gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="border-2 border-blue-400 w-60 h-22 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleCardSelect(card)}
          >
            <p className="text-md text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-center text-slate-50 text-lg font-bold mt-14">Select Correct options</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {[box1, box2, box3, box4].map((box, i) => (
          <div
            key={i}
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
          >
            <p className="text-md text-center">{box.text}</p>
          </div>
        ))}
      </div>

      {/* ✅ Custom Dialog Box for Envenomation Type */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl px-6 py-8 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-6 text-orange-600">
              You have selected:{" "}
              <span className="font-bold">{selectedEnvenomationType}</span>
            </h2>
            <button
              onClick={() =>
                handleCompleteLevel3(
                  selectedEnvenomationType === "No Envenomation"
                    ? "/level5"
                    : "/level4"
                )
              }
              className="px-6 py-3 bg-[#3d1a00] text-white rounded-xl hover:bg-[#5a2b00] transition-colors duration-200"
            >
              Proceed to the next level
            </button>
          </div>
        </div>
      )}

      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Your selection is inconsistent with a single type of envenomation
            </h2>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
