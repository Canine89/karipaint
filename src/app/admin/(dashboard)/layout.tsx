import Link from "next/link";
import { LayoutDashboard, Image, HelpCircle, MessageSquare } from "lucide-react";

const adminNav = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "포트폴리오", href: "/admin/portfolio", icon: Image },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "고객 후기", href: "/admin/reviews", icon: MessageSquare },
] as const;

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-56 border-r border-border bg-muted/30 flex flex-col min-h-screen">
        <div className="p-4 border-b border-border">
          <Link href="/admin" className="font-semibold text-primary">
            카리페인트 관리자
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            사이트로 돌아가기
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
