import React from 'react';
import './history-block.styles.scss';
import { Day } from '@types';

interface HistoryBlockProps {
  days: Day[];
  daysToDisplay: number;
}

const getFormatDate = (date: Date): string => `${date.getDate()} ${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`;

const getContrastValue = (value: number, maxValue: number): string => {
  return `${value / maxValue * 80 + 20}`
};

const getMonthNameOfWeek = (week: Array<string>): string => {
  return week
    .map(day => new Date(day).toLocaleString('en-us', { month: 'short' }))[week.length - 1];
};

export const HistoryBlock = ({ days, daysToDisplay }: HistoryBlockProps) => {
  const msInDay = 24 * 60 * 60 * 1000;
  const lastDay: number = new Date().getTime() - daysToDisplay * msInDay;
  const currentDay: number = new Date().getTime();
  const daysOfYear: Array<string> = [];
  const daysMap = new Map<string, Day>();

  const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks: Array<Array<string>> = [[]];
  const months: { name: string, weeks: Array<Array<string>> }[] = [];
  let week: Array<string> = weeks[0];

  for (let i = lastDay; i < currentDay; i += msInDay) {
    daysOfYear.push(getFormatDate(new Date(i)));
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

  for (let i = 0, month: { name: string, weeks: Array<Array<string>> } | null = null; i < weeks.length; i++) {
    const week = weeks[i];

    const monthName = getMonthNameOfWeek(week);

    if (!month) {
      month = {
        name: monthName,
        weeks: []
      };

      months.push(month);
    }

    if (month.name !== monthName) {
      month = {
        name: monthName,
        weeks: []
      }

      months.push(month);
    }

    month.weeks.push(week);
  }

  return (
    <div className='container'>
      <div className='months'>
        <div className='day-of-week'>
          {dayOfWeek.map((day, i) => <span key={i}>{day}</span>)}
        </div>
        {months.map((month, i) => (
          <div className='month' key={i}>
            <span>{month.name}</span>
            <div className='weeks'>
              {month.weeks.map((week, i) => (
                <div className='week' key={i}>
                  {week.map((day, i) => {
                    if (daysMap.has(day)) {
                      const dayFromMap = daysMap.get(day) as Day;
                      const contrastValue = getContrastValue(
                        dayFromMap.bits[0].value as number,
                        5
                      )
                      return <div 
                        className='day'
                        style={{ filter: (dayFromMap.bits[0].value as number > 0) ? `contrast(${contrastValue}%)` : '' }}
                        key={i}>
                      </div>
                    } else {
                      return <div 
                        className='day empty'
                        key={i}>
                      </div>
                    }
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