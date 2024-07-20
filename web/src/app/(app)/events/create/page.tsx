"use client";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventSchemaType,
  eventSchema,
  eventPostSchemaType,
} from "@/schemas/eventSchema";
import InputFileField from "@/components/InputFileField/InputFileField";
import InputDateField from "@/components/InputDateField/InputDateField";
import InputCoordinateField from "@/components/InputCoordinateField/InputCoordinateField";
import InputDescriptionField from "@/components/InputDescriptionField/InputDescriptionField";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import { Event } from "@/types/event";
import { postEventForm } from "@/lib/api/event";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";

export default function App() {
  const { onApiSubmit, apiResponse } = useApiSubmit<eventPostSchemaType, Event>(
    postEventForm
  );
  const formMethods = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
  });
  const { user } = useAuth();

  const router = useRouter();

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (!user) return;
    const createData: eventPostSchemaType = {
      organizationId: user?.organization.id,
      event: { ...data },
    };
    await onApiSubmit(createData);
  });

  useEffect(() => {
    if (apiResponse?.success) {
      formMethods.reset();
      router.push("/events");
    }
  }, [apiResponse]);

  return (
    <PageTemplate titleLabel="イベント登録">
      <div style={{ marginBottom: 10 }}>
        <Button label="戻る" onClick={() => router.push("/events")} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormProvider {...formMethods}>
          <form
            style={{ width: 400, marginBottom: 100 }}
            onSubmit={handleSubmit}
          >
            <InputField
              size="medium"
              direction="column"
              name={"name"}
              label={"イベント名"}
              placeholder={"ぴくにく祭"}
            />

            <InputDescriptionField descriptionTag="overview" />

            <InputDateField
              startDateTitle="開始日"
              startDateTag="startDate"
              endDateTitle="終了日"
              endDateTag="endDate"
            />

            <InputCoordinateField
              latitudeTag="latitude"
              longitudeTag="longitude"
            />

            {/* <InputFileField
              title="バッジ画像"
              imageTag="badgeImg"
              nameTag="badgeName"
            /> */}

            <InputFileField
              title="撮影対象画像"
              imageTag="targetImg"
              nameTag="targetName"
            />

            <input type="submit" value="登録" />
          </form>
        </FormProvider>
      </div>
    </PageTemplate>
  );
}
