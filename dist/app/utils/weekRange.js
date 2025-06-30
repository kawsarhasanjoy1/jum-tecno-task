"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekRange = void 0;
const getWeekRange = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return { weekStart, weekEnd };
};
exports.getWeekRange = getWeekRange;
