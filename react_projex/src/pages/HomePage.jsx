import Header from "../components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header without sidebar toggle */}
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center bg-slate-200">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <p className="text-center">
          This is your home page after entering from landing.
        </p>
      </main>
    </div>
  );
}
