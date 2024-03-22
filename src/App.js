import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";

const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished",
  status: "loading",
};

function reducer(state, action){
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // to display data in the Ui we need state

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("ERROR"));
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
