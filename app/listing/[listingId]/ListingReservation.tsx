"use client";

import Button from "@/app/components/Button";
import Calendar from "@/app/components/inputs/Calendar";
import { FC } from "react";
import { Range, RangeKeyDict } from "react-date-range";

type Props = {
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  price: number;
  totalPrice: number;
};

const ListingReservation: FC<Props> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const calendarData = {
    value: dateRange,
    disabledDates,
    onChange: (value: RangeKeyDict) => onChangeDate(value.selection),
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar {...calendarData} />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
