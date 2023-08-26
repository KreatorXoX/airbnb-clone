import { useState } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type Props = {};

export default function DatePicker({}: Props) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item: any) => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
    />
  );
}
