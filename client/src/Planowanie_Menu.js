import React, { useState } from 'react';
const Planowanie_Menu = () => {
    const [check, setcheck] = useState(true);
    const currentYear = new Date().getFullYear();
    const [inputDay, setinputDay] = useState('');
    const [inputMonth, setinputMonth] = useState('');
    const [inputYear, setinputYear] = useState('');
    const [inputGodz, setinputGodz] = useState('');
    const [inputMin, setinputMin] = useState('');
    const [output, setoutput] = useState('');
    const handleInputChangeDay = (event) => {
      setinputDay(event.target.value);
    };
    const handleInputChangeMonth = (event) => {
      setinputMonth(event.target.value);
    };
    const handleInputChangeYear = (event) => {
      setinputYear(event.target.value);
    };
    const handleInputChangeGodz = (event) => {
      setinputGodz(event.target.value);
    };
    const handleInputChangeMin = (event) => {
      setinputMin(event.target.value);
    };

    const handleButtonClick = () => {
      setcheck(true);
      if(inputDay<1 || inputDay >31){
        setcheck(false);
      }
      if(inputMonth<1 || inputMonth>12){
        setcheck(false);
      }
       if(inputYear !== currentYear  || inputYear !== currentYear+1){
         setcheck(false);
       }
      if(inputGodz<0 || inputGodz>23){
        setcheck(false);
      }
      if(inputMin<0 || inputMin>59){
        setcheck(false);
      }
      console.log(check);
      setoutput('Ustawiles konsultacje na '+{inputDay}+":"+{inputMonth}+":"+{inputYear}+" na godzine "+{inputGodz}+":"+{inputMin});
      //  if(check){
      //   setoutput('Ustawiles konsultacje na '+{inputDay}+":"+{inputMonth}+":"+{inputYear}+" na godzine "+{inputGodz}+":"+{inputMin});
      //  }
      //  else{
      //    setoutput("Jedna z danych w terminie jest nieprawidłowa proszę sprawdzić i spróbować ponownie");
      //  }
    };
    

    
    return ( 
        <div className="PM">
            <h2>Zaplanuj</h2>
            <h2>wydarzenie</h2>
            <input type='number' placeholder='DD' name='Day' value={inputDay} onChange={handleInputChangeDay}></input>
            <input placeholder='MM' name='Month' value={inputMonth} onChange={handleInputChangeMonth}></input>
            <input placeholder='YY' name='Year' value={inputYear} onChange={handleInputChangeYear}></input>
            <input placeholder='Godz' name='Godz' value={inputGodz} onChange={handleInputChangeGodz}></input>
            <input placeholder='Min' name='Min' value={inputMin} onChange={handleInputChangeMin}></input>
            <button onClick={handleButtonClick}>Submit</button>
            <p>Output: {output}</p>
        </div>
     );
}
 
export default Planowanie_Menu;