'use client'

import PageTemplate from "@/components/PageTemplate/PageTemplate"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchemaType, inputSchema } from "@/schemas/inputSchema";
import InputFileField from "@/components/InputFileField/InputFileField";
import InputDateField from "@/components/InputDateField/InputDateField";

export default function App() {

  const formMethods = useForm<inputSchemaType>({
    resolver: zodResolver(inputSchema),
  })

  console.log(formMethods.formState.errors)
  const onSubmit: SubmitHandler<inputSchemaType> = (data) => {
    console.log(data)
  }

  type PropsType = {
    title: string
    tag: keyof inputSchemaType
    height?: number
    width?: number
  }

  return (
    <PageTemplate titleLabel="イベント登録">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <InputField
            size="medium"
            direction="column"
            name={"organizer"}
            label={"主催者名"}
            placeholder={"ぴくにく太郎"}
          />
          <InputField
            size="medium"
            direction="column"
            name={"eventName"}
            label={"イベント名"}
            placeholder={"ぴくにく祭"}
          />
          
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
            }} {...formMethods.register('description')}
            />
            {formMethods.formState.errors['description'] && (
              <div style={{ color: "red"}}>
                {`${formMethods.formState.errors['description']?.message}`}
              </div>
            )}
          </div>
          
          <InputDateField
            startDateTitle="開始日"
            startDateTag="startTerm"
            endDateTitle="終了日"
            endDateTag="endTerm"/>

          <div>
            <div>
              撮影物の座標
            </div>
            <div style={{display: "flex", gap: 10}}>
              <InputField
                size="small"
                direction="row"
                name={"latitude"}
                label={"緯度"}
                placeholder={""}
              />
              <InputField
                size="small"
                direction="row"
                name={"longitude"}
                label={"経度"}
                placeholder={""}
              />
            </div>
          </div>

          <InputFileField title="バッジ画像" tag="badgeImage"/>

          <InputFileField title="撮影対象画像" tag="picture"/>

          <input type="submit" value="登録" />
        </form>
      </FormProvider>
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