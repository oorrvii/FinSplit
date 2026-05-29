import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import LendTracker from "./pages/LendTracker";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/lendtracker" element={<LendTracker />}></Route>
      </Routes>
    </div>
  )
}

export default App;
