import axios from "axios";
import { useEffect, useState } from "react";

export function useItems(query) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getItems(query) {
      setLoading(true);
      const response = await axios.get(
        `http://0.0.0.0:3001/api/items?q=${query}`
      );
      setLoading(false);
      setItems(response.data);
      if (response.status >= 400) {
        setLoading(false);
        setError({ code: response.status, message: response.statusText });
      }
    }
    getItems(query);
  }, [query]);
  return [items, loading, error];
}
