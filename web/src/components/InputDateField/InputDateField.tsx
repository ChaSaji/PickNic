import { eventSchemaType } from "@/schemas/eventSchema";
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

type PropsType = {
  startDateTitle: string;
  endDateTitle: string;
  startDateTag: keyof eventSchemaType;
  endDateTag: keyof eventSchemaType;
  defaultValue?: {
    startDate: string;
    endDate: string;
  };
};

const InputDateField = (props: PropsType) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (props.defaultValue?.startDate) {
      setValue(props.startDateTag, new Date(props.defaultValue.startDate));
    }
    if (props.defaultValue?.endDate) {
      setValue(props.endDateTag, new Date(props.defaultValue.endDate));
    }
  }, []);

  const Today: Date = new Date();
  const startDate: Date = watch(props.startDateTag) as Date;
  const endDate: Date = watch(props.endDateTag) as Date;
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div>
        {props.startDateTitle}
        <br />
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => setValue(props.startDateTag, date || new Date())}
          dateFormat="yyyy/MM/dd"
          placeholderText="yyyy/mm/dd"
          minDate={Today}
        />
        {errors[props.startDateTag] && (
          <div style={{ color: "red" }}>
            {`${errors[props.startDateTag]?.message}`}
          </div>
        )}
      </div>
      <div>
        {props.endDateTitle}
        <br />
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => setValue(props.endDateTag, date || new Date())}
          dateFormat="yyyy/MM/dd"
          placeholderText="yyyy/mm/dd"
          minDate={Today}
        />
        {errors[props.endDateTag] && (
          <div style={{ color: "red" }}>
            {`${errors[props.endDateTag]?.message}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDateField;
