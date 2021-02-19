import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Timer.css";

function Timer() {
  let [seconds, setSeconds] = useState(0.0);
  let [minutes, setminutes] = useState(0);
  const timerRef = useRef(null);
  let [start, setStart] = useState(true);
  let [stop, setStop] = useState(false);
  let [restart, setRestart] = useState(false);
  let [testArray, setTestArray] = useState([]);
  let test2;
  let count=0;
  function handleStart() {
    setStart(false);
    setStop(true);
    setRestart(true);
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => {
        return seconds + 0.1;
      });
    }, 100);
  }
  function handleStop() {
    clearInterval(timerRef.current);
    setStart(true);
    setStop(false);
    setRestart(true);
    setTestArray(
      (prev) =>
        (testArray = [...prev, { min: minutes, sec: seconds.toFixed(2) }])
    );
  }
  function handleRestart() {
    clearInterval(timerRef.current);
    setStart(true);
    setStop(false);
    setRestart(false);
    setSeconds(0);
    setminutes(0);
    setTestArray(
      (prev) =>
        (testArray = [...prev, { min: minutes, sec: seconds.toFixed(2) }])
    );
  }
  function handleDelete(i) {
    const arr= testArray.map((val,index)=>index===i?{min:"",sec:""}:val);
    setTestArray(arr);
  }
  for (let index = 0; index < testArray.length; index++) {
    if(testArray[index].min!==""&&testArray[index].sec!==""){
        count=1;
    }      
  }
  test2 = testArray.map((value, index) => (
    <div key={index}>{value.min!==""&&value.sec!==""&&
    <div  className="row ">
      <div className="col-md-10 col-8 p-1 text-center values">
        <span >
          {value.min}:{value.sec}
        </span>
      </div>
      <div className="col-md-2 col-4 p-1">
        <button
          className="btn btn-info w-100 rembtn p-3"
          onClick={()=>handleDelete(index)}
        >
          Remove
        </button>
      </div>
    </div>}
    </div>
  ));
  return (
    <div className="container p-2">
      <div className="row  border mt-4">
        <div className="col-12 bg-dark text-light">
          <div className="row p-2">
            <div
              className={
                count > 0
                  ? "col-12 p-2 mb-1 text-center halfcolstyle"
                  : "col-12 p-2 mb-1 text-center colstyle"
              }
            >
              <div className="timerShow p-2">
                <span>
                  {seconds < 60
                    ? minutes
                    : setminutes((minutes) => minutes + 1)}
                  :{seconds < 60 ? seconds.toFixed(2) : setSeconds(0)}
                </span>
              </div>
              <div>
                {start && (
                  <button
                    className={
                      start && restart
                        ? "btn btn-md btn-light mt-2 mb-2 halfstart"
                        : "btn btn-md btn-light mt-2 mb-2 start"
                    }
                    onClick={handleStart}
                  >
                    Start
                  </button>
                )}
                {stop && (
                  <button
                    className="btn btn-md btn-light mt-2 mb-2 stop"
                    onClick={handleStop}
                  >
                    Stop
                  </button>
                )}
                {restart && (
                  <button
                    className="btn btn-md btn-light mt-2 mb-2 restart"
                    onClick={handleRestart}
                  >
                    Restart
                  </button>
                )}
              </div>
            </div>
            {count>0 && (
              <div className="col-12 p-4  delcolstyle">
                <div className="recordedValues">{test2}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Timer;