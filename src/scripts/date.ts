import { format, formatDistanceToNowStrict } from "date-fns";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";

export const toNow = (date: Date) =>
  formatDistanceToNowStrict(date, { addSuffix: true });

export const fromISOTime = (date: Date) => format(date, `yyyy.MM.dd HH:mm:ss`);

export const fromNow = (date: Date) => distanceInWordsToNow(date);
