import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppNavBar from './Components/AppNavBar';
// import ColorManager from './Components/ColorManager';
import AppContext from "./AppContext.js"
import Home from "./Pages/Home.js";
import Task1 from "./Pages/Task1.js";
import Task2 from "./Pages/Task2.js";
import Task3 from "./Pages/Task3.js";
import Task4 from "./Pages/Task4.js";
import Task5 from "./Pages/Task5.js";

function App() {

  // Task 5 Filtering
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [reset, setReset] = useState(false);
  const [allExceptCategory, setAllExceptCategory] = useState(false);
  const [allExceptManufacturer, setAllExceptManufacturer] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");



  return (
    <>
    <AppContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        manufacturerFilter,
        setManufacturerFilter,
        reset,
        setReset,
        allExceptCategory,
        setAllExceptCategory,
        allExceptManufacturer,
        setAllExceptManufacturer,
        priceFrom,
        setPriceFrom,
        priceTo,
        setPriceTo
      }}
    >
      <AppNavBar />
      <div className="main-container">
        <Routes>
          <Route path="/tech-exam-1/" element={<Home />} />
          <Route path="/tech-exam-1/task-1" element={<Task1 />} />
          <Route path="/tech-exam-1/task-2" element={<Task2 />} />
          <Route path="/tech-exam-1/task-3" element={<Task3 />} />
          <Route path="/tech-exam-1/task-4" element={<Task4 />} />
          <Route path="/tech-exam-1/task-5" element={<Task5 />} />
        </Routes>
      </div>
    </AppContext.Provider>
    </>
  );
}

export default App;
