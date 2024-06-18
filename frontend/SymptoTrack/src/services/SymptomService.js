import { useState, useEffect } from 'react';

export function SymptomService() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/symptoms')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data is OK:', data);
        setData(data);  // Aquí asumes que `data` es un array de objetos con la propiedad `name`
      })
      .catch(error => {
        console.error('Error fetching symptoms:', error);
        setData([]);  // Manejo de errores, por ejemplo, establecer data como un array vacío
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log('Data:', data);

  return { data, loading };
}
