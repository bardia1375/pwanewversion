export function toFarsiNumber(n: string | number): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, x => farsiDigits[parseInt(x)]);
}

export function getTimeParts(date: Date = new Date()): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return {
    hours: toFarsiNumber(hours),
    minutes: toFarsiNumber(minutes),
    seconds: toFarsiNumber(seconds),
  };
}

export function getPersianDate(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'persian',
  };

  return new Intl.DateTimeFormat('fa-IR', options).format(date);
}
