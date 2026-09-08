import { useState } from "react";
import "./App.css";
import "./banking.css";
import Navbar from "./Components/navbar";
import Dashboard from "./Components/Dashboard";
import RegistrationForm from "./Components/registration/RegistrationForm";

function App() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="app-shell min-h-screen bg-[#eef2ef]">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <div className="app-content min-h-[calc(100vh-72px)]">
        {activeView === "dashboard" ? (
          <Dashboard
            onStartRegistration={() => setActiveView("registration")}
          />
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
}

export default App;
