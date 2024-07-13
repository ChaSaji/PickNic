export const getScoreMessage = (score) => {
  if (score <= 29) return "まだまだ~";
  if (score <= 59) return "おしい!";
  if (score <= 79) return "素晴らしい!";
  if (score <= 89) return "プロレベル!";
  if (score <= 100) return "完璧!!!";
};
