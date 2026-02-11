// ============================================================
//  SOLAR MANAGER — DATA MODULE
//  All application data, energy statistics, and mock records
// ============================================================

// --- USERS ---
export const users = [
  {
    id: 1,
    name: "DEMO",
    email: "demo@solar.com",
    password: "password123",
    location: "New Delhi, India",
    panels: 12,
    memberSince: "January 2025",
    avatar: null,
  },
];

// --- CURRENT READINGS ---
export const currentReadings = {
  currentGeneration: 0.0,   // kW
  consumption: 1.67,         // kW
  netPower: -1.67,           // kW
  efficiency: 0.0,           // %
};

// --- TODAY'S SUMMARY ---
export const todaySummary = {
  totalGeneration: 51.43,    // kWh
  totalConsumption: 53.50,   // kWh
  netEnergy: -2.07,          // kWh
};

// --- HOURLY POWER DATA (Today) ---
export const hourlyPowerData = [
  { hour: "00:00", generation: 0.0, consumption: 0.8 },
  { hour: "01:00", generation: 0.0, consumption: 0.6 },
  { hour: "02:00", generation: 0.0, consumption: 0.5 },
  { hour: "03:00", generation: 0.0, consumption: 0.5 },
  { hour: "04:00", generation: 0.0, consumption: 0.6 },
  { hour: "05:00", generation: 0.2, consumption: 0.8 },
  { hour: "06:00", generation: 0.8, consumption: 1.1 },
  { hour: "07:00", generation: 1.9, consumption: 1.4 },
  { hour: "08:00", generation: 3.2, consumption: 1.7 },
  { hour: "09:00", generation: 4.5, consumption: 2.0 },
  { hour: "10:00", generation: 5.8, consumption: 2.2 },
  { hour: "11:00", generation: 6.7, consumption: 2.4 },
  { hour: "12:00", generation: 7.1, consumption: 2.5 },
  { hour: "13:00", generation: 6.9, consumption: 2.6 },
  { hour: "14:00", generation: 6.2, consumption: 2.4 },
  { hour: "15:00", generation: 5.1, consumption: 2.2 },
  { hour: "16:00", generation: 3.8, consumption: 2.0 },
  { hour: "17:00", generation: 2.4, consumption: 1.8 },
  { hour: "18:00", generation: 1.0, consumption: 1.9 },
  { hour: "19:00", generation: 0.2, consumption: 2.1 },
  { hour: "20:00", generation: 0.0, consumption: 2.3 },
  { hour: "21:00", generation: 0.0, consumption: 2.0 },
  { hour: "22:00", generation: 0.0, consumption: 1.5 },
  { hour: "23:00", generation: 0.0, consumption: 1.0 },
];

// --- WEEKLY ENERGY DATA ---
export const weeklyEnergyData = [
  { day: "Mon", generation: 48.2, consumption: 45.1 },
  { day: "Tue", generation: 52.7, consumption: 48.6 },
  { day: "Wed", generation: 38.4, consumption: 42.3 },
  { day: "Thu", generation: 61.9, consumption: 50.8 },
  { day: "Fri", generation: 55.3, consumption: 47.2 },
  { day: "Sat", generation: 43.1, consumption: 38.9 },
  { day: "Sun", generation: 51.43, consumption: 53.50 },
];

// --- MONTHLY ENERGY DATA ---
export const monthlyEnergyData = [
  { month: "Jan", generation: 820, consumption: 780 },
  { month: "Feb", generation: 910, consumption: 850 },
  { month: "Mar", generation: 1150, consumption: 920 },
  { month: "Apr", generation: 1380, consumption: 980 },
  { month: "May", generation: 1520, consumption: 1050 },
  { month: "Jun", generation: 1340, consumption: 1100 },
  { month: "Jul", generation: 1180, consumption: 1080 },
  { month: "Aug", generation: 1290, consumption: 1020 },
  { month: "Sep", generation: 1420, consumption: 950 },
  { month: "Oct", generation: 1260, consumption: 900 },
  { month: "Nov", generation: 950, consumption: 840 },
  { month: "Dec", generation: 780, consumption: 810 },
];

