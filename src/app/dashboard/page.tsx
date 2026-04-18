import UserDashboard from "@/components/Dashboard/UserDashboard";

export const metadata = {
  title: "Dashboard | Glass121",
  description: "Manage your glass orders, quotes, and account settings.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-primary-dark border-t border-white/5">
      <UserDashboard />
    </div>
  );
}
