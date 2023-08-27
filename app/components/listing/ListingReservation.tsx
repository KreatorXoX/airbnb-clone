import React from "react";
import DatePicker from "../inputs/DatePicker";
import { Range } from "react-date-range";
import Button from "../Button";

type Props = {
  price: number;
  totalPrice: number;
  onDateChange: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
};

export default function ListingReservation({
  price,
  totalPrice,
  onDateChange,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: Props) {
  return (
    <div className="bg-white p-2 border rounded-xl">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price.toFixed(2)}</div>
        <div className="font-light text-neutral-600"> / night</div>
      </div>
      <hr className="pb-5" />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onDateChange(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}
