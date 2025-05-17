export const formateDistanceFromNow = (date) => {
  const today = new Date();
  const diff =
    Math.abs(new Date(date).getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);
  console.log(diff);

  if (diff > 0 && diff < 1) {
    return "Today";
  } else if (diff >= 1 && diff < 2) {
    return "Yesterday";
  } else {
    return `${Math.trunc(diff)} days ago`;
  }
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


