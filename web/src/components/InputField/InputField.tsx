import { useFormContext } from "react-hook-form";

interface PropsType {
  className?: string;
  label: string;
  name: string;
  size?: "small" | "medium" | "large";
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  direction?: "row" | "column";
}

const InputField = ({
  size = "medium",
  direction = "row",
  ...props
}: PropsType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const labelStyleMap = {
    small: { fontSize: 15, fontWeight: 500 },
    medium: { fontSize: 15, fontWeight: 500 },
    large: { fontSize: 25, fontWeight: 600 },
  };

  const inputStyleMap = {
    small: {
      width: 100,
      height: 20,
      paddingLeft: 6,
      paddingRight: 6,
      fontSize: 15,
    },
    medium: {
      width: 300,
      height: 20,
      paddingLeft: 6,
      paddingRight: 6,
      fontSize: 15,
    },
    large: {
      width: 400,
      height: 40,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
    },
  };

  const displayStyleMap = {
    row: { alignItems: "center" },
    column: { alignItems: "start" },
    small: {gap:2},
    medium: {gap: 2},
    large: {gap: 10}
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: displayStyleMap[direction].alignItems,
        justifyContent: "space-between",
        gap: displayStyleMap[size].gap,
      }}
    >
      <div
        style={{
          fontSize: labelStyleMap[size].fontSize,
          fontWeight: labelStyleMap[size].fontWeight,
        }}
      >
        {props.label}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          style={{
            width: inputStyleMap[size].width,
            height: inputStyleMap[size].height,
            fontSize: inputStyleMap[size].fontSize,
            borderRadius: 6,
            paddingLeft: inputStyleMap[size].paddingLeft,
            paddingRight: inputStyleMap[size].paddingRight,
          }}
          {...props}
          {...register(props.name)}
        />
        {errors[props.name] && (
          <div style={{ color: "red" }}>{`${errors[props.name]?.message}`}</div>
        )}
      </div>
    </div>
  );
};

export default InputField;
