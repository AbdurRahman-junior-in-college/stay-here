export const formateDistanceFromNow = (date) => {
  const today = new Date();

  const diff = date.getDay() - today.getDay();

  return `${diff > 1 ? `${diff} Ds` : `${diff} D`} ago `;
};

export const formatDate = (date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[month]} ${day} ${year} `;
};

export const isToday = (date) => {
  const today = new Date();

  if (today.getDay() === date.getDay()) return true;
  else return false;
};
