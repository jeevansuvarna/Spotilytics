export const converToMin = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return formatted;
};
