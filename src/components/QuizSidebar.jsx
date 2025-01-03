import React, { useContext, useState} from 'react'
import { cardIndexContext } from '../App';
import { startingQuizAllContext, startingQuizRangeContext } from './Quiz';

const QuizSidebar = () => {
  const {cardIndex, setCardIndex} = useContext(cardIndexContext);
  const {isStartingQuizAll, setStartingQuizAll} = useContext(startingQuizAllContext);
  const {isStartingQuizRange, setStartingQuizRange} = useContext(startingQuizRangeContext);

  const [numberOfQuizzes, setNumberOfQuizzes] = useState('');
  const [typeOfRadio, setTypeOfRadio] = useState('')
  const handleNumberOfQuizzes = (event, type) => {
    let number = Number(event.target.value);
    if (number && number>=1 && number<=100){
      setNumberOfQuizzes(number);
    }
    else if(number>100 && number) {
      setNumberOfQuizzes(100);
    }else if(number<1 && number){
      setNumberOfQuizzes(1);
    }else setNumberOfQuizzes('');
    
  }
  const handleRadio = (type) =>{
    if (type==="range"){
      setTypeOfRadio("range");
    }else if (type==="all"){
      setTypeOfRadio("all")
    }else{
      setTypeOfRadio("")
    }
  }
  const handleStartQuizRange = ()=>{
    setStartingQuizRange(true);
  }
  const handleStartQuizAll = ()=>{
    setStartingQuizAll(true);
  }


  const byRangeQuestions = (
    <>
      <span>
        Take questions between:&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value="2" onChange={(event)=>handleNumberOfQuizzes(event,'min')}/>
        and&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value="2" onChange={(event)=>handleNumberOfQuizzes(event,'max')}/>
      </span>
      <button className='btn border-none p-3 bg-slate-50 shadow-sm hover:-translate-y-1 hover:translate-x-1 transition-all delay-200' onClick={()=>handleStartQuizRange()}>Start Quiz</button>
    </>
    

  );
  const fromallQuestions = (
    <>
      <span>
        Number of questions:&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value={numberOfQuizzes} onChange={(event)=>handleNumberOfQuizzes(event,'min')}/>
      </span>
      <button className='btn border-none p-3 bg-slate-50 shadow-sm hover:-translate-y-1 hover:translate-x-1 transition-all delay-200' onClick={()=>handleStartQuizAll()}>Start Quiz</button>
    </>
    
  )

  return (
    <div className='m-0 z-1 flex flex-col drop-shadow-md shadow-md sm:px-5 px-3 py-8 gap-3 sm:text-base text-sm w-full ' >
        <p>Order of card: 100/{cardIndex}</p>
        <span>Questions from range&nbsp;<input name="radio" type="radio" onChange={()=>handleRadio('range')}/></span>
        <span>Questions from all&nbsp;<input name="radio" type="radio" onChange={()=>handleRadio('all')}/></span>
        {typeOfRadio==="range" && byRangeQuestions }
        {typeOfRadio==="all" && fromallQuestions }
    </div>
  )
}

export default QuizSidebar;