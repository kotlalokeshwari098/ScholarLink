import React from 'react'
import { myBookmark } from './ScholarShipList';
import { useContext } from 'react';


function BookMark() {
  const data=useContext(myBookmark)
  console.log(data);
  return (
    <>
       
       <div>
        
       </div>
    </>
  )
}

export default BookMark

