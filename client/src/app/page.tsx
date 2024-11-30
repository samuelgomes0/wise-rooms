import { MultiViewCalendar } from "@/components/Calendar/MultiViewCalendar";

export default function Home() {
  return (
    <main className="py-8">
      <MultiViewCalendar />
    </main>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";

// import { ROOMS, WEEKDAYS } from "@/lib/constants";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { useCallback, useEffect, useState } from "react";

// const generateTimeSlots = () => {
//   const slots = [];
//   let hour = 7;
//   let minute = 45;

//   while (hour < 24) {
//     slots.push(
//       `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
//     );
//     minute += 50;
//     if (minute >= 60) {
//       hour++;
//       minute -= 60;
//     }
//   }

//   return slots;
// };

// const TIME_SLOTS = generateTimeSlots();

// export default function Calendario() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedStartTime, setSelectedStartTime] = useState("");
//   const [selectedEndTime, setSelectedEndTime] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [room, setRoom] = useState("");
//   interface Reservation {
//     title: string;
//     description: string;
//     room: string;
//     startTime: string;
//     endTime: string;
//     isRecurring: boolean;
//     recurringCount: number;
//   }

//   interface Reservations {
//     [dateKey: string]: {
//       [reservationId: string]: Reservation;
//     };
//   }

//   const [reservations, setReservations] = useState<Reservations>({});
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState("week");
//   const [isViewingReservation, setIsViewingReservation] = useState(false);
//   const [isRecurring, setIsRecurring] = useState(false);
//   const [recurringCount, setRecurringCount] = useState(1);
//   const [userRole, setUserRole] = useState("admin");

//   useEffect(() => {
//     const firstDayOfWeek = new Date(currentDate);
//     firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
//     setCurrentDate(firstDayOfWeek);
//   }, []);

//   const checkPermission = useCallback(
//     (room: string) => {
//       if (userRole === "admin") return true;
//       if (userRole === "professor" && room !== "Auditório") return true;
//       return false;
//     },
//     [userRole]
//   );

//   const checkConflict = useCallback(
//     (
//       date: Date,
//       startTime: string,
//       endTime: string,
//       room: string,
//       skipReservationId?: string
//     ) => {
//       const dateKey = date.toISOString().split("T")[0];
//       const dayReservations = reservations[dateKey] || {};

//       for (const id in dayReservations) {
//         if (skipReservationId && id === skipReservationId) continue;
//         const reservation = dayReservations[id];
//         if (reservation.room === room) {
//           if (
//             (startTime >= reservation.startTime &&
//               startTime < reservation.endTime) ||
//             (endTime > reservation.startTime &&
//               endTime <= reservation.endTime) ||
//             (startTime <= reservation.startTime &&
//               endTime >= reservation.endTime)
//           ) {
//             return true;
//           }
//         }
//       }
//       return false;
//     },
//     [reservations]
//   );

//   const openModal = (date: Date, startTime: string) => {
//     const dateKey = date.toISOString().split("T")[0];
//     const reservationId = `${dateKey}-${startTime}`;
//     if (reservations[dateKey]?.[reservationId]) {
//       setIsViewingReservation(true);
//       const reservation = reservations[dateKey][reservationId];
//       setTitle(reservation.title);
//       setDescription(reservation.description);
//       setRoom(reservation.room);
//       setSelectedStartTime(reservation.startTime);
//       setSelectedEndTime(reservation.endTime);
//       setIsRecurring(reservation.isRecurring || false);
//       setRecurringCount(reservation.recurringCount || 1);
//     } else {
//       setIsViewingReservation(false);
//       setTitle("");
//       setDescription("");
//       setRoom("");
//       setSelectedStartTime(startTime);
//       setSelectedEndTime("");
//       setIsRecurring(false);
//       setRecurringCount(1);
//     }
//     setSelectedDate(date);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setIsViewingReservation(false);
//   };

//   const makeReservation = () => {
//     if (!checkPermission(room)) {
//       toast({
//         title: "Permissão negada",
//         description: "Você não tem permissão para reservar esta sala.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const newReservations = { ...reservations };
//     const baseDate = new Date(selectedDate);
//     let conflictFound = false;

//     for (let i = 0; i < (isRecurring ? recurringCount : 1); i++) {
//       const currentDate = new Date(baseDate);
//       currentDate.setDate(baseDate.getDate() + i * 7); // Para reservas recorrentes semanais
//       const dateKey = currentDate.toISOString().split("T")[0];
//       const reservationId = `${dateKey}-${selectedStartTime}`;

//       if (
//         checkConflict(
//           currentDate,
//           selectedStartTime,
//           selectedEndTime,
//           room,
//           reservationId
//         )
//       ) {
//         conflictFound = true;
//         break;
//       }

//       if (!newReservations[dateKey]) {
//         newReservations[dateKey] = {};
//       }
//       newReservations[dateKey][reservationId] = {
//         title,
//         description,
//         room,
//         startTime: selectedStartTime,
//         endTime: selectedEndTime,
//         isRecurring,
//         recurringCount: isRecurring ? recurringCount : 1,
//       };
//     }

//     if (conflictFound) {
//       toast({
//         title: "Conflito de horários",
//         description:
//           "Já existe uma reserva para esta sala no horário selecionado.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setReservations(newReservations);
//     closeModal();
//     toast({
//       title: "Reserva realizada",
//       description: "Sua reserva foi feita com sucesso.",
//     });

//     // Simula o envio de uma notificação
//     setTimeout(() => {
//       toast({
//         title: "Lembrete de reserva",
//         description: `Você tem uma reserva em ${room} às ${selectedStartTime} amanhã.`,
//       });
//     }, 5000); // Simula uma notificação após 5 segundos
//   };

//   const changeDate = (direction: number) => {
//     const newDate = new Date(currentDate);
//     if (viewMode === "day") {
//       newDate.setDate(currentDate.getDate() + direction);
//     } else if (viewMode === "week") {
//       newDate.setDate(currentDate.getDate() + direction * 7);
//     } else if (viewMode === "month") {
//       newDate.setMonth(currentDate.getMonth() + direction);
//     }
//     setCurrentDate(newDate);
//   };

//   const renderHeader = () => {
//     const startOfWeek = new Date(currentDate);
//     const endOfWeek = new Date(currentDate);
//     endOfWeek.setDate(startOfWeek.getDate() + 6);

//     let dateRangeText = "";
//     if (viewMode === "day") {
//       dateRangeText = currentDate.toLocaleDateString("pt-BR", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });
//     } else if (viewMode === "week") {
//       if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
//         dateRangeText = `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${startOfWeek.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}`;
//       } else {
//         dateRangeText = `${startOfWeek.getDate()} de ${startOfWeek.toLocaleDateString("pt-BR", { month: "long" })} - ${endOfWeek.getDate()} de ${endOfWeek.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}`;
//       }
//     } else if (viewMode === "month") {
//       dateRangeText = currentDate.toLocaleDateString("pt-BR", {
//         month: "long",
//         year: "numeric",
//       });
//     }

//     return (
//       <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" onClick={() => changeDate(-1)}>
//             <ChevronLeft className="h-4 w-4 mr-2" />
//             Anterior
//           </Button>
//           <span className="font-semibold text-lg">{dateRangeText}</span>
//           <Button variant="outline" onClick={() => changeDate(1)}>
//             Próximo
//             <ChevronRight className="h-4 w-4 ml-2" />
//           </Button>
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant={viewMode === "day" ? "default" : "outline"}
//             onClick={() => setViewMode("day")}
//           >
//             Dia
//           </Button>
//           <Button
//             variant={viewMode === "week" ? "default" : "outline"}
//             onClick={() => setViewMode("week")}
//           >
//             Semana
//           </Button>
//           <Button
//             variant={viewMode === "month" ? "default" : "outline"}
//             onClick={() => setViewMode("month")}
//           >
//             Mês
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   const renderDayView = () => (
//     <div className="grid grid-cols-1 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
//       <div className="bg-white p-2 font-bold text-center">
//         {currentDate.toLocaleDateString("pt-BR", {
//           weekday: "long",
//           day: "numeric",
//           month: "long",
//         })}
//       </div>
//       {TIME_SLOTS.map((time) => {
//         const dateKey = currentDate.toISOString().split("T")[0];
//         const reservationId = `${dateKey}-${time}`;
//         const reservation = reservations[dateKey]?.[reservationId];
//         const roomColor =
//           ROOMS.find((r) => r.name === reservation?.room)?.color ||
//           "bg-gray-100";
//         return (
//           <button
//             key={time}
//             className={`p-2 text-sm hover:bg-indigo-100 transition-colors duration-200 flex items-center ${
//               reservation ? `${roomColor} m-0.5 rounded-md` : "bg-white"
//             }`}
//             onClick={() => openModal(currentDate, time)}
//           >
//             <span className="w-16 text-right mr-4">{time}</span>
//             {reservation && (
//               <div className="flex-1 text-left">
//                 <div className="font-semibold">{reservation.title}</div>
//                 <div className="text-xs text-gray-600">{reservation.room}</div>
//               </div>
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );

//   const renderWeekView = () => (
//     <div className="grid grid-cols-8 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
//       <div className="bg-white p-2 font-semibold text-center flex items-center justify-center">
//         Horário
//       </div>
//       {WEEKDAYS.map((day, index) => {
//         const date = new Date(currentDate);
//         date.setDate(currentDate.getDate() + index);
//         return (
//           <div key={day} className="bg-white p-2 text-center">
//             <div className="font-semibold">{day.slice(0, 3)}</div>
//             <div className="text-sm text-gray-600">
//               {date.getDate()}/{date.getMonth() + 1}
//             </div>
//           </div>
//         );
//       })}
//       {TIME_SLOTS.map((time) => (
//         <>
//           <div
//             key={time}
//             className="text-sm p-2 bg-white flex items-center justify-center"
//           >
//             {time}
//           </div>
//           {WEEKDAYS.map((_, index) => {
//             const date = new Date(currentDate);
//             date.setDate(currentDate.getDate() + index);
//             const dateKey = date.toISOString().split("T")[0];
//             const reservationId = `${dateKey}-${time}`;
//             const reservation = reservations[dateKey]?.[reservationId];
//             const roomColor =
//               ROOMS.find((r) => r.name === reservation?.room)?.color ||
//               "bg-white";
//             return (
//               <button
//                 key={`${dateKey}-${time}`}
//                 className={`p-2 text-sm hover:bg-blue-100 transition-colors duration-200 ${
//                   reservation ? `${roomColor} m-0.5 rounded-md` : "bg-white"
//                 }`}
//                 onClick={() => openModal(date, time)}
//               >
//                 {reservation && (
//                   <div className="text-center">
//                     <div className="font-semibold">{reservation.title}</div>
//                     <div className="text-xs text-gray-600">
//                       {reservation.room}
//                     </div>
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </>
//       ))}
//     </div>
//   );

//   const renderMonthView = () => {
//     const firstDayOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const lastDayOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );
//     const startDate = new Date(firstDayOfMonth);
//     startDate.setDate(startDate.getDate() - startDate.getDay());
//     const endDate = new Date(lastDayOfMonth);
//     endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

//     const weeks = [];
//     let currentWeek = [];
//     const currentDateIter = new Date(startDate);

//     while (currentDateIter <= endDate) {
//       if (currentWeek.length === 7) {
//         weeks.push(currentWeek);
//         currentWeek = [];
//       }
//       currentWeek.push(new Date(currentDateIter));
//       currentDateIter.setDate(currentDateIter.getDate() + 1);
//     }
//     if (currentWeek.length > 0) {
//       weeks.push(currentWeek);
//     }

//     return (
//       <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
//         {WEEKDAYS.map((day) => (
//           <div key={day} className="bg-white p-2 font-bold text-center">
//             {day}
//           </div>
//         ))}
//         {weeks.flat().map((date, index) => {
//           const dateKey = date.toISOString().split("T")[0];
//           const dayReservations = reservations[dateKey];
//           const isCurrentMonth = date.getMonth() === currentDate.getMonth();
//           type NewType = { title: string; room: string };

//           return (
//             <div
//               key={index}
//               className={`bg-white p-2 h-24 overflow-y-auto ${isCurrentMonth ? "" : "text-gray-400"}`}
//               onClick={() => openModal(date, "08:00")}
//             >
//               <div className="font-semibold">{date.getDate()}</div>
//               {dayReservations &&
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 Object.values(dayReservations).map(
//                   (reservation: NewType, idx) => {
//                     const roomColor =
//                       ROOMS.find((r) => r.name === reservation.room)?.color ||
//                       "bg-gray-100";
//                     return (
//                       <div
//                         key={idx}
//                         className={`text-xs ${roomColor} p-1 mt-1 rounded`}
//                       >
//                         {reservation.title}
//                       </div>
//                     );
//                   }
//                 )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="p-4">
//       {renderHeader()}
//       {viewMode === "day" && renderDayView()}
//       {viewMode === "week" && renderWeekView()}
//       {viewMode === "month" && renderMonthView()}

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {isViewingReservation
//                 ? "Detalhes da Reserva"
//                 : "Reservar Espaço Institucional"}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <p>
//               Reserva para {selectedDate.toLocaleDateString("pt-BR")} às{" "}
//               {selectedStartTime}
//             </p>
//             <Input
//               placeholder="Título da reserva"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               readOnly={isViewingReservation}
//             />
//             <Select
//               value={room}
//               onValueChange={setRoom}
//               disabled={isViewingReservation}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Selecione uma sala" />
//               </SelectTrigger>
//               <SelectContent>
//                 {ROOMS.map((room) => (
//                   <SelectItem key={room.name} value={room.name}>
//                     {room.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <div className="flex space-x-4">
//               <Input
//                 type="time"
//                 value={selectedStartTime}
//                 onChange={(e) => setSelectedStartTime(e.target.value)}
//                 readOnly={isViewingReservation}
//               />
//               <Input
//                 type="time"
//                 value={selectedEndTime}
//                 onChange={(e) => setSelectedEndTime(e.target.value)}
//                 readOnly={isViewingReservation}
//               />
//             </div>
//             <Textarea
//               placeholder="Descrição da reserva"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               readOnly={isViewingReservation}
//             />
//             {!isViewingReservation && (
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="isRecurring"
//                   checked={isRecurring}
//                   onCheckedChange={(checked) =>
//                     setIsRecurring(checked as boolean)
//                   }
//                 />
//                 <label htmlFor="isRecurring">Reserva recorrente</label>
//               </div>
//             )}
//             {isRecurring && !isViewingReservation && (
//               <Select
//                 value={recurringCount.toString()}
//                 onValueChange={(value) => setRecurringCount(parseInt(value))}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Número de recorrências" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[1, 2, 3, 4].map((count) => (
//                     <SelectItem key={count} value={count.toString()}>
//                       {count} vezes
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={closeModal}>
//               Fechar
//             </Button>
//             {!isViewingReservation && (
//               <Button onClick={makeReservation}>Reservar</Button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
