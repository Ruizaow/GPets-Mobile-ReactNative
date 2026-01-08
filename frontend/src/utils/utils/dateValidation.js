function isLeapYear(year) {
  if (!year)
    return false;

  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getMaxDays(month, year) {
  if (!month)
    return 31;

  const months31 = ['Janeiro', 'Março', 'Maio', 'Julho', 'Agosto', 'Outubro', 'Dezembro'];
  const months30 = ['Abril', 'Junho', 'Setembro', 'Novembro'];

  if (months31.includes(month))
    return 31;
  if (months30.includes(month))
    return 30;

  return isLeapYear(Number(year)) ? 29 : 28;
}

export function isValidDate(day, month, year) {
  if (!day || !month || !year)
    return false;

  const maxDay = getMaxDays(month, year);
  return Number(day) >= 1 && Number(day) <= maxDay;
}