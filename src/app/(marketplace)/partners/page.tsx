import PartnerListing from "@/components/Partners/PartnerListing";

export const metadata = {
  title: "Service Partners | Glass121",
  description: "Find verified installers and service professionals in your area.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <PartnerListing />
    </div>
  );
}

