export default function FinishScreen({ points, totalPoints }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <p>
      You have scored <strong>{points}</strong>out of{totalPoints} {percentage} %
    </p>
  );
}
