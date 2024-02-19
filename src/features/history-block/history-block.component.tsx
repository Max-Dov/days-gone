import React, { useState } from 'react';
import './history-block.styles.scss';
import { Day } from '@types';
import classNames from 'classnames';

interface HistoryBlockProps {
  days: Day[];
  daysToDisplay: number;
}

const getFormatDate = (date: Date): string => `${date.getDate()} ${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`;

const getContrastValue = (value: number | undefined, maxValue: number): string | undefined => {
  if (value) {
    return `${value / maxValue * 80 + 20}`;
  } 
};

const getMonthNameOfWeek = (week: Array<string>): string => {
  return week
    .map(day => new Date(day).toLocaleString('en-us', { month: 'short' }))[week.length - 1];
};

const getMonthYear = (month: { name: string, weeks: Array<Array<string>> }): string => {
  const firstWeek = month.weeks[0];

  for (let i = 0; i < firstWeek.length; i++) {
    const date = new Date(firstWeek[i]);

    if (date.toLocaleString('en-us', { month: 'short' }) === month.name) {
      return date.getFullYear().toString();
    }
  }

  return '';
};

export const HistoryBlock = ({ days, daysToDisplay }: HistoryBlockProps) => {
  const [hoveredMonth, setHoveredMonth] = useState<{ month: string, year: string } | null>(null);

  const handleMouseEnterMonthEl = (month: string, year: string) => {
    setHoveredMonth({ month, year });
  };
  const handleMouseLeaveMonthEl = () => {
    setHoveredMonth(null);
  }

  const msInDay = 24 * 60 * 60 * 1000;
  const lastDay: number = new Date(getFormatDate(new Date())).getTime() - daysToDisplay * msInDay;
  const currentDay: number = new Date(getFormatDate(new Date())).getTime();
  const daysOfYear: Array<string> = [];
  const daysMap = new Map<string, Day>();

  const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks: Array<Array<string>> = [[]];
  const months: { name: string, year: string, weeks: Array<Array<string>> }[] = [];
  let week: Array<string> = weeks[0];

  for (let i = lastDay; i < currentDay; i += msInDay) {
    const temp = getFormatDate(new Date(i));
    daysOfYear.push(temp);
  }

  days.map(el => {
    daysMap.set(getFormatDate(new Date(el.date)), el)
  });

  daysOfYear.forEach(dayOfYear => {
    const dayOfWeek = new Date(dayOfYear).getDay();

    week.push(dayOfYear);

    if (dayOfWeek === 0) {
      week = [];
      weeks.push(week);
    }
  });

  for (let i = 0, month: { name: string, year: string, weeks: Array<Array<string>> } | null = null; i < weeks.length; i++) {
    const week = weeks[i];

    const monthName = getMonthNameOfWeek(week);

    if (!month) {
      month = {
        name: monthName,
        year: '',
        weeks: []
      };

      months.push(month);
    }

    if (month.name !== monthName) {
      month = {
        name: monthName,
        year: '',
        weeks: []
      }

      months.push(month);
    }

    month.weeks.push(week);
  }

  months.forEach(month => {
    month.year = getMonthYear(month);
  })

  return (
    <div className='container'>
      <div className='months'>
        <div className='day-of-week'>
          {dayOfWeek.map((day, i) => <span key={i}>{day}</span>)}
        </div>
        {months.map((month, i) => (
          <div className='month' key={i}>
            <span
              onMouseEnter={() => handleMouseEnterMonthEl(month.name, month.year)}
              onMouseLeave={handleMouseLeaveMonthEl}
            >
              {month.name}
            </span>
            <div className='weeks'>
              {month.weeks.map((week, i) => (
                <div className='week' key={i}>
                  {week.map((day, i) => {
                    const [dayNum, month, year] = day.split(' ');
                    const isHoveredDay = hoveredMonth && hoveredMonth.month === month && hoveredMonth.year === year;
                    const dayFromMap = daysMap.has(day) ? daysMap.get(day) as Day : undefined;
                    const contrastValue = getContrastValue(
                      dayFromMap && dayFromMap.bits[0].value as number,
                      5
                    )
                    return <div
                      className={classNames('day', { 'hovered': isHoveredDay, 'empty': !daysMap.has(day) })}
                      style={{ filter: (dayFromMap && dayFromMap.bits[0].value as number) ? `contrast(${contrastValue}%)` : '' }}
                      key={i}>
                      {isHoveredDay ? dayNum : ''}
                    </div>
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}