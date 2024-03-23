import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  // reducer function will take current state and actions as an argument and return a new state
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep": 
      return { ...state, step: action.payload };
    default:
      throw new Error("Unknown Error");
  }
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState); // this is use Reducer it takes reducer function and intial state value as an argument and return current state and dispatch function as a result and usually the initial state going to be an object not a single value beacuse we use useReducer to handle more complex value rather than a single value
  const { count, step } = state; // and now destructing it

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" }); // dispatch function is used to dispatch actions
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) }); // this is the standard way of writing action and here payload is optional basicallly we can shape action object in whatever way we want but this is the standard way
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {};

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
