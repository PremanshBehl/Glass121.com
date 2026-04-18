import VendorComparison from "@/components/Vendors/VendorComparison";

export const metadata = {
  title: "Compare Vendors | AmalGus",
  description: "Compare glass prices, ratings, and delivery times from multiple vendors.",
};

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <VendorComparison />
    </div>
  );
}
