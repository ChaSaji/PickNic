import { z } from "zod";

export const eventSchema = z
.object({
    organizer: z.string().min(1, { message: "主催者を入力してください" }),
    eventName: z.string().min(1, { message: "イベント名を入力してください" }),
    description: z.string().min(1, { message: "イベントの説明を入力してください" }),
    startTerm: z
    .date({ message: "開始日を入力してください" }),
    endTerm: z.date({ message: "終了日を入力してください" }),
    latitude: z
    .coerce
    .number()
    .min(-90, {message: "範囲は-90~90です"})
    .max(90, {message: "範囲は-90~90です"}),
    longitude: z
    .coerce
    .number()
    .min(-180, {message: "範囲は-180~180です"})
    .max(180, {message: "範囲は-180~180です"}),
    badgeName: z
    .string()
    .min(1, {message: "バッジの名前を入力してください"})
    .regex(/^[A-Za-z0-9]+$/, { message: "入力は半角英数字のみです", }),
    badgeImage: z
    .custom<FileList>()
    .refine(( data ) => data.length == 1, {
        message: "画像ファイルが選択されていません" , 
    }),
    pictureName: z
    .string()
    .min(1, {message: "写真の名前を入力してください"})
    .regex(/^[A-Za-z0-9]+$/, { message: "入力は半角英数字のみです", }),
    picture: z
    .custom<FileList>()
    .refine(( data ) => data.length == 1, {
        message: "画像ファイルが選択されていません" , 
    }),
})
.refine(( data ) => data.startTerm <= data.endTerm, { 
    path: [ "startTerm" ], 
    message: "開始日は終了日より前である必要があります" , 
});

export type eventSchemaType = z.infer<typeof eventSchema>;
