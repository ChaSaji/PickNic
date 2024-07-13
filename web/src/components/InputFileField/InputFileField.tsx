import { eventSchemaType } from "@/schemas/eventSchema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "@/components/InputField/InputField";

type PropsType = {
    title: string
    imageTag: keyof eventSchemaType
    nameTag: keyof eventSchemaType
}

const InputFileField = (props:PropsType) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setImageSrc(window.URL.createObjectURL(file))
      }
    }
    const {
        register,
        formState: { errors },
      } = useFormContext();
  return (
    <div>
      <div>
        <InputField
            size="medium"
            direction="column"
            name={props.nameTag}
            label={props.title+"の名前"}
            placeholder={""}
          />
        </div>
        {props.title}
        <br/>
        <input
          type="file"
          accept="image/*"
          {...register(props.imageTag)}
          onChange={handleFileChange}
        />
        {errors[props.imageTag] && (
            <div style={{ color: "red" }}>
                {`${errors[props.imageTag]?.message}`}
            </div>
        )}
        <br/>
       {imageSrc && <img src={imageSrc} alt="" style={{ width: 300, }}/>}
      </div>
  )
}

export default InputFileField