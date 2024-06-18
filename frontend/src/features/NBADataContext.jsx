import { createContext, useState, useEffect } from 'react';

const NBADataContext = createContext();

const NBADataProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date())


  const fetchScores = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/scores?date=${date}`);
      const data = await response.json();
      setScores(data);
    } catch (error) {
      setScores([])
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const date = selectedDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
    fetchScores(date);
  }, [selectedDate]);

  return (
    <NBADataContext.Provider value={{ scores, loading, setSelectedDate }}>
      {children}
    </NBADataContext.Provider>
  );
};

export { NBADataContext, NBADataProvider };
