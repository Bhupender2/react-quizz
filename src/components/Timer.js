import { useEffect } from "react";

export default function Timer() {
  useEffect(() => {
    setInterval(() => { //basically setInterval is part of Browser Web API so we are interacting with the world outside of the scope of the component (outside of the reract universe)
      console.log("ticks");
    }, 1000);
  }, []);
  return <div className="timer">Timer</div>;
}
