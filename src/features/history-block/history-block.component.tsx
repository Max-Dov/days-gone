import React from "react"
import "./history-block.styles.scss";
import { Day } from "@types";

interface HistoryBlockProps {
  days: Day[];
}

const getContrastValue = (value: number, maxValue: number): string => {
  return `${value / maxValue * 80 + 20}`
};

const getMonthNameOfWeek = (week: Array<Day>): string => {
  return week
    .map(day => new Date(day.date).toLocaleString('en-us', { month: 'short' }))[week.length - 1];
};

export const HistoryBlock = ({ days }: HistoryBlockProps) => {
  const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks: Array<Array<Day>> = [];

  for (let i = 0, week: Array<Day> = []; i < days.length; i++) {
    const day = new Date(days[i].date).getDay();

    week.push(days[i]);

    if (day === 0) {
      weeks.push(week);
      week = [];
    }
  }

  const months: { name: string, weeks: Array<Array<Day>> }[] = [];

  for (let i = 0, month: { name: string, weeks: Array<Array<Day>> } | null = null; i < weeks.length; i++) {
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
    <div className="container">
      <div className="months">
        <div className="day-of-week">
          {dayOfWeek.map(day => {
            return <span>{day}</span>
          })}
        </div>
        {months.map((month, i) => {
          return <div className="month" key={i}>
            <span>{month.name}</span>
            <div className="weeks">
              {month.weeks.map((week, i) => (
                <div className="week" key={i}>
                  {week.map((day, i) => {
                    const contrastValue = getContrastValue(
                      day.bits[0].value as number,
                      5
                    )
                    return <div className="day"
                      style={{ filter: `contrast(${contrastValue}%)` }}
                      key={i}>
                    </div>
                  })}
                </div>
              ))}
            </div>
          </div>
        })}
      </div>
    </div>
  )
}