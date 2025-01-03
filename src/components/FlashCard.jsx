import React, { useState, useContext, useEffect } from 'react'
import { cardIndexContext, cardDatasContext } from '../App';
import Sidebar from './Sidebar';
const FlashCard = () => {
  const [isFront, setFront] = useState(true);
  const {cardIndex, setCardIndex} = useContext(cardIndexContext);
  const props = useContext(cardDatasContext);
  useEffect(()=>{
    setFront(true);
  },[cardIndex])

  const backBtnSvg = (
    <svg className='sm:w-12 w-9 sm:h-12 h-9' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"/><path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z"/></g></svg>
  )
  const nextBtnSvg = (
    <svg className='sm:w-12 w-9 sm:h-12 h-9' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z"/><path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z"/></g></svg>
  )

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
    
    <div className="grid grid-cols-4 [height:calc(100vh-52px)]">
      <Sidebar />
      <div className=' col-span-3  flex  justify-center items-center gap-3' >
        <button onClick={()=>{
          setCardIndex(cardIndex>=2 ? cardIndex-1 : cardIndex)
        }} className='opacity-70 active:opacity-0'>
          {backBtnSvg}
        </button>
        {isFront ? frontCard : backCard}
        <button onClick={()=>{
          setCardIndex(cardIndex<=99 ? cardIndex+1 : cardIndex)
        }} className='opacity-70 active:opacity-0'>
          {nextBtnSvg}
        </button>
      </div>
    </div>

  )
}

export default FlashCard