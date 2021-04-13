const item = {
  author: { name: "string", lastname: "string" },
  item: {
    id: "string",
    title: "string",
    price: { currency: "string", amount: "number", decimals: "number" },
    picture: "string",
    condition: "string",
    free_shipping: "boolean",
    sold_quantity: "number",
    description: "string",
  },
};

// TODO: Question. items schema, in items array, can use the item schema like:
/*
const items = {
  author: { name: "string", lastname: "string" },
  categories: ["string"],
  items: [item[]]
}
*/

const items = {
  author: { name: "string", lastname: "string" },
  categories: ["string"],
  items: [
    {
      id: "string",
      title: "string",
      price: { currency: "string", amount: "number", decimals: "number" },
      picture: "string",
      condition: "string",
      free_shipping: "boolean",
      sold_quantity: "number",
      description: "string",
    },
  ],
};
