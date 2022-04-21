import JsTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

JsTimeAgo.addDefaultLocale(en);

export const timeAgo = (time: number): string => {
    const date = new JsTimeAgo("en-US").format(new Date(time)) as string;
    console.log({ date });
    return date;
};
