import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { cardDatasContext } from '../App';
import QuizSidebar from './QuizSidebar';

export const startingQuizRangeContext = createContext();
export const startingQuizAllContext = createContext();
const Quiz = () => {
    const [isFront, setFront] = useState(true);
    const [cardIndex, setCardIndex] = useState('');
    const [isStartingQuizAll, setStartingQuizAll] = useState([]);
    const [isStartingQuizRange, setStartingQuizRange] = useState([]);
    const [numberOfCard, setNumberOfCard] = useState('');
    const [textOfCard, setTextOfCard] = useState('');
    const dataTaken = useContext(cardDatasContext);
    const [props, setProps] = useState([]);

    const doSetProps = useCallback((data) => {
      const newList = data.map((element, index) => {
        const item = dataTaken.find(item => item.id === element);
        if (item) {
          return { id: index, number: item.number, text: item.text };
        }
        return null;
      })
      setProps(newList);
    }, [dataTaken]);


    useEffect(()=>{
      
      setFront(true);
      const len = props.length;
      for (let i=0; i<len;i++){
        if (props[i].id === cardIndex-1){
          setNumberOfCard(props[i].number); 
          setTextOfCard(props[i].text);
        }
      }
    },[cardIndex, props, dataTaken])

    useEffect(() => {
      if (isStartingQuizAll.length>=1){
        console.log(isStartingQuizAll)
        const [started, number] = isStartingQuizAll;
        if (started) {
          setCardIndex(1)
          const list = [];
          let i = 0;
          while (i < number) {
            const rnd = Math.round(Math.random() * 99 + 1);
            if (!list.includes(rnd)) {
              list.push(rnd);
              i++;
            }
          }
          doSetProps(list);
        } 
      }
      
    },[isStartingQuizAll,dataTaken,doSetProps]);
    
    
    useEffect(()=>{
      if (isStartingQuizRange.length>=1){
        setCardIndex(1)
        const [started, [min,max]] = isStartingQuizRange;
        if (started){
          const newList = dataTaken.slice(min,max+1).map((value,index)=>{
            return { ...value, id: index };
          })
          setProps(newList)
        }
      }
    },[isStartingQuizRange, dataTaken])

    const flipHandler = ()=>{
      setFront(!isFront);
    }

    
    const backBtnSvg = (
    <svg className='md:w-12 w-9 md:h-12 h-9' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"/><path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z"/></g></svg>
    )
    const nextBtnSvg = (
      <svg className='md:w-12 w-9 md:h-12 h-9' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z"/><path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z"/></g></svg>
    )

    const frontCard = (
    <div onClick={()=>{flipHandler()}} className='relative flex flex-col justify-center items-center front-card bg-slate-400  lg:w-80 md:w-72 sm:w-64 xs:w-52 w-44 lg:h-96 md:h-80 sm:h-72 xs:h-64 h-52 rounded-lg select-none active:opacity-10 '>
      <span className='absolute top-2 right-4 sm:text-base text-sm'>{cardIndex}</span>
      <h1 className='sm:text-7xl font-bold text-4xl '>{numberOfCard}</h1>
      <p className='absolute bottom-5 text-sm text-gray-700 '>Tap to flip</p>
    </div>)
    const backCard=(
      <div onClick={()=>{flipHandler()}} className='relative flex flex-col justify-center items-center front-card bg-slate-400  lg:w-80 md:w-72 sm:w-64 xs:w-52 w-44 lg:h-96 md:h-80 sm:h-72 xs:h-64 h-52 rounded-lg select-none  active:opacity-10 '>
          <span className='absolute top-2 right-4 sm:text-base text-sm'>{cardIndex}</span>
          <h1 className='sm:text-3xl font-bold text-xl '>{textOfCard}</h1>
          <p className='absolute bottom-5 text-sm text-gray-700 '>Tap to flip</p>
      </div>
    )
    return (
      <startingQuizAllContext.Provider value={{isStartingQuizAll, setStartingQuizAll}}>
        <startingQuizRangeContext.Provider value={{isStartingQuizRange, setStartingQuizRange}}>
          <div className='grid grid-cols-4 [height:calc(100vh-52px)]'>
            <QuizSidebar />
            <div className=' col-span-3 relative flex  justify-center  gap-3' >
              <div className=' w-full absolute top-12 flex justify-center items-center p-5 gap-3 '>
                <button onClick={() => setCardIndex(props ? prevIndex => Math.max(prevIndex - 1, 1) : '')} className='opacity-70 active:opacity-0'>
                  {backBtnSvg}
                </button>
                {isFront ? frontCard : backCard}
                <button onClick={() => setCardIndex(props ? prevIndex => Math.min(prevIndex + 1, props.length):'' )} className='opacity-70 active:opacity-0'>
                  {nextBtnSvg}
                </button>
              </div>
              
            </div>
          </div>
        </startingQuizRangeContext.Provider>
      </startingQuizAllContext.Provider>
        
      
    )
}

export default Quiz