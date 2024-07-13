'use client'

import PageTemplate from "@/components/PageTemplate/PageTemplate"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchemaType, eventSchema } from "@/schemas/eventSchema";
import InputFileField from "@/components/InputFileField/InputFileField";
import InputDateField from "@/components/InputDateField/InputDateField";
import InputCoordinateField from "@/components/InputCoordinateField/InputCoordinateField";
import InputDescriptionField from "@/components/InputDescriptionField/InputDescriptionField";


export default function App() {

  const formMethods = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
  })

  const onSubmit: SubmitHandler<eventSchemaType> = (data) => {
    console.log(data)
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

          <InputDescriptionField descriptionTag="description"/>
          
          <InputDateField
            startDateTitle="開始日"
            startDateTag="startTerm"
            endDateTitle="終了日"
            endDateTag="endTerm"/>

          <InputCoordinateField latitudeTag="latitude" longitudeTag="longitude"/>

          <InputFileField title="バッジ画像" imageTag="badgeImage" nameTag="badgeName"/>

          <InputFileField title="撮影対象画像" imageTag="picture" nameTag="pictureName"/>

          <input type="submit" value="登録" />
        </form>
      </FormProvider>
    </PageTemplate>
  )
}