import React, { createContext, useState, useContext, useEffect } from 'react'
import { cardDatasContext } from '../App';
import QuizSidebar from './QuizSidebar';

export const startingQuizRangeContext = createContext();
export const startingQuizAllContext = createContext();
const Quiz = () => {
    const [isFront, setFront] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const [isStartingQuizAll, setStartingQuizAll] = useState(false);
    const [isStartingQuizRange, setStartingQuizRange] = useState(false);

    const props = useContext(cardDatasContext);
    
    useEffect(()=>{
      setFront(true);
    },[cardIndex])

    useEffect(()=>{
      setFront(true);
    },[isStartingQuizAll])
    
    useEffect(()=>{
      setFront(true);
    },[isStartingQuizRange])

    const flipHandler = ()=>{
      setFront(!isFront);
    }
    let number, text;
    for (let i=0; i<=99;i++){
      if (props[i].id === cardIndex-1){
        number = props[i].number; 
        text = props[i].text;
      }
    }
    const frontCard = (
    <div onClick={()=>{flipHandler()}} className='relative flex flex-col justify-center items-center front-card bg-slate-400 sm:w-5/12 sm:h-3/4 w-7/12 h-4/6 rounded-lg select-none active:opacity-10 '>
      <span className='absolute top-2 right-4 sm:text-base text-sm'>{cardIndex}</span>
      <h1 className='sm:text-7xl font-bold text-4xl '>{number}</h1>
      <p className='absolute bottom-5 text-sm text-gray-700 '>Tap to flip</p>
    </div>)
    const backCard=(
      <div onClick={()=>{flipHandler()}} className='relative flex flex-col justify-center items-center front-card bg-slate-400 sm:w-5/12 sm:h-3/4 w-7/12 h-4/6 rounded-lg select-none  active:opacity-10 '>
          <span className='absolute top-2 right-4 sm:text-base text-sm'>{cardIndex}</span>
          <h1 className='sm:text-5xl font-bold text-xl '>{text}</h1>
          <p className='absolute bottom-5 text-sm text-gray-700 '>Tap to flip</p>
      </div>
    )
    return (
      <startingQuizAllContext.Provider value={{isStartingQuizAll, setStartingQuizAll}}>
        <startingQuizRangeContext.Provider value={{isStartingQuizRange, setStartingQuizRange}}>
          <div className='grid grid-cols-4 [height:calc(100vh-52px)]'>
            <QuizSidebar />
            <div className='col-span-3 flex  justify-center items-center gap-3' >
              <p className='absolute top-16 font-bold text-lg sm:text-xl'>Quiz Time</p>
              {isFront ? frontCard : backCard}
              <button></button>
            </div>
          </div>
        </startingQuizRangeContext.Provider>
      </startingQuizAllContext.Provider>
        
      
    )
}

export default Quiz