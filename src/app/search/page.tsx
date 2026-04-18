import SmartFinder from "@/components/AIMatching/SmartFinder";

export const metadata = {
  title: "AI Glass Matcher | AmalGus",
  description: "Describe your need in plain language, and our AI will recommend the perfect glass.",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <SmartFinder />
    </div>
  );
}
