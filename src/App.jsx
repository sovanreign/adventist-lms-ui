import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Teachers from "./pages/teachers/teachers";
import Students from "./pages/students/students";
import Videos from "./pages/videos/videos";
import Lessons from "./pages/lessons/lessons";
import Lesson from "./pages/lessons/lesson";
import CountTheFruit from "./pages/activities/games/count-the-fruit";
import Activities from "./pages/activities/activities";
import FindMissingLetter from "./pages/activities/games/find-missing-letter";
import NameTheColor from "./pages/activities/games/name-the-color";
import Game from "./pages/activities/game";
import MyStudents from "./pages/my-students/my-students";
import ActivityHistory from "./pages/activities/activity-history";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/teachers" element={<Teachers />} />
        <Route exact path="/my-students" element={<MyStudents />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/videos" element={<Videos />} />
        <Route exact path="/lessons" element={<Lessons />} />
        <Route exact path="/lessons/:id" element={<Lesson />} />

        <Route exact path="/activities" element={<Activities />} />
        <Route
          exact
          path="/activities/history/:id"
          element={<ActivityHistory />}
        />

        <Route exact path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
