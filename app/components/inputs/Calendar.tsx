"use client";

import { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
  value: Range;
};

const Calendar: FC<Props> = ({ value, disabledDates, onChange }) => {
  return (
    <DateRange
      date={new Date()}
      direction="vertical"
      disabledDates={disabledDates}
      minDate={new Date()}
      onChange={onChange}
      rangeColors={["#262626"]}
      ranges={[value]}
      showDateDisplay={false}
    />
  );
};

export default Calendar;
