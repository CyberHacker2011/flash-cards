import React, { useContext, useState } from 'react'
import { cardIndexContext } from '../App';
const Sidebar = () => {
  const {cardIndex, setCardIndex} = useContext(cardIndexContext);
  const [newIndex, setNewIndex] = useState(1);
  const handleChange= (event)=>{
    const input = Number(event.target.value) ;
    if (input){
      if (input>100){
        setNewIndex(100)
      }else if(input<1){
        setNewIndex(1)
      }else{
        setNewIndex(input)
      }
      document.getElementById('go-to').classList.remove('hidden'); 
      
    }else {
      document.getElementById('go-to').classList.add('hidden');
      setNewIndex('');
    }
  }
  const handleGoTo = ()=>{
    setCardIndex(newIndex);
  }
  const handleKeyDown = (e)=>{
    const input = Number(e.target.value) ;
    if (input<=100 && input>0 && input && e.key==='Enter'){
      setCardIndex(newIndex);
    }
  }

  return (
    <div className='m-0 z-1 flex flex-col drop-shadow-md shadow-md sm:px-5 px-3 py-8 gap-5 sm:text-base text-sm w-full ' >

        <p>Order of card: 100/{cardIndex}</p>
        <span>
            100/
            <input type="number" name="input-number-of-card" required id="cardID" min="1" max="100" className='bg-transparent outline-none sm:max-w-14 max-w-8' value={newIndex} placeholder='000' onKeyDown={(event)=>handleKeyDown(event)}  onChange={(event)=>handleChange(event)} />
        </span>

        <span onClick={()=>handleGoTo()} id="go-to" className='hidden btn border-none shadow-inner p-2 sm:p-3 sm:text-sm text-xs bg-gray-50 rounded-md cursor-pointer select-none '>{newIndex ? `Go to the ${newIndex}-card` : "No card found! Please check input again" }</span>
    </div>
  )
}

export default Sidebar