const getCurrentFormattedDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0"); // Day: 01
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month: 09
  const year = date.getFullYear(); // Year: 2022

  let hours = date.getHours(); // Hour: 9 or 21
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minute: 41
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert 0 -> 12
  const hourStr = String(hours).padStart(2, "0"); // Pad hour

  return `${day}-${month}-${year} ${hourStr}:${minutes}${ampm}`;
};

export { getCurrentFormattedDate };
