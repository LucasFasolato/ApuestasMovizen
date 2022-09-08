import {React, useState, useEffect} from 'react'
// import './ApHomePage.css';

function ApHomePage() {
    
    const [validateB, setValidateB] = useState (true);
    const [bandera, setBandera] = useState (true);
    const [inputNumber, setInputNumber] = useState("");
    const [saldo, setSaldo] = useState(10);
    const [apuestaValue, setApuestaValue] = useState("");
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();
    const [resultado, setResultado] = useState("");

    function validateNumber () {
        if(inputNumber === "") {
            setValidateB(true);
        } else if((parseInt(inputNumber) <= 12) && (apuestaValue !== "")) {
            setValidateB(false);
        } else {
            setValidateB(true);
        }
    }

    function validateApuesta () {
        let diferencia = saldo - apuestaValue;
        if(apuestaValue === "") {
            setValidateB(true);
        }
        if (diferencia < 0) {
            setValidateB(true);
        }
    }

    function validateResult () {
        let sumaDados = number1+number2;
        if(sumaDados === parseInt(inputNumber)) {
            setResultado("Felicitaciones, ganaste el mayor premio. Sumas apuesta X3 a tu saldo.");
            setSaldo(saldo+apuestaValue*3);
        } else if((number1 === parseInt(inputNumber)) || (number2 === parseInt(inputNumber)))
        {
            setResultado(`Felicitaciones, Coincidio uno de los numeros. Sumas ${apuestaValue*2} a tu saldo.`);
            setSaldo(saldo+apuestaValue*2);
        } else {
            if(number1!=null)
            setResultado("Perdiste");
        }
    }
    
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * max + min) ;
    }

    function generateNumbers() {
        setNumber1(getRandomNumber(1,6));
        setNumber2(getRandomNumber(1,6));
    }

    function updateSaldo () {
        setSaldo(saldo-apuestaValue);
        setBandera(!bandera)
    }

    useEffect(() => {
        validateNumber(inputNumber);
        validateApuesta(apuestaValue);
    }, [inputNumber, apuestaValue, resultado]);

    useEffect(() => {
        validateResult();
    }, [bandera]);

    return (
    <div className='home_size'>
        <div className='content_box'>
            <h1>Juego de apuestas</h1>
            <section className='generation_apuesta'>
                <h2>Saldo: {saldo}</h2>
                <input className='input_box' id='inputNumber' onChange={(event) => setInputNumber(event.target.value)}  placeholder='Ingrese un numero del 1 al 12'/>
                <input className='apuesta_box' id='apuestavalue' onChange={(event) => setApuestaValue(event.target.value)}  placeholder='Valor de su apuesta en $'/>
                <button className='button_box' disabled={validateB} onClick={()=> {generateNumbers(); updateSaldo()}}>Jugar</button>
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
                <h2>{resultado}</h2>
            </section>
        </div>
    </div>
  );
}

export default ApHomePage;
