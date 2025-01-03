import React from 'react'

const Help = () => {
  return (
    <div className=' flex flex-col items-center py-5 px-5 gap-5'>
        <h1 className='sm:text-xl text-sm text-center font-mono'>Here is the list of correspoding letters for each number(0-9)</h1>
        <div className='flex flex-col flex-wrap h-32 gap-x-24 sm:text-lg text-sm font-serif'>
            <p>0 - Z</p>
            <p>1 - T</p>
            <p>2 - N</p>
            <p>3 - M</p>
            <p>4 - R</p>
            <p>5 - L</p>
            <p>6 - B</p>
            <p>7 - K</p>
            <p>8 - F</p>
            <p>9 - G</p>
        </div>
        
    </div>
  )
}

export default Help