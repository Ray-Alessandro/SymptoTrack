import { useState, useEffect } from 'react';

const SymptomService = () => {
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
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching symptoms:', error);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export default SymptomService;