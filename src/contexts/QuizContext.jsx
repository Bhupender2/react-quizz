import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished",
  status: "loading",
  index: 0, // creating an index state for the current element beacuse on changing the index of element the UI will re-render .
  answer: null, // basically store which option is selected or we can say what is the answer (index no of the Options ARRAY)
  points: 0, //this needs to be updated on the screen so it will store as states
  highscore: 0, // setting the initial state of highScore to 0
  secondRemaining: null, // total time for the Timer .
};

const SECS_PER_QUESTIONS = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }; // data is received

    case "dataFailed":
      return { ...state, status: "error" }; // when the data fetching is  failed

    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };

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
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        highscore: 0,
        points: 0,
        status: "ready",
      };
    // return{...initialState, questions:state.questions, status:"ready"}
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown"); // is no other cases match then it throw this error
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState); // to display data in the Ui we need state (we are using useReducer )
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of QuizProvider");
    return context
}
export { QuizProvider, useQuiz };

// this is the boiler plate code for costum context hooks so that we can use this where ever we want
