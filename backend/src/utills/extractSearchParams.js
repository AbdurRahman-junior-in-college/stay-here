export const extractSearchParams = (query) => {
  let matchName = query.match(/name(?:d)? (\w+)/i);
  let maxGuestMatch = query.match(/max(?:imum)? (\d+) guest(?:s)?/i);
  let maxPriceMatch = query.match(/(?:under|below|max|min price of) \$?(\d+)/i);
  let discountMatch = query.match(/have discount /i);

  return {
    name: matchName ? matchName[1] : null,
    maxCapacity: maxGuestMatch ? Number(maxGuestMatch[1]) : null,
    regularPrice: maxPriceMatch ? Number(maxPriceMatch[1]) : null,
    discount: discountMatch ? true : false,
  };
};
