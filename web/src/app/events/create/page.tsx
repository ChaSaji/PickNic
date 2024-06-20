'use client'

import PageTemplate from "@/components/PageTemplate/PageTemplate"
import { useForm, SubmitHandler } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import internal from "stream";

type IFromInput = {
    organizer: string
    eventName: string
    description: string
    startTerm: Date
    endTerm: Date
  }

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFromInput>()
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data)

  type PropsType = {
    title: string
    tag: keyof IFromInput
    height: number
    width: number
  }

   const InputFormTemp = (props:PropsType) => {
        return(
            <div>
                {props.title}<br/>
                {/* ここを治す */}
                {/* <input style={{height: props.height, width: props.width, textAlign: 'start', alignItems: 'start'}} {...register(props.tag, { required: true })} /> */}
                <textarea style={{resize:'none'}}  rows={props.height} cols={props.width}  {...register(props.tag, { required: true })}/>
                {errors[props.tag] && <span>この入力は必須です</span>}
            </div>
        );  
    };
    
    
    const InputDateTemp = () => {
        const time = watch('startTerm')
        return (
        <DatePicker selected={time} onChange={(date) => setValue('startTerm',date || new Date())} dateFormat="yyyy/MM/dd"/>
        );
    };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <PageTemplate titleLabel="イベント登録">
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputFormTemp title="主催者団体名" tag="organizer" height={1} width={100}/>
            <InputFormTemp title="イベント名" tag="eventName" height={1} width={100}/>
            <InputFormTemp title="説明文" tag="description" height={10} width={100}/>
            バッジ画像予定地<br/>
            撮影対象画像予定地<br/>
            <InputDateTemp/>
            <InputDateTemp/>


            {/* register your input into the hook by invoking the "register" function */}
            {/* <input defaultValue="test" {...register("example")} /> */}

            {/* include validation with required or other standard HTML validation rules */}
            {/* <input {...register("exampleRequired", { required: true })} /> */}

            {/* errors will return when field validation fails  */}
            {/* {errors.exampleRequired && <span>この入力は必須です</span>} */}

            <input type="submit" value="登録"/>
        </form>
    </PageTemplate>
  )
}



const Styles = {
    fontSize16: {
        fontSize: "16px",
      },
      fontSize20: {
        fontSize: "20px",
      }
}