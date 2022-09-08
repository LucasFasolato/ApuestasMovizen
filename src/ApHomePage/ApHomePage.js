import {React, useState} from 'react'
import './ApHomePage.css';

function ApHomePage() {
    
    const [validateB, setValidateB] = useState (true);
    const [inputNumber, setInputNumber] = useState("");
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();

    function validateNumber () {
        if (parseInt(inputNumber) <= 12) {
            setValidateB(false);
        } else {
            setValidateB(true);
        }
    }

    function generateNumbers () {
        setNumber1(Math.random* (12 - 1 + 1) + 1);
        setNumber2(Math.random* (12 - 1 + 1) + 1);
        document.getElementById('n1').innerHTML( String(number1));
        document.getElementById('n2').innerHTML( String(number2));
    }


  return (
    <div className='home_size'>
        <div>
            <h1>Juego de apuestas</h1>
            <input id='inputNumber' onChange={(event) => {setInputNumber(event.target.value); validateNumber(); console.log(inputNumber)} } placeholder='Ingrese un numero del 1 al 12'/>
        </div>
      <button id='button_jugar' disabled={validateB} onClick={()=> generateNumbers()}>Jugar</button>
      <div className='randoms_numbers'>
        <h2>Los numeros obtenidos en los dados fueron:</h2>
        <p id='n1'></p>
        <p id='n2'></p>
      </div>
    </div>
    

  );
}

export default ApHomePage;
