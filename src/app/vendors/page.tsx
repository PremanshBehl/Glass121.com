import VendorComparison from "@/components/Vendors/VendorComparison";

export const metadata = {
  title: "Compare Vendors | Glass121",
  description: "Compare glass prices, ratings, and delivery times from multiple vendors.",
};

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <VendorComparison />
    </div>
  );
}
