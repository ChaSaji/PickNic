import { z } from "zod";

export const inputSchema = z
.object({
    organizer: z.string().min(1, { message: "主催者を入力してください" }),
    eventName: z.string().min(1, { message: "イベント名を入力してください" }),
    description: z.string().min(1, { message: "イベントの説明を入力してください" }),
    startTerm: z
    .date({ message: "開始日を入力してください" }),
    endTerm: z.date({ message: "終了日を入力してください" }),
    latitude: z
    .string()
    .min(1, { message: "緯度を入力してください" })
    .regex(/^[0-9]+$/, { message: "入力は半角の数字のみです", }),
    longitude: z
    .string()
    .min(1, { message: "経度を入力してください" })
    .regex(/^[0-9]+$/,{ message: "入力は半角の数字のみです", }),
    badgeImage: z
    .custom<FileList>()
    .refine(( data ) => data.length == 1, {
        message: "画像ファイルが選択されていません" , 
    }),
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


export type inputSchemaType = z.infer<typeof inputSchema>;
