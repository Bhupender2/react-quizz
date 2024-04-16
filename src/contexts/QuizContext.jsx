import { createContext, useContext } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of QuizProvider");
}
export { QuizProvider, useQuiz };

// this is the boiler plate code for costum context hooks so that we can use this where ever we want