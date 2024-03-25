export default function FinishScreen({ points, totalPoints }) {
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage < 100 && percentage >= 80) emoji = "🎉";
  if (percentage < 80 && percentage >= 50) emoji = "🤔";
  if (percentage < 50 && percentage > 0) emoji = "😢";
  if (percentage === 0) emoji = "🤦";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You have scored <strong>{points}</strong> out of{" "}
        {totalPoints} {Math.ceil(percentage)} %
      </p>
      <p className="highscore"></p>
    </>
  );
}
