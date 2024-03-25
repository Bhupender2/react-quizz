import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";

const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished",
  status: "loading",
  index: 0, // creating an index state for the current element beacuse on changing the index of element the UI will re-render .
  answer: null, // basically store which option is selected or we can say what is the answer (index no of the Options ARRAY)
  points: 0, //this needs to be updated on the screen so it will store as states
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
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished" };

    default:
      throw new Error("Action unknown"); // is no other cases match then it throw this error
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  ); // to display data in the Ui we need state (we are using useReducer )
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

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
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} totalPoints={totalPoints} />
        )}
      </Main>
    </div>
  );
}

// we added a scripts in package.json to render the fake api data  "server":"json-server --watch data/questions.json --port 9000 --host localhost"
