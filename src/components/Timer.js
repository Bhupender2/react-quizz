import { useEffect, useState } from "react";

export default function Timer({dispatch}) {
  const [timer, setTimer] = useState(10);
  useEffect(() => {
   const intervalId= setInterval(() => {
      //basically setInterval is part of Browser Web API so we are interacting with the world outside of the scope of the component (outside of the reract universe)
      setTimer((timer) => {
        return timer - 1
      });
    }, 1000)
    if(timer===0) return dispatch({type:"timeout"})

    return ()=>{
      clearInterval(intervalId)
    }
  }, [timer]);
  return <div className="timer">{timer}</div>;
}
