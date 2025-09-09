"use client";

import { useState } from "react";

type ScheduleSelectorProps = {
  title?: string;
  locations?: string[];
  dates?: string[]; // display-ready labels (e.g., "Fri, 6 July")
  times?: string[]; // display-ready labels (e.g., "6.00pm")
  onChange?: (selection: {
    location?: string;
    date?: string;
    time?: string;
  }) => void;
};

export function ScheduleSelector({
  title = "Select the location, date, and time you prefer",
  locations = [],
  dates = [],
  times = [],
  onChange,
}: ScheduleSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    locations[0]
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    dates[0]
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    times[0]
  );

  const handleChange = (
    next: Partial<{
      location: string | undefined;
      date: string | undefined;
      time: string | undefined;
    }>
  ) => {
    const updated = {
      location: next.location ?? selectedLocation,
      date: next.date ?? selectedDate,
      time: next.time ?? selectedTime,
    };
    onChange?.(updated);
  };

  const hasAny = locations.length > 0 || dates.length > 0 || times.length > 0;
  if (!hasAny) return null;

  return (
    <div className="p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
      <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
        {title}
      </h4>

      {locations.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {locations.map((loc) => {
            const active = selectedLocation === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setSelectedLocation(loc);
                  handleChange({ location: loc });
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-[#0E5344] text-white border-[#0E5344]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      )}

      {dates.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {dates.map((date) => {
            const active = selectedDate === date;
            return (
              <button
                key={date}
                type="button"
                onClick={() => {
                  setSelectedDate(date);
                  handleChange({ date });
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-[#0E5344] text-white border-[#0E5344]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      )}

      {times.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {times.map((time) => {
            const active = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => {
                  setSelectedTime(time);
                  handleChange({ time });
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-[#0E5344] text-white border-[#0E5344]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
