import { eventSchemaType } from "@/schemas/eventSchema";
import { useFormContext } from "react-hook-form";

type PropsType = {
  descriptionTag: keyof eventSchemaType;
  defaultValue?: string;
};

const InputDescriptionField = ({ descriptionTag, ...props }: PropsType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div>説明文</div>
      <textarea
        style={{
          borderWidth: 2,
          borderColor: "black",
          // border
          resize: "none",
          width: 300,
          height: 60,
          paddingLeft: 6,
          paddingRight: 6,
          fontSize: 15,
          borderRadius: 6,
        }}
        {...register(descriptionTag)}
        {...props}
      />
      {errors[descriptionTag] && (
        <div style={{ color: "red" }}>
          {`${errors[descriptionTag]?.message}`}
        </div>
      )}
    </div>
  );
};

export default InputDescriptionField;
