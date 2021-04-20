import axios from "axios";
import { useEffect, useState } from "react";

export function useItem(id) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getItem(id) {
      setItem({});
      setError(null);
      setLoading(true);
      await axios
        .get(`http://0.0.0.0:3001/api/item/${id}`)
        .then((response) => {
          let priceFormatted = response.data.item.price.toLocaleString("es-AR");
          setLoading(false);
          setItem({ ...response.data.item, ...{ price: priceFormatted } });
        })
        .catch((err) => {
          setLoading(false);
          setError({
            code: err.response.status,
            message: err.response.statusText,
          });
        });
    }
    getItem(id);
  }, [id]);
  return [item, loading, error];
}
