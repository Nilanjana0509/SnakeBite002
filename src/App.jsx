import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Use Navigate instead of Redirect
import { useState } from "react";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2"; // Assuming you have these components
import Level3 from "./Levels/Level3";
import Level4 from "./Levels/Level4";
import Level5 from "./Levels/Level5";
import Level6 from "./Levels/Level6";
import Level7 from "./Levels/Level7";
import Level8 from "./Levels/Level8";
import Level9 from "./Levels/Level9";
import Level10 from "./Levels/Level10";
import Level11 from "./Levels/Level11";
import Level12 from "./Levels/Level12";
import Level13 from "./Levels/Level13";
import Level14 from "./Levels/Level14";
import Level15 from "./Levels/Level15";
import Level16 from "./Levels/Level16";
import FinalResult16 from "./Levels/Result16";
import FinalResult5 from "./Levels/Result5";
import FinalResult15 from "./Levels/Result15";  
import FinalResult12 from "./Levels/Result12";
import FinalResult13 from "./Levels/Result13";

function App() {
  // Initialize completedLevels from local storage
  const [completedLevels, setCompletedLevels] = useState(() => {
    const savedLevels = localStorage.getItem("completedLevels");
    return savedLevels
      ? JSON.parse(savedLevels)
      : { level1: false, level2: false };
  });

  // Define the ProtectedRoute function
  const ProtectedRoute = ({ completed, redirectTo, children }) => {
    return completed ? children : <Navigate to={redirectTo} />;
  };

  return (
    <Router>
      <Routes>
        {/* Route for Level 1 */}
        <Route
          path="/level1"
          element={<Level1 setCompletedLevels={setCompletedLevels} />}
        />

        {/* Protected Route for Level 2 */}
        <Route
          path="/level2"
          element={
            <ProtectedRoute
              completed={completedLevels.level1}
              redirectTo="/level1"
            >
              <Level2 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/level3"
          element={
            <ProtectedRoute
              completed={completedLevels.level2}
              redirectTo="/level2"
            >
              <Level3 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
<Route
  path="/level4"
  element={
    <ProtectedRoute
      completed={completedLevels.level3}
      redirectTo="/level3"
    >
      <Level4 setCompletedLevels={setCompletedLevels} />
    </ProtectedRoute>
  }
/>
<Route
  path="/level5"
  element={
    <ProtectedRoute
      completed={completedLevels.level2} // ✅ Only requires Level 2
      redirectTo="/level2"
    >
      <Level5 setCompletedLevels={setCompletedLevels} />
    </ProtectedRoute>
  }
/>

        <Route
          path="/level6"
          element={
            <ProtectedRoute
              completed={completedLevels.level4}
              redirectTo="/level4"
            >
              <Level6 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/level6"
          element={
            <ProtectedRoute
              completed={completedLevels.level5}
              redirectTo="/level5"
            >
              <Level6 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/level11"
          element={
            <ProtectedRoute
              completed={completedLevels.level6}
              redirectTo="/level6"
            >
              <Level11 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level12"
          element={
            <ProtectedRoute
              completed={completedLevels.level6}
              redirectTo="/level6"
            >
              <Level12 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level7"
          element={
            <ProtectedRoute
              completed={completedLevels.level6}
              redirectTo="/level6"
            >
              <Level7 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/level11"
          element={
            <ProtectedRoute
              completed={completedLevels.level8}
              redirectTo="/level8"
            >
              <Level11 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/level9"
          element={
            <ProtectedRoute
              completed={completedLevels.level7}
              redirectTo="/level7"
            >
              <Level9 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level10"
          element={
            <ProtectedRoute
              completed={completedLevels.level7}
              redirectTo="/level7"
            >
              <Level10 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level11"
          element={
            <ProtectedRoute
              completed={completedLevels.level8}
              redirectTo="/level8"
            >
              <Level11 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level12"
          element={
            <ProtectedRoute
              completed={completedLevels.level8}
              redirectTo="/level8"
            >
              <Level12 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level12"
          element={
            <ProtectedRoute
              completed={completedLevels.level11}
              redirectTo="/level11"
            >
              <Level12 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level15"
          element={
            <ProtectedRoute
              completed={completedLevels.level11}
              redirectTo="/level11"
            >
              <Level15 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level13"
          element={
            <ProtectedRoute
              completed={completedLevels.level9}
              redirectTo="/level9"
            >
              <Level13 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level14"
          element={
            <ProtectedRoute
              completed={completedLevels.level10}
              redirectTo="/level10"
            >
              <Level14 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level9"
          element={
            <ProtectedRoute
              completed={completedLevels.level10}
              redirectTo="/level10"
            >
              <Level9 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/level16"
          element={
            <ProtectedRoute
              completed={completedLevels.level14}
              redirectTo="/level14"
            >
              <Level16 setCompletedLevels={setCompletedLevels} />
            </ProtectedRoute>
          }
        />

        {/* Fallback route to Level 1 */}
        <Route path="*" element={<Navigate to="/level1" />} />
          
          {/* Route for the final result */}
          <Route path="/result16" element={<FinalResult16 />} />
          <Route path="/result5" element={<FinalResult5 />} />
          <Route path="/result15" element={<FinalResult15 />} />
          <Route path="/result12" element={<FinalResult12 />} />
          <Route path="/result13" element={<FinalResult13 />} />

      </Routes>
    </Router>
  );
}

export default App;


 /* <Route
  path="/level5"
  element={
    <ProtectedRoute
      completed={completedLevels.level3}
      redirectTo="/level3"
    >
      <Level5 setCompletedLevels={setCompletedLevels} />
    </ProtectedRoute>
  }
/>
 
LEVEL 5 was PROTECTED!*/ 