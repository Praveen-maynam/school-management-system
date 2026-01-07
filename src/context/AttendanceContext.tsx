import React, { createContext, useContext, useEffect, useState } from "react";
import { Attendance } from "../types/attendance.types";

const AttendanceContext = createContext<{
  attendance: Attendance[];
  markAttendance: (records: Attendance[]) => void;
}>({
  attendance: [],
  markAttendance: () => {},
});

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("attendance");
    if (saved) setAttendance(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const markAttendance = (records: Attendance[]) => {
    setAttendance(prev => [...prev, ...records]);
  };

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);