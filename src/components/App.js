import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished",
  status: "loading",
  index: 0, // creating an index state for the current element beacuse on changing the index of element the UI will re-render .
  answer: null, // basically store which option is selected or we can say what is the answer (index no of the Options ARRAY)
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }; // data is received

    case "dataFailed":
      return { ...state, status: "error" }; // when the data fetching is  failed

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      return { ...state, answer: action.payload };

    default:
      throw new Error("Action unknown"); // is no other cases match then it throw this error
  }
}

export default function App() {
  const [{ questions, status, index , answer }, dispatch] = useReducer(
    reducer,
    initialState
  ); // to display data in the Ui we need state (we are using useReducer )
  const numQuestions = questions.length;

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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={questions[index]} answer={answer} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

// we added a scripts in package.json to render the fake api data  "server":"json-server --watch data/questions.json --port 9000 --host localhost"