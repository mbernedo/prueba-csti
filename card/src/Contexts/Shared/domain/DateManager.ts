export interface DateManager {
  difference(minuend: Date, subtrahend: Date, unit?: any): number;
  remainingTimeText(from: Date, to: Date): string;
  add(from: Date, value: number, type: string): Date;
  getFormatter(date: Date, format: string): string;
  getNow(): Date;
}
