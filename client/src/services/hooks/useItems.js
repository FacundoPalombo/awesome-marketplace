import axios from "axios";
import { useEffect, useState } from "react";

export function useItems(query) {
  const [items, setItems] = useState({ items: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getItems(query) {
      setItems({ items: [], categories: [] });
      setError(null);
      setLoading(true);
      await axios
        .get(`http://0.0.0.0:3001/api/items?q=${query}`)
        .then((response) => {
          const { data } = response;
          const items = response.data.items.map((item) => ({
            ...item,
            price: item.price.toLocaleString(),
          }));

          const dataSanitized = { ...data, ...{ items } };
          setLoading(false);
          setItems(dataSanitized);
        })
        .catch((err) => {
          setLoading(false);
          setError({
            code: err.response.status,
            message: err.response.statusText,
          });
        });
    }
    getItems(query);
  }, [query]);
  return [items, loading, error];
}
