import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Calendar</h2>
      <div className="flex items-center">
        <Calendar className="mr-2" size={20} />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;