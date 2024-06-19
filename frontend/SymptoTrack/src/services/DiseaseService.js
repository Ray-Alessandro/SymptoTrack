import { useState, useEffect } from 'react';

const getSymptoms = (symptoms) => {
  console.log(symptoms);
  return {
    symptoms: symptoms.map(symptom => ({ name: symptom }))
  };
};

const DiseaseService = (symptoms) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = 'http://127.0.0.1:8000/disease';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getSymptoms(symptoms)),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching diseases:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (symptoms.length > 0) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [symptoms]);

  return { data, loading };
};

export default DiseaseService;
