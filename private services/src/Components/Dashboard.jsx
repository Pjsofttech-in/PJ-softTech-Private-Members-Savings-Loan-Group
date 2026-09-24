// src/Components/Dashboard.jsx
import { useState, useEffect } from "react";
import { formatIndianCurrency } from "../utils/formHelpers";

export default function Dashboard({ onStartRegistration, onStartSharesApplication, onShowUserList }) {
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    totalSharesAllotted: 0,
    shareCapitalPool: 0,
    monthlySavingsPool: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");

  // Fetch live aggregated data from your Spring Boot MySQL backend
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/members')
        .then(res => res.json())
        .catch(() => []),
      fetch('http://localhost:8080/api/shares')
        .then(res => res.json())
        .catch(() => []),
      fetch('http://localhost:8080/api/transactions')
        .then(res => res.json())
        .catch(() => [])
    ])
    .then(([membersData, sharesData, txData]) => {
      const members = Array.isArray(membersData) ? membersData : [];
      const shares = Array.isArray(sharesData) ? sharesData : [];
      const transactions = Array.isArray(txData) ? txData : [];

      const totalMembers = members.length;
      const totalSharesAllotted = shares.reduce((sum, s) => sum + (Number(s.numberOfShares) || 1), 0);
      const shareCapitalPool = totalSharesAllotted * 1000; 
      const monthlySavingsPool = totalMembers * 1000; 

      const totalRevenue = transactions
        .filter(t => t.type === "Income" && t.paymentStatus === "Complete")
        .reduce((sum, t) => sum + (Number(t.amount) || 0), shareCapitalPool + monthlySavingsPool);

      const totalExpenses = transactions
        .filter(t => t.type === "Expense" && t.paymentStatus === "Complete")
        .reduce((sum, t) => sum + (Number(t.amount) || 0), 25000);

      const netProfit = totalRevenue - totalExpenses;

      setMetrics({
        totalMembers,
        totalSharesAllotted,
        shareCapitalPool,
        monthlySavingsPool,
        totalRevenue,
        totalExpenses,
        netProfit,
      });
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 lg:p-8 bg-[#f4f6f8] min-h-[calc(100vh-76px)] font-sans">
      
      {/* Top 5 Pastel Metric Cards Row matching your reference design layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        
        {/* 1. INCOME CARD (Blue Theme) */}
        <div className="bg-[#e0f2fe] border border-[#bae6fd] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#0369a1] text-xs font-black tracking-wider uppercase">Income</span>
            <span className="bg-white/90 w-8 h-8 rounded-xl flex items-center justify-center text-[#0369a1] font-black text-xs shadow-sm">$</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#0284c7]">
              <span>Today's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#0284c7]">
              <span>7 Day's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#0284c7]">
              <span>30 Day's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#0284c7]">
              <span>365 Day's</span>
              <span className="font-bold">{formatIndianCurrency(metrics.totalRevenue)}</span>
            </div>
            <div className="flex justify-between text-[#0369a1] pt-2.5 border-t border-[#bae6fd] font-black text-sm">
              <span>Total</span>
              <span>{formatIndianCurrency(metrics.totalRevenue)}</span>
            </div>
          </div>
        </div>

        {/* 2. EXPENSE CARD (Peach Theme) */}
        <div className="bg-[#ffedd5] border border-[#fed7aa] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#c2410c] text-xs font-black tracking-wider uppercase">Expense</span>
            <span className="bg-white/90 w-8 h-8 rounded-xl flex items-center justify-center text-[#c2410c] font-black text-xs shadow-sm">⇄</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#ea580c]">
              <span>Today's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#ea580c]">
              <span>7 Day's</span>
              <span className="font-bold">₹2,000</span>
            </div>
            <div className="flex justify-between text-[#ea580c]">
              <span>30 Day's</span>
              <span className="font-bold">₹4,230</span>
            </div>
            <div className="flex justify-between text-[#ea580c]">
              <span>365 Day's</span>
              <span className="font-bold">{formatIndianCurrency(metrics.totalExpenses)}</span>
            </div>
            <div className="flex justify-between text-[#c2410c] pt-2.5 border-t border-[#fed7aa] font-black text-sm">
              <span>Total</span>
              <span>{formatIndianCurrency(metrics.totalExpenses)}</span>
            </div>
          </div>
        </div>

        {/* 3. SAVINGS / LOSS CARD (Green Theme) */}
        <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#15803d] text-xs font-black tracking-wider uppercase">Savings / Loss</span>
            <span className="bg-white/90 w-8 h-8 rounded-xl flex items-center justify-center text-[#15803d] font-black text-xs shadow-sm">🛡️</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#16a34a]">
              <span>Today's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>7 Day's</span>
              <span className="font-bold">₹-2,000</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>30 Day's</span>
              <span className="font-bold">₹-4,230</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>365 Day's</span>
              <span className="font-bold">{formatIndianCurrency(metrics.netProfit)}</span>
            </div>
            <div className="flex justify-between text-rose-600 pt-2.5 border-t border-[#bbf7d0] font-black text-sm">
              <span>Total</span>
              <span>{formatIndianCurrency(metrics.netProfit)}</span>
            </div>
          </div>
        </div>

        {/* 4. PENDING INCOME CARD (Purple Theme) */}
        <div className="bg-[#f3e8ff] border border-[#e9d5ff] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#7e22ce] text-xs font-black tracking-wider uppercase">Pending Income</span>
            <span className="bg-white/90 w-8 h-8 rounded-xl flex items-center justify-center text-[#7e22ce] font-black text-xs shadow-sm">📋</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#9333ea]">
              <span>Today's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#9333ea]">
              <span>7 Day's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#9333ea]">
              <span>30 Day's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#9333ea]">
              <span>365 Day's</span>
              <span className="font-bold">₹1,850</span>
            </div>
            <div className="flex justify-between text-[#7e22ce] pt-2.5 border-t border-[#e9d5ff] font-black text-sm">
              <span>Total</span>
              <span>₹1,850</span>
            </div>
          </div>
        </div>

        {/* 5. PENDING EXPENSE CARD (Mint Green Theme) */}
        <div className="bg-[#ccfbf1] border border-[#99f6e4] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[#0f766e] text-xs font-black tracking-wider uppercase">Pending Expense</span>
            <span className="bg-white/90 w-8 h-8 rounded-xl flex items-center justify-center text-[#0f766e] font-black text-xs shadow-sm">⏳</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#0d9488]">
              <span>Today's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#0d9488]">
              <span>7 Day's</span>
              <span className="font-bold">₹0</span>
            </div>
            <div className="flex justify-between text-[#0d9488]">
              <span>30 Day's</span>
              <span className="font-bold">₹2,230</span>
            </div>
            <div className="flex justify-between text-[#0d9488]">
              <span>365 Day's</span>
              <span className="font-bold">₹20,330</span>
            </div>
            <div className="flex justify-between text-[#0f766e] pt-2.5 border-t border-[#99f6e4] font-black text-sm">
              <span>Total</span>
              <span>₹20,330</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Analytics & Comparison Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Income, Expense & Saving/Loss Comparison */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-center mb-4">
            <span className="px-6 py-2 border border-sky-200 rounded-full text-sky-900 font-bold text-xs bg-sky-50/50">
              Income, Expense &amp; Saving/Loss Comparison
            </span>
          </div>

          <div className="flex justify-center items-center gap-6 my-4 text-xs font-bold">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span> Income</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span> Expense</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Saving</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span> Loss</span>
          </div>

          <div className="h-64 flex items-end justify-around border-b border-slate-200 pb-2 px-4 gap-6 pt-6">
            <div className="w-16 bg-sky-500 rounded-t-md h-[80%] relative group"></div>
            <div className="w-16 bg-orange-500 rounded-t-md h-[90%] relative group"></div>
            <div className="w-16 bg-emerald-500 rounded-t-md h-[40%] relative group"></div>
            <div className="w-16 bg-rose-600 rounded-t-md h-[25%] relative group"></div>
          </div>
          
          <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100 justify-between items-center">
            <button onClick={onStartRegistration} className="text-xs font-bold text-teal-700 hover:underline">
              + Go to Registration Form →
            </button>
            <button onClick={onShowUserList} className="text-xs font-bold text-slate-700 hover:underline">
              View User Records →
            </button>
          </div>
        </div>

        {/* Right Card: Monthly Trends */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="px-6 py-2 border border-sky-200 rounded-full text-sky-900 font-bold text-xs bg-sky-50/50 mx-auto">
              Monthly Trends (Income, Expense &amp; Saving/Loss)
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>Year</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs outline-none"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 my-4 text-xs font-bold">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span> Loss</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Saving</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span> Expense</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span> Income</span>
          </div>

          <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium">
            {loading ? "Aggregating module metrics..." : `System Active Members: ${metrics.totalMembers} | Total Capital: ${formatIndianCurrency(metrics.shareCapitalPool)}`}
          </div>
        </div>

      </div>

    </div>
  );
}