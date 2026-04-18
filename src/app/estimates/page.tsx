import QuoteGenerator from "@/components/Estimate/QuoteGenerator";

export const metadata = {
  title: "Quote Estimator | Glass121",
  description: "Get instant pricing based on daily market rates for your glass requirements.",
};

export default function EstimatesPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <QuoteGenerator />
    </div>
  );
}
