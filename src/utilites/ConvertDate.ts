const convertDate = (date: string) => {
  const time = new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return time;
};

export default convertDate;
