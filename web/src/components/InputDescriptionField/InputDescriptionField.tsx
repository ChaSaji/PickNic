import { eventSchemaType } from "@/schemas/eventSchema"
import { useFormContext } from "react-hook-form"

type PropsType = {
    descriptionTag: keyof eventSchemaType
}

const InputDescriptionField = (props:PropsType) => {
    const {
        register,
        formState: { errors },
      } = useFormContext();
    return (
        <div>
            <div>
              説明文
            </div>
            <textarea style={{
              borderWidth:2,
              borderColor: 'black',
              // border
              resize:'none',
              width: 300,
              height: 60,
              paddingLeft: 6,
              paddingRight: 6,
              fontSize: 15,
              borderRadius: 6,
            }} {...register(props.descriptionTag)}
            />
            {errors[props.descriptionTag] && (
              <div style={{ color: "red"}}>
                {`${errors[props.descriptionTag]?.message}`}
              </div>
            )}
          </div>
    )
}

export default InputDescriptionField