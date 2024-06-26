import { inputSchemaType } from "@/schemas/inputSchema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
    title: string
    tag: keyof inputSchemaType
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
        {props.title}
        <br/>
        <input
          type="file"
          accept="image/*"
          {...register(props.tag)}
          onChange={handleFileChange}
        />
        {errors[props.tag] && (
            <div style={{ color: "red" }}>
                {`${errors[props.tag]?.message}`}
            </div>
        )}
        <br/>
       {imageSrc && <img src={imageSrc} alt="" style={{ width: 300, }}/>}
      </div>
  )
}

export default InputFileField