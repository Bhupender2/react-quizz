import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return; // so if answer= null then it will not show the next button basically
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
