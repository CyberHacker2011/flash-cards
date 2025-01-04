import React, { useContext, useState} from 'react'
import { cardIndexContext } from '../App';
import { startingQuizAllContext, startingQuizRangeContext } from './Quiz';

const QuizSidebar = () => {
  const {cardIndex} = useContext(cardIndexContext);
  const {setStartingQuizAll} = useContext(startingQuizAllContext);
  const {setStartingQuizRange} = useContext(startingQuizRangeContext);
  const [numberOfQuizzes, setNumberOfQuizzes] = useState('');
  const [typeOfRadio, setTypeOfRadio] = useState('');
  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');


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

  const handleRangeOfQuizzes = (event, type)=>{
    if(event && (type==="min" || type==="max")){
      if (type==="min"){
        setMinRange(Number(event.target.value))
      }else{
        setMaxRange(Number(event.target.value))
      }
    }else{ console.log('Error occured on handleRangeofQuizzes (props not found)')}
  }


  const handleStartQuizRange = ()=>{
    const min = Math.min(minRange,maxRange);
    const max = Math.max(minRange,maxRange);
    setStartingQuizRange([true,[min,max]]);
    
  }
  const handleStartQuizAll = ()=>{
    setStartingQuizAll([true, numberOfQuizzes]);
  }


  const byRangeQuestions = (
    <>
      <span>
        Take questions between:&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value={minRange} onChange={(event)=>handleRangeOfQuizzes(event,'min')}/>
        and&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value={maxRange} onChange={(event)=>handleRangeOfQuizzes(event,'max')}/>
      </span>
      <button className='btn border-none p-3 bg-slate-50 shadow-sm hover:-translate-y-1 hover:translate-x-1 transition-all delay-200' onClick={()=>handleStartQuizRange()}>Start Quiz</button>
    </>
    

  );
  const fromAllQuestions = (
    <>
      <span>
        Number of questions:&nbsp;
        <input className='bg-transparent outline-none sm:max-w-12 max-w-7 border-b' type="number" min="1" max="100" placeholder='000' required value={numberOfQuizzes} onChange={(event)=>handleNumberOfQuizzes(event,'min')}/>
      </span>
      <button className='btn border-none p-3 bg-slate-50 shadow-sm hover:-translate-y-1 hover:translate-x-1 transition-all delay-200' onClick={()=>handleStartQuizAll()}>Start Quiz</button>
    </>
    
  )

  return (
    <div className='m-0 z-1 flex flex-col drop-shadow-md shadow-md sm:px-5 px-3 py-8 gap-5 sm:text-base text-sm w-full ' >
        <p>Order of card: 100/{cardIndex}</p>
        <span>Questions from range&nbsp;<input name="radio" type="radio" onChange={()=>handleRadio('range')}/></span>
        <span>Questions from all&nbsp;<input name="radio" type="radio" onChange={()=>handleRadio('all')}/></span>
        {typeOfRadio==="range" && byRangeQuestions }
        {typeOfRadio==="all" && fromAllQuestions }
    </div>
  )
}

export default QuizSidebar;