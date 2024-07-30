export const formatDateString = (
  dateString: string,
  format: string = "yyyy/MM/dd"
): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date");
    return "";
  }

  const pad = (number: number): string => {
    return number < 10 ? "0" + number : number.toString();
  };

  const map: { [key: string]: string } = {
    yyyy: date.getFullYear().toString(),
    MM: pad(date.getMonth() + 1),
    dd: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  };

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (matched) => map[matched]);
};
