import { useEffect } from "react";

//TODO -Managing timer using use reducer (in the app.js) instead of useState
export default function Timer({ dispatch, secondRemaining }) {
  const mins= Math.floor(secondRemaining/60);
  const secs=secondRemaining%60
  useEffect(() => {  
    const intervalId = setInterval(() => {
      //basically setInterval is part of Browser Web API so we are interacting with the world outside of the scope of the component (outside of the react universe)

      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
  return <div className="timer">{mins<10 && "0"}{mins}:{secs<10 && "0"}{secs}</div>;

  // TODO - 2nd way of doing it (not recommended bcoz we like to centralise all the state updating logic in reducer function and here we are managing state using UseState rather than USEReducer )

  // export default function Timer({dispatch}) {
  //   const [timer, setTimer] = useState(300);
  //   useEffect(() => {
  //    const intervalId= setInterval(() => {
  //       //basically setInterval is part of Browser Web API so we are interacting with the world outside of the scope of the component (outside of the reract universe)
  //       setTimer((timer) => {
  //         return timer - 1
  //       });
  //     }, 1000)
  //     if(timer===0) return dispatch({type:"timeout"})

  //     return ()=>{
  //       clearInterval(intervalId)
  //     }
  //   }, [timer]);
  //   return <div className="timer">{timer}</div>;
}
