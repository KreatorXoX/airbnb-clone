import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type Props = {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
};

export default function DatePicker({ value, disabledDates, onChange }: Props) {
  return (
    <DateRange
      rangeColors={["#00A699"]}
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={[value]}
      date={new Date()}
      direction="horizontal"
      onChange={onChange}
      showDateDisplay={true}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}
