const convertDate = (date) => {
  const time = new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return time;
};

export default convertDate;