// --- ENERGY SOURCE BREAKDOWN (Pie Chart) ---
export const energySourceData = [
  { label: "Solar Generation", value: 62, color: "#f97316" },
  { label: "Grid Import", value: 28, color: "#6366f1" },
  { label: "Battery Storage", value: 10, color: "#22c55e" },
];

// --- CONSUMPTION BREAKDOWN (Pie Chart) ---
export const consumptionBreakdown = [
  { label: "HVAC / Cooling", value: 34, color: "#f97316" },
  { label: "Lighting", value: 18, color: "#facc15" },
  { label: "Appliances", value: 27, color: "#6366f1" },
  { label: "EV Charging", value: 13, color: "#22c55e" },
  { label: "Other", value: 8, color: "#94a3b8" },
];

// --- PANEL SETTINGS ---
export const panelSettings = {
  controlMode: "auto",   // "auto" | "manual"
  azimuthAngle: 180,     // 0–360
  tiltAngle: 30,         // 0–90
};

// --- MAINTENANCE TASKS ---
export const maintenanceTasks = [
  {
    id: 1,
    title: "Panel Cleaning",
    description: "Clean all solar panels with soft brush and water",
    priority: "HIGH",
    dueDate: "2026-02-12",
    completed: false,
    category: "cleaning",
  },
  {
    id: 2,
    title: "Inverter Check",
    description: "Check inverter connections and display",
    priority: "MEDIUM",
    dueDate: "2026-02-17",
    completed: false,
    category: "electrical",
  },
  {
    id: 3,
    title: "Wire Inspection",
    description: "Inspect all wiring for damage or wear",
    priority: "MEDIUM",
    dueDate: "2026-02-24",
    completed: false,
    category: "electrical",
  },
  {
    id: 4,
    title: "Performance Analysis",
    description: "Review system performance and efficiency metrics",
    priority: "LOW",
    dueDate: "2026-03-12",
    completed: true,
    category: "analysis",
  },
];

// --- REMINDERS ---
export const reminders = [
  {
    id: 1,
    title: "Panel Cleaning Due",
    message: "Your solar panels need cleaning tomorrow.",
    type: "maintenance",
    date: "2026-02-12",
    time: "09:00",
    enabled: true,
    icon: "🧹",
  },
  {
    id: 2,
    title: "Low Efficiency Alert",
    message: "System efficiency dropped below 40% today.",
    type: "alert",
    date: "2026-02-11",
    time: "14:30",
    enabled: true,
    icon: "⚠️",
  },
  {
    id: 3,
    title: "Inverter Maintenance",
    message: "Scheduled inverter check in 6 days.",
    type: "maintenance",
    date: "2026-02-17",
    time: "10:00",
    enabled: true,
    icon: "🔧",
  },
  {
    id: 4,
    title: "Monthly Report Ready",
    message: "Your January 2026 energy report is available.",
    type: "info",
    date: "2026-02-01",
    time: "08:00",
    enabled: false,
    icon: "📊",
  },
  {
    id: 5,
    title: "Grid Export Milestone",
    message: "You exported 500 kWh to the grid this month!",
    type: "success",
    date: "2026-02-08",
    time: "18:00",
    enabled: true,
    icon: "🎉",
  },
];

// --- PERFORMANCE STATS ---
export const performanceStats = {
  totalSavings: 18450,         // ₹ all-time
  co2Avoided: 2340,            // kg
  totalGenerated: 12650,       // kWh all-time
  peakOutput: 7.4,             // kW (all-time)
  systemHealth: 94,            // %
  daysActive: 408,
};

// --- NOTIFICATIONS (in-app) ---
export const notifications = [
  { id: 1, message: "Panel cleaning due tomorrow", time: "2 hours ago", read: false, type: "warning" },
  { id: 2, message: "System running at peak", time: "5 hours ago", read: false, type: "success" },
  { id: 3, message: "Grid export: 12.4 kWh today", time: "1 day ago", read: true, type: "info" },
  { id: 4, message: "Maintenance reminder set", time: "2 days ago", read: true, type: "info" },
];

// --- HELPERS ---
export function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function priorityColor(priority) {
  const map = { HIGH: "#ef4444", MEDIUM: "#f97316", LOW: "#22c55e" };
  return map[priority] || "#94a3b8";
}
