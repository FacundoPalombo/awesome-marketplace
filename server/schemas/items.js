const author = { author: { name: "string", lastname: "string" } };

const price = {
  price: { currency: "string", amount: "number", decimals: "number" },
};

const item = {
  author: author,
  item: {
    id: "string",
    title: "string",
    price: price,
    picture: "string",
    condition: "string",
    free_shipping: "boolean",
    sold_quantity: "number",
    description: "string",
  },
};

const items = {
  author: author,
  categories: ["string"],
  items: [
    {
      id: "string",
      title: "string",
      price: price,
      picture: "string",
      condition: "string",
      free_shipping: "boolean",
      sold_quantity: "number",
      description: "string",
    },
  ],
};

const Schemas = Object.freeze({ author, price, item, items });
module.exports = Schemas;
