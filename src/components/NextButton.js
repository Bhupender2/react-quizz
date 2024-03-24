export default function NextButton({ dispatch, answer }) {
  if (answer === null) return; // so if answer= null then it will not show the next button basically
  return <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>;
}
