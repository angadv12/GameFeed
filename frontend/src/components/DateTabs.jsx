// DateTabs.jsx
import { useState, useEffect, useContext, useRef } from 'react';
import { NBADataContext } from '../features/NBADataContext';

const DateTabs = () => {
  const { setSelectedDate } = useContext(NBADataContext);
  const [ activeDate, setActiveDate ] = useState(new Date());
  const containerRef = useRef(null);

  // YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
  };

  const handleDateClick = (date) => {
    setActiveDate(date);
    setSelectedDate(date);
  };

  // Generate dates for tabs, past and future 14 days
  const generateDates = () => {
    const dates = [];
    for (let i = -14; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {

    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('.border-blue-500');
      if (activeElement) {
        containerRef.current.scrollLeft = activeElement.offsetLeft - containerRef.current.offsetWidth / 2 + activeElement.offsetWidth / 2;
      }
    }

    setSelectedDate(activeDate);
  }, []);

  return (
    <div className="overflow-x-auto whitespace-nowrap ml-5 mb-5">
      {dates.map((date, index) => (
        <button
          key={index}
          className={` bg-bgNavbar inline-block py-2 px-4 h-20 mx-1 rounded text-white ${formatDate(date) === formatDate(activeDate) && 'border-2 border-red-500'}`}
          onClick={() => handleDateClick(date)}
        >
          {date.toLocaleDateString('en-US')}
        </button>
      ))}
    </div>
  );
};

export default DateTabs;
