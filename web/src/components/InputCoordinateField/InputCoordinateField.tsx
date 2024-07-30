import { eventSchemaType } from "@/schemas/eventSchema";
import InputField from "@/components/InputField/InputField";

type PropsType = {
  latitudeTag: keyof eventSchemaType;
  longitudeTag: keyof eventSchemaType;
  defaultValue?: {
    latitude: number;
    longitude: number;
  };
};

const InputCoordinateField = (props: PropsType) => {
  return (
    <div>
      <div>撮影物の座標</div>
      <div style={{ display: "flex", gap: 10 }}>
        <InputField
          type="number"
          step={0.00001}
          size="small"
          direction="row"
          name={props.latitudeTag}
          label={"緯度"}
          placeholder={""}
          defaultValue={props.defaultValue && props.defaultValue.latitude}
        />
        <InputField
          type="number"
          step={0.00001}
          size="small"
          direction="row"
          name={props.longitudeTag}
          label={"経度"}
          placeholder={""}
          defaultValue={props.defaultValue && props.defaultValue.longitude}
        />
      </div>
    </div>
  );
};

export default InputCoordinateField;
