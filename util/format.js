const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const completeTime = function (i) {
  i = Number(i);
  if (i < 10) i = "0" + i;
  return i;
};

export default function format(model, date, useMonthsInWords) {
  const nDate = new Date(date);
  var d = completeTime(nDate.getDate());
  var M = completeTime(nDate.getMonth() + 1);
  var y = completeTime(nDate.getFullYear());

  if (useMonthsInWords) M = months[nDate.getMonth()];
  return model.replace("DD", d).replace("MM", M).replace("YYYY", y);
}
