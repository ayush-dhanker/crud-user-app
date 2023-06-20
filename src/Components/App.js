import "./App.css";
import AddUser from "./AddUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand } from "reactstrap";

const App = () => {
  return (
    <>
      <Router>
        <Navbar light={true} color="dark" dark={true} className="mb-2">
          <NavbarBrand href="/">CRUD APP</NavbarBrand>
        </Navbar>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/addUser" element={<AddUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
