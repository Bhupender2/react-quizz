import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";

const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished",
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }; // data is received

    case "dataFailed":
      return { ...state, status: "error" }; // when the data fetching is  failed

    default:
      throw new Error("Action unknown"); // is no other cases match then it throw this error
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // to display data in the Ui we need state (we are using useReducer )

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); // want to render data ONLY on mount

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>question </p>
      </Main>
    </div>
  );
}

// we added a scripts in package.json to render the fake api data  "server":"json-server --watch data/questions.json --port 8000"
