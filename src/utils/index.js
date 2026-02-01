import moment from "moment";

export const getNextDay = (date = new Date()) => new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);

export const applyTax = (amount, taxPercent = 20) => {
  const numericAmount = Number(amount) || 0;
  const taxAmount = (numericAmount * taxPercent) / 100;
  const total = numericAmount + taxAmount;
  return Math.round(total);
}

export const reverseApplyTax = (amount, discountPercent = 20) => {
  const numericAmount = Number(amount) || 0;
  const divisor = 1 - discountPercent / 100;
  if (divisor <= 0) return 0;
  return Math.round(numericAmount / divisor);
};



export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const formatINR = (value) => {
  const amount = Number(value) || 0;
  return `₹ ${amount.toFixed()}`;
};

export const daysDiffernceWithMinOne = (dateString1, dateString2) => {
  if (!dateString1 || !dateString2) return 1;
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const dateOnly1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const dateOnly2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const timeDiff = Math.abs(dateOnly1 - dateOnly2);
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff === 0 ? 1 : daysDiff;
};

export const isValidImage = (value) => {
  if (!value) return false;
  // Case 1: File object (upload time)
  if (typeof value === 'object') {
    return value?.type?.startsWith('image/');
  }
  // Case 2: String path / URL
  if (typeof value === 'string') {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(value);
  }
  return false;
};


export function getHoursArray(checkIn, checkOut, date) {
  const startTime = checkIn && checkIn.trim() !== '' ? checkIn : '00:00';
  const endTime = checkOut && checkOut.trim() !== '' ? checkOut : '23:00';
  const start = parseInt(startTime.split(':')[0], 10);
  const end = parseInt(endTime.split(':')[0], 10);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  let minStart = start;
  const todayStr = moment().format("YYYY-MM-DD");
  if (date === todayStr) {
    const nextHour = currentMinute > 0 ? currentHour + 1 : currentHour;
    if (nextHour > minStart) {
      minStart = nextHour;
    }
  }
  const hours = [];
  for (let h = minStart; h <= end; h++) {
    hours.push(`${h.toString().padStart(2, '0')}:00`);
  }

  return hours;
}

export function getTimeRangeFromSlot(startTime, slot) {
  const hours = parseInt(slot, 10);
  const [h, m] = startTime.split(":").map(Number);
  const start = new Date();
  start.setHours(h);
  start.setMinutes(m);

  const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

  const pad = (n) => String(n).padStart(2, "0");
  const endStr = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  return `${startTime} to ${endStr}`;
}

export function calculateFinalPrice(price) {
  const amount = Number(price) || 0;
  const tax = Math.round(amount * 0.05);
  const total = Math.round(amount + tax);

  return {
    tax,
    total
  };
}
