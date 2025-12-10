import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header without sidebar toggle */}
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center bg-slate-100">
        <h1 className="text-4xl font-bold mb-6 uppercase">
          Welcome to PARK Company
        </h1>
        <p className="text-center mb-6">Your future dashboard awaits.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enter
        </button>
      </main>
    </div>
  );
}
