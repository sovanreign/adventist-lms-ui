import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Teachers from "./pages/teachers/teachers";
import Students from "./pages/students/students";
import Videos from "./pages/videos/videos";
import Lessons from "./pages/lessons/lessons";
import Lesson from "./pages/lessons/lesson";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/teachers" element={<Teachers />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/videos" element={<Videos />} />
        <Route exact path="/lessons" element={<Lessons />} />

        <Route exact path="/lessons/:id" element={<Lesson />} />
      </Routes>
    </Router>
  );
}

export default App;
