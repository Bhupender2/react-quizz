export default function Progress({
  index,
  numQuestions,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      {/* this is one of the trickiest thing ..value attribute is increasing on clicking the option (which will store in answer variable) but jab hum click karenge next button pe toh index ki value +1 se increase ho jaaegi or answer phirse null ho jaaega ..so isliye progress bar same rahega coz ek baar answer ka +1 add hora h ..but next button pe click karte time answer null hojaara h but ussi time pe index ka +1 add hoga isliye progress bar same rahega  */}
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} Points
      </p>
    </header>
  );
}
