import { useState, useRef, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

const DateRange = ({ value, setValue }) => {
    const [isDateRangePickerOpen, setDateRangePickerOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const tooltipRef = useRef(null);

    const toggleDateRangePicker = () => {
        setDateRangePickerOpen((prev) => !prev);
    };

    const handleSelect = (ranges) => {

        const start_date = format(ranges.selection.startDate, 'yyyy-MM-dd')
        const end_date = format(ranges.selection.endDate, 'yyyy-MM-dd')
        setValue(`${start_date} - ${end_date}`)
        setSelectedRange(ranges.selection);
    };

    const handleClickOutside = (event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
            setDateRangePickerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full relative">
            <label htmlFor="dateRange" className='font-semibold'>Select Date Range</label>
            <input
                onClick={toggleDateRangePicker}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="font-semibold w-full border border-black px-2.5 py-1.5"
            />

            {isDateRangePickerOpen && (
                <div
                    ref={tooltipRef}
                    className="absolute top-16 left-0 z-10 border border-gray-300 bg-white p-4 shadow-md"
                >
                    <DateRangePicker ranges={[selectedRange]} onChange={handleSelect} className='overflow-auto' />
                </div>
            )}
        </div>
    );
};

export default DateRange;
