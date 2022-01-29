import React from 'react';
import { useLocation } from "react-router-dom";

function GameBox(props) {
  const location = useLocation();
  let win_num = location.to_win;

  if (location.to_win) {
    localStorage.setItem('to_win',location.to_win);
    win_num = location.to_win;
  } else {
    win_num = localStorage.getItem('to_win');
  }


  // games below 21 have 2 choices
  // games above 21 have 3 choices
  const max_choice = win_num > 20 ? 4 : 3;
  
  // console.log('game_box.js -> win num: ' + win_num);
  // console.log('game_box.js -> props.position: ' +  props.position);

  if (location.to_win) {
    localStorage.setItem('win_num',location.to_win);
    win_num = Number(location.to_win);
  } else {
    win_num = Number(localStorage.getItem('win_num'));
  }
  // console.log('__win_num -> ', + win_num);
  // console.log('class '+props.class);
  // console.log('position '+props.position);
  // console.log('over '+props.over);
  // console.log('class2 '+props.class2);
  // console.log('position2 '+props.position2);
  // console.log('class_selected '+props.class_selected);
  // console.log("win_num type: " + typeof(Number(win_num)));

  let boxes = [...Array(win_num).keys()];

  // console.log('^^^^ array: ' + boxes);

    return (
        <>  
          {/* {console.log('curr position: ', props.position)} */}
          {
          boxes.map((ar,i) => 
            (props.position === i)
              ? <div 
                className={"box "+props.class} 
                onClick={ (props.over === true) ? null : (e) => props.boxSelect(i)}
                >
                {i+1}
                </div>
              : (props.position2 === i)
                ? <div 
                  className={"box " + props.class2} 
                  onClick={(props.over === true) ? null : (e) => props.boxSelect(i)}
                  >
                  {i+1}
                  </div>
                : (i > props.position2 && i <= props.position2 + (max_choice-1))
                  ? <div 
                    className={(props.over === true) ? "box" : "box choice "+props.class_selected} 
                    onClick={(props.over === true) ? null : (e) => props.boxSelect(i)}
                    >
                    {i+1}
                    </div>
                  :<div className="box">{i+1}</div>)
          }
        </>       
    );
}

export default GameBox;