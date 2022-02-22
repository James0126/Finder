import { format, formatDistanceToNowStrict } from "date-fns";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";

export const toNow = (date: Date) =>
  formatDistanceToNowStrict(date, { addSuffix: true });

export const fromISOTime = (date: Date) =>
  format(date, `MMM dd, yyyy hh.mmaaaaa'm'`);

export const fromNow = (date: Date) => distanceInWordsToNow(date);
