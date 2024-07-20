import { z } from "zod";

export const eventSchema = z
  .object({
    name: z.string().min(1, { message: "イベント名を入力してください" }),
    overview: z
      .string()
      .min(1, { message: "イベントの説明を入力してください" }),
    startDate: z.date({ message: "開始日を入力してください" }),
    endDate: z.date({ message: "終了日を入力してください" }),
    latitude: z.coerce
      .number()
      .min(-90, { message: "範囲は-90~90です" })
      .max(90, { message: "範囲は-90~90です" }),
    longitude: z.coerce
      .number()
      .min(-180, { message: "範囲は-180~180です" })
      .max(180, { message: "範囲は-180~180です" }),
    badgeName: z
      .string()
      .min(1, { message: "バッジの名前を入力してください" })
      .regex(/^[A-Za-z0-9]+$/, { message: "入力は半角英数字のみです" }),
    badgeImg: z.custom<FileList>().refine((data) => data.length == 1, {
      message: "画像ファイルが選択されていません",
    }),
    targetName: z
      .string()
      .min(1, { message: "写真の名前を入力してください" })
      .regex(/^[A-Za-z0-9]+$/, { message: "入力は半角英数字のみです" }),
    targetImg: z.custom<FileList>().refine((data) => data.length == 1, {
      message: "画像ファイルが選択されていません",
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    path: ["startDate"],
    message: "開始日は終了日より前である必要があります",
  });

export type eventSchemaType = z.infer<typeof eventSchema>;
export type eventPostSchemaType = {
  organizationId: string;
  event: eventSchemaType;
};
export type eventPutSchemaType = { id: string; body: eventSchemaType };
