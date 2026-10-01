# PJSoftTech Private Members Savings & Loan Group

A professional, institutional-grade "classic banking" financial management application designed for private savings and loan groups. Built with a robust dashboard-driven admin interface, it integrates real-time data streaming, automated postal lookups, comprehensive financial ledgers, and loan amortization tools.

---

## 🏛️ Key Features

* **Classic Institutional UI**: Styled with Tailwind CSS using professional serif typography, tabular numbers, and institutional dark/pastel color palettes inspired by Bloomberg and TradingView.
* **Master Dashboard & Live Market Chart**: Aggregates net profit, savings pools, and capital metrics alongside a real-time animated market wave chart with OHLCV ticker stats and interactive crosshair inspection.
* **Smart Member Registration**: Features instant postal code integration (India Post API) that automatically fetches and populates **District**, **Taluka / Block**, and **State** upon entering a 6-digit Pincode.
* **Advanced Transaction & Member Ledger**: Equipped with multi-criteria filters, reference-style summary pill badges (**Total GST**, **Total TDS**, **Paid**, **Pending**, **Expense Refund**, **Total Income**), and an interactive Member Financial Statement modal showing loan dues and payment histories.
* **Shares Capital Registry**: Tracks ordinary, preference, and founder shares with folio ID generation, share quantities, face values, and capital pool calculations.
* **Loan Amortization & EMI Calculator**: Computes precise monthly repayment schedules with a month-by-month principal, interest, and remaining balance breakdown table.

---

## ⚙️ Tech Stack

* **Frontend**: React.js, Vite, Tailwind CSS (located in `/frontend`)
* **Backend**: Java Spring Boot, MySQL Database (located in `/backend`)
* **APIs**: India Post Pincode Geocoding API

---

## 🚀 Getting Started & Project Structure

Your project is organized into two primary root directories:

```text
PJ-softTech-Private-Members-Savings-Loan-Group/
├── frontend/    # React.js Vite Application
└── backend/     # Java Spring Boot API Server