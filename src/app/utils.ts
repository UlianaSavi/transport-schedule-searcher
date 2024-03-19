export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month = String(tomorrow.getMonth() + 1).length
    === 1 ? String(`0${tomorrow.getMonth() + 1}`) : String(tomorrow.getMonth() + 1);
  return `${tomorrow.getFullYear()}-${month}-${tomorrow.getDate()}`;
}
