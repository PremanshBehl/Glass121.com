import RatesDashboard from "@/components/Rates/RatesDashboard";

export const metadata = {
  title: "Daily Rates | Glass121",
  description: "Real-time glass pricing updates and historical trends.",
};

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <RatesDashboard />
    </div>
  );
}
