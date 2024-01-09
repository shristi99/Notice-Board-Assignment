import React, { useState,useRef } from 'react'
import './BulletinBoard.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const BulletinBoard = ({onRemove}) => {

  //usestates
  const [dragMove,setDragMove]=useState(false);

  //editing
  const [isEdit,setIsEdit]=useState(false);

  //pinned
  const [isPin,setIsPin]=useState(false);

  //coordinates
  const [positionX,setPositionX]=useState(50);
  const [positionY,setPositionY]=useState(50);

  //references for canvas and textBox
  const box=useRef();
  const canvas=useRef();

  function handleMouseUp(){
     setDragMove(false);
  }

  function handleMouseMove(e){

    if(!isPin && dragMove){
       
    //taking the x and y positions

    const x=e.clientX - positionX;
    const y=e.clientY-positionY;
 

    //maximum height and width
    const maxWidth=window.innerWidth - canvas.current.clientWidth;

    const maxHeight=window.innerHeight - canvas.current.clientHeight;
  

    const width=Math.max(0,Math.min(x,maxWidth));
    const height=Math.max(0,Math.min(y,maxHeight));

    canvas.current.style.transform =`translate(${width}px,${height}px)`;
    }

  }


  function handleMouseDown(e){
    setDragMove(true);
    const pos=canvas.current.getBoundingClientRect();
    setPositionX(e.clientX - pos.x);
    setPositionY(e.clientY- pos.y);

  }


  //edit
  function onEdit(){
    setIsEdit(true);
    if(box.current){
        box.current.focus();
        box.current.setSelectionRange(0, 0); 
    }
  }

  //pin
//   function onPin(){
//     setIsPin((prev) => !prev);
//     if(isPin)
//     canvas.current.style.zIndex = 1000 
 
  
    
//   }

//pin
function onPin() {
    setIsPin((prev) => !prev);
  
    if (!isPin) {
      // Find the maximum z-index among existing pinned cards
      const pinnedCards = document.querySelectorAll('.canvas.pinned');
      let maxZIndex = 0;
  
      pinnedCards.forEach((card) => {
        const zIndex = parseInt(getComputedStyle(card).zIndex, 10);
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
          maxZIndex = zIndex;
        }
      });
  
      // Set the current card's z-index to one greater than the maximum
      canvas.current.style.zIndex = maxZIndex + 1;
      canvas.current.classList.add('pinned');
    } else {
      // Reset the z-index and remove the 'pinned' class
      canvas.current.style.zIndex = '';
      canvas.current.classList.remove('pinned');
    }
  }
  

  //save
  function onSave(){
    setIsEdit(false);
  }


  return (
  
    <div
     ref={canvas}
     onMouseUp={handleMouseUp}
     onMouseMove={handleMouseMove}
     onMouseDown={handleMouseDown}
     className='canvas'
     draggable
 >

<div className="container">

<div onClick={onPin}>
    {isPin ? <BookmarkIcon className="pin"/> :<BookmarkBorderOutlinedIcon className="pin"/>}
</div>

<div className="cursor-pointer " onClick={onRemove}>
    <CloseRoundedIcon className="close"/>
</div>



</div>

<textarea ref={box} className='textarea' cols="24" rows="14"></textarea>

<div>
{isEdit? <EditIcon onClick={onSave} className="edit"/> :<EditOutlinedIcon onClick={onEdit} className="edit"/>}
 </div>

   
    </div>
   
  )
}

export default BulletinBoard