import React from 'react';

import Authorization from './mod.authorization/authorization';

import './App.css';

/* 
LoginCheck
  - does username exist?
    - enter login info
      - has a username
      - has a password
        - In local level game
          - uses info to grab: win count & lose count
        - In comp level game
          - uses info to grab: win count & lose count 
    - sign up info
      - does username exist?
        - re-enter new username
      - connect to password
        - In local level game
          - uses info to grab: win count & lose count
        - In comp level game
          - uses info to grab: win count & lose count


  Maybe add tutorial
*/

function App() {
 

  return (
    <main className='App'>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Authorization></Authorization>
   

    </main>
  );
}

export default App;