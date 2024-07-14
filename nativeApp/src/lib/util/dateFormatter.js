export const formatDate = (stringDate) => {
  const date = new Date(stringDate);
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
};
