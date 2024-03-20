export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month = String(tomorrow.getMonth() + 1).length
    === 1 ? String(`0${tomorrow.getMonth() + 1}`) : String(tomorrow.getMonth() + 1);
  return `${tomorrow.getFullYear()}-${month}-${tomorrow.getDate()}`;
}

export const changeDate = (date: string) => {
  const minutes = String(new Date(date).getUTCMinutes()).length
    === 1 ? `0${new Date(date).getUTCMinutes()}` : new Date(date).getUTCMinutes();
  return `${new Date(date).getUTCHours() - 1}:${minutes}`
};
