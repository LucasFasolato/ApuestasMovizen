import {React, useState, useEffect} from 'react'
import './ApHomePage.css';

function ApHomePage() {
    
    const [validateB, setValidateB] = useState (true);
    const [inputNumber, setInputNumber] = useState("");
    const [number1, setNumber1] = useState(1);
    const [number2, setNumber2] = useState(1);

    function validateNumber () {
        if(inputNumber === "") {
            setValidateB(true);
        } else if(parseInt(inputNumber) <= 12) {
            setValidateB(false);
        } else {
            setValidateB(true);
        }
    }

    function generateNumbers() {
        setNumber1(getRandomNumber(1,12));
        setNumber2(getRandomNumber(1,12));
    }

    function getRandomNumber(min, max) {
        return Math.trunc(Math.random() * (max - min) + min) ;
      }

      useEffect(() => {
        console.log(inputNumber);
        validateNumber(inputNumber);
      }, [inputNumber]);

  return (
    <div className='home_size'>
        <div className='content_box'>
            <h1>Juego de apuestas</h1>
            <section className='generation_apuesta'>
                {/* onChange={(event) => {setInputNumber(event.target.value); validateNumber(); console.log(inputNumber)} } */}
                <input className='input_box' id='inputNumber' onChange={(event) => setInputNumber(event.target.value)}  placeholder='Ingrese un numero del 1 al 12'/>
                <button className='button_box' disabled={validateB} onClick={()=> generateNumbers()}>Jugar</button>
            </section>
            
            <section className='result_apuesta'>
                <h2>Su apuesta es: {inputNumber}</h2>
                <div className='randoms_numbers'>
                    <h2>Los numeros obtenidos en los dados fueron:</h2>
                    <div className='results'>
                    <p id='n1'>{number1}</p>
                    <p id='n2'>{number2}</p>
                    </div>
                </div>
            </section>
            
        </div>
    </div>
    

  );
}

export default ApHomePage;
