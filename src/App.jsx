import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Help from "./components/Help";
import NoPage from "./components/NoPage";
import FlashCard from "./components/FlashCard";
import { createContext, useState } from "react";
import { cardDatas } from "./data/cardDatas";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const cardIndexContext = createContext();
export const cardDatasContext = createContext();
function App() {
  const [cardIndex, setCardIndex] = useState(1);

  return (
    <BrowserRouter>
      <cardDatasContext.Provider value={cardDatas}>
        <cardIndexContext.Provider value={{ cardIndex, setCardIndex }}>
          <Header />
          
            
            <Routes >
                <Route path="/" element={
                  
                    <FlashCard />
                  
                 } />
                <Route path="quiz" element={<Quiz />} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
          
        </cardIndexContext.Provider>
      </cardDatasContext.Provider>
    </BrowserRouter>
  );
}

export default App;
