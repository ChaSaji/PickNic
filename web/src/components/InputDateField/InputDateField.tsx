import { inputSchemaType } from "@/schemas/inputSchema"
import { useFormContext } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PropsType = {
    startDateTitle: string
    endDateTitle: string
    startDateTag: keyof inputSchemaType
    endDateTag: keyof inputSchemaType
}

const InputDateField = (props:PropsType) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
      } = useFormContext();
    const Today:Date = new Date();
    const startDate:Date = watch(props.startDateTag) as Date
    const endDate:Date = watch(props.endDateTag) as Date
    console.log(errors)
  return (
    <div style={{display: "flex", gap: 10}}>
        <div>
            {props.startDateTitle}
            <br/>
            <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setValue(props.startDateTag, date || new Date())}
            dateFormat="yyyy/MM/dd"
            placeholderText='yyyy/mm/dd'
            minDate={Today}/>
            {errors[props.startDateTag] && (
                <div style={{ color: "red" }}>
                    {`${errors[props.startDateTag]?.message}`}
                </div>
            )}
        </div>
        <div>
            {props.endDateTitle}
            <br/>
            <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setValue(props.endDateTag, date || new Date())}
            dateFormat="yyyy/MM/dd"
            placeholderText='yyyy/mm/dd'
            minDate={Today} />
            {/* minDate={Today && startDate} /> */}
            {/* minDate={{Today > startDate ? Today : startDate}} */}
            {errors[props.endDateTag] && (
                <div style={{ color: "red" }}>
                    {`${errors[props.endDateTag]?.message}`}
                </div>
            )}
        </div>
    </div>
    )
}

export default InputDateField