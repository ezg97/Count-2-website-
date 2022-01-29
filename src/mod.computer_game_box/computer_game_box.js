import React from 'react';
import { useLocation } from "react-router-dom";

function ComputerGameBox(props) {

    const location = useLocation();
    let win_num = location.to_win;

    // Without setting the winning number in local storage, this fragment will forget it since it can't access the URL params
    if (win_num) {
        localStorage.setItem('to_win', win_num);
    } else {
        win_num = localStorage.getItem('to_win');
    }
    // games below 21 have 2 choices
    // games above 21 have 3 choices
    const max_choice = win_num > 20 ? 4 : 3; 
    let boxes = [...Array(win_num).keys()];


    const compSelectBox = () => {

        let counter = props.position2;
        let final_num = Math.floor(win_num/max_choice);
        let move = 0;
        let lucky_nums_amount = Math.floor(win_num / max_choice);
        let lucky_nums = [];
        // console.log('-> counter: ', counter);
        // console.log('final_num: ' + final_num);
        // console.log('win_num: ' + win_num);
        // console.log('max_choice: ' + max_choice);
        // console.log('lucky_nums_amount: ' + lucky_nums_amount);
        // console.log('lucky_nums: ' + lucky_nums);

// 3 total - 10/3 = 3
// 4, 7, 10

// 4 total - 13/3 = 4
// 4, 7, 10, 13

// 5 total - 16/3 = 5
// 4, 7, 10, 13, 16

// ------------
//  4 Choices
// ------------

// 2 total - 9/4 = 2
// 1, 2
// 5, 9

// 3 total - 13/4 = 3
// 1, 2, 3
// 5  9  13

// 4 total - 17/4 = 4
// 1  2  3   4
// 5, 9, 13, 17

// 5 total - 21/4 = 5
// 1  2  3   4   5
// 5, 9, 13, 17, 21


// 1  2  3   4   5
// 4, 7, 10, 13, 17

// 8 total
// 1  2  3   4   5   6   7   8
// 5, 9, 13, 17, 21, 25, 29, 33


        for (let i = 0; i < lucky_nums_amount; i++) {
            lucky_nums.push( max_choice * (i + 1) + 1 );
        }

        // console.log(lucky_nums);


        for (let i = 0; i < lucky_nums_amount; i++) {
            // console.log('counter + 1', counter+1);
            if ((counter+1) < lucky_nums[i]) {
                // console.log('this is the lucky number we\'re under', lucky_nums[i]);
                move = lucky_nums[i] - (counter+1);
                if (move > (max_choice-1)) {
                        // console.log('random: ', move);
                        move = Math.floor(Math.random() * (max_choice-1)) + 1;
                }
                // console.log('movement selected: ' + move);
                counter += move;
                // console.log('counter: ', counter);
                break;
            }
            // console.log('iteration: #' + i);
        }

        // console.log('move ' + move + " steps. You are in place " + counter + ".");
        props.boxSelect(counter);
    }

    let move_selection = compSelectBox();
    
    return (
        <>  
          {/* {console.log('curr position: ', props.position)} */}
          {
          boxes.map((ar,i) => 
            (move_selection === i)
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
                : (i > props.position2 && i <= props.position2+2)
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

export default ComputerGameBox;