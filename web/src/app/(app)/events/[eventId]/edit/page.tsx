"use client";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventSchemaType,
  eventSchema,
  eventPutSchemaType,
} from "@/schemas/eventSchema";
import InputFileField from "@/components/InputFileField/InputFileField";
import InputDateField from "@/components/InputDateField/InputDateField";
import InputCoordinateField from "@/components/InputCoordinateField/InputCoordinateField";
import InputDescriptionField from "@/components/InputDescriptionField/InputDescriptionField";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import { Event, EventDetail } from "@/types/event";
import { getEvent, putEventForm } from "@/lib/api/event";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";

export default function EventEditPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params["eventId"] as string;
  const [event, setEvent] = useState<EventDetail | null>(null);

  const { onApiSubmit, apiResponse } = useApiSubmit<eventPutSchemaType, Event>(
    putEventForm
  );
  const formMethods = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    const updatedData: eventPutSchemaType = { id: eventId, body: { ...data } };
    await onApiSubmit(updatedData);
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await getEvent({ eventId: eventId });
        result.data && setEvent(result.data);
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      }
    })();
  }, []);

  useEffect(() => {
    if (apiResponse?.success) {
      formMethods.reset();
      router.push(`/events/${eventId}`);
    }
  }, [apiResponse]);

  return (
    <PageTemplate titleLabel="イベント更新">
      <div style={{ marginBottom: 10 }}>
        <Button label="戻る" onClick={() => router.push("/events")} />
      </div>
      {event && (
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
                defaultValue={event.name}
              />

              <InputDescriptionField
                descriptionTag="overview"
                defaultValue={event.overview}
              />

              <InputDateField
                startDateTitle="開始日"
                startDateTag="startDate"
                endDateTitle="終了日"
                endDateTag="endDate"
                defaultValue={{
                  startDate: event.startDate,
                  endDate: event.endDate,
                }}
              />

              <InputCoordinateField
                latitudeTag="latitude"
                longitudeTag="longitude"
                defaultValue={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
              />

              <InputFileField
                title="バッジ画像"
                imageTag="badgeImg"
                nameTag="badgeName"
                defaultValue={{
                  image: event.badgeImg,
                  name: event.badgeName,
                }}
              />

              <InputFileField
                title="撮影対象画像"
                imageTag="targetImg"
                nameTag="targetName"
                defaultValue={{
                  image: event.targetImg,
                  name: event.targetName,
                }}
              />

              <input type="submit" value="更新" />
            </form>
          </FormProvider>
        </div>
      )}
    </PageTemplate>
  );
}
