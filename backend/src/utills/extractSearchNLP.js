import nlp from "compromise";

export const exractSearchData = (query) => {
  const doc = nlp(query.toLowerCase());

  return {
    price: doc.match("#Value #Currency").out("array"),
    name: doc.nouns().out("array"),
    description: doc.adjectives().out("array"),
    discount: doc.has("discount") ? true : false,
  };
};
