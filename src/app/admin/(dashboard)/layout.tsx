import { AdminSidebar } from "./AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pt-16 md:pt-8 min-w-0">
        <div className="max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}
