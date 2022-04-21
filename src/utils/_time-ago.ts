import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

export const timeAgo = (time: number): string => {
    return new TimeAgo("en-US").format(new Date(time)) as string;
};
