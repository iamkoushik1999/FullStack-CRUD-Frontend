import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import AddUsers from "./components/AddUsers";
import EditUsers from "./components/EditUsers";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/:id' element={<UserDetails />} />
          <Route path='/user/add' element={<AddUsers />} />
          <Route path='/user/edit/:id' element={<EditUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
