import {React, useState, useEffect} from 'react'
import './ApHomePage.css';

function ApHomePage() {
    
    const [validateB, setValidateB] = useState (true);
    const [bandera, setBandera] = useState (true);
    const [inputNumber, setInputNumber] = useState("");
    const [saldo, setSaldo] = useState(10);
    const [apuestaValue, setApuestaValue] = useState("");
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();
    const [resultado, setResultado] = useState("");
    // const [historial, setHistorial] = useState([{
    //     estado: "", apuesta:"", saldo:"", ganancia:"", saldofinal:"" 
    // }]);
    let [wmaxCont, setWmaxCont] = useState(0);
    let [wminCont, setWminCont] = useState(0);
    let [loseCont, setLoseCont] = useState(0);
    const [historial, setHistorial] = useState([]);

    function validateNumber () {
        if((parseInt(inputNumber) <= 12) && (parseInt(inputNumber) > 0) && (apuestaValue !== "")) return setValidateB(false);
        return setValidateB(true);
    }

    function validateApuesta () {
        let diferencia = saldo - apuestaValue;
        if((apuestaValue === "") || (diferencia < 0) || (saldo === 0)) setValidateB(true);
    }

    function validateResult () {
        let sumaDados = number1+number2;
        if(number1==null){
            setResultado("");
        } else if(sumaDados === parseInt(inputNumber)) {
            setResultado("Felicitaciones!! Premio mayor. Sumas apuesta X3.");
            setHistorial([...historial, `Ganaste  - Apuesta: $${apuestaValue} - Saldo: ${saldo} + ${apuestaValue*3}`])
            setWmaxCont(wmaxCont+1);
            setSaldo(saldo+apuestaValue*3);
        } else if((number1 === parseInt(inputNumber)) || (number2 === parseInt(inputNumber)))
        {
            setResultado(`Felicitaciones! Una coincidencia. Sumas ${apuestaValue*2} a tu saldo.`);
            setHistorial([...historial, `Ganaste  - Apuesta: $${apuestaValue} - Saldo: ${saldo} + ${apuestaValue*2}`])
            setSaldo(saldo+apuestaValue*2);
            setWminCont(wminCont+1);
        } else {
            if(number1!=null)
            setHistorial([...historial, `Perdiste - Apuesta: $${apuestaValue} - Saldo: ${saldo}`])
            setResultado("Perdiste");
            setLoseCont(loseCont+1);
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
        saldo === 0 ? setValidateB(true) : setSaldo(saldo-apuestaValue);setBandera(!bandera);
    }

    function checkValue () {
        if(saldo - apuestaValue >= 0) {
            generateNumbers(); 
            updateSaldo()
        } else {
            alert("SALDO INSUFICIENTE");
            setValidateB(true);
        }

    }

    useEffect(() => {
        validateNumber(inputNumber);
        validateApuesta(apuestaValue);
    }, [inputNumber, apuestaValue, resultado]);

    useEffect(() => {
        validateResult();
        console.log(historial);
    }, [bandera]);

    return (
    <div className='home_size'>
        <h1 className='title_h1'>SISTEMA DE APUESTAS</h1>
        <div className='content_box'>
            <section className='generation_apuesta'>
                <div className='saldo_histo_content'>
                    <h2 className='saldo'>SALDO: ${saldo}</h2>
                    <div>
                        <h2 className='histoCont'>HISTORIAL DE APUESTAS: </h2>
                        <h3 className='histoCont'>Premio máximo: {wmaxCont} | Premio mínimo: {wminCont} | Pérdidas: {loseCont}</h3>
                    </div>    
                </div>
                <div className='inputs_content'>
                    <div className='apuesta_content'>
                        <h3 className='apuesta_h3'>Número a apostar</h3>
                        <input className='input_box' id='inputNumber' onChange={(event) => setInputNumber(event.target.value)}  placeholder='Ingrese un numero del 1 al 12'/>
                    </div>
                    <div className='apuesta_content'>
                        <h3 className='apuesta_h3'>Apuesta en pesos</h3>
                        <input className='input_box' id='apuestavalue' onChange={(event) => setApuestaValue(event.target.value)}  placeholder='Valor de su apuesta en $'/>
                    </div>
                    <div className='button_content'>
                        <button className='button_box' disabled={validateB} onClick={()=> checkValue () }>Jugar</button>
                    </div>
                </div>
            </section>
            
            <section className='result_apuesta'>
                <div className='result_apuesta_content'>
                    <h2 className='apuesta_res'>SU APUESTA ES: {inputNumber}</h2>
                    <div className='randoms_numbers'>
                        <h2 className='res_dados'>Los numeros obtenidos en los dados fueron:</h2>
                        <div className='results'>
                            <div className='result_box'>
                                <p id='n1'>{number1}</p>
                            </div>
                            <div className='result_box'>
                                <p id='n2'>{number2}</p>
                            </div>
                        </div>
                    </div>
                    <h2 className='res_dados'>{resultado}</h2>
                    
                </div>
                <div className='historial_result_content'>
                    <h2 className='apuesta_res'>HISTORIAL</h2>
                    <div className='historial_result'>
                        {historial &&
                            historial.map(histo => {
                                return (
                                    <div className='histo_result'>
                                        {histo}
                                    </div>
                                )
                        })}
                    </div>
                </div>
                
                
            </section>
            
        </div>
    </div>
  );
}

export default ApHomePage;
