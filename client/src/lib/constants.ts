export const WEEKDAYS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export const ROOMS = [
  { name: "Sala A", color: "bg-red-200" },
  { name: "Sala B", color: "bg-blue-200" },
  { name: "Sala C", color: "bg-green-200" },
  { name: "Sala D", color: "bg-yellow-200" },
  { name: "Auditório", color: "bg-purple-200" },
];

export const TIME_SLOTS = generateTimeSlots();

function generateTimeSlots() {
  const slots = [];
  let hour = 7;
  let minute = 45;

  while (hour < 24) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    );
    minute += 50;
    if (minute >= 60) {
      hour++;
      minute -= 60;
    }
  }

  return slots;
}
