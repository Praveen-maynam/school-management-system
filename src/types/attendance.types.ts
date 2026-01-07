export type Attendance = {
  id: string;
  classId: string;
  studentId: string;
  date: string;
  status: "Present" | "Absent";
};
