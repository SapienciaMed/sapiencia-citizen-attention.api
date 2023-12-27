const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const toLocaleDate = (date: string | Date, isMoment = false): Date => {
  let parseDate = date;
  if (typeof date == "string") {
    date = date.length > 10 ? date.substring(0, 10) : date;
    let currentDate = date.split("-")?.map((part) => parseInt(part));
    parseDate = new Date(currentDate[0], currentDate[1] - 1, currentDate[2]);
  } else {
    parseDate = parseDate as Date;
  }

  let localeDate = isMoment
    ? moment(parseDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).toDate()
    : parseDate;

  return localeDate;
};

export default { removeAccents, toLocaleDate };
