"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image, HelpCircle, MessageSquare, Menu, X } from "lucide-react";

const adminNav = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "포트폴리오", href: "/admin/portfolio", icon: Image },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "고객 후기", href: "/admin/reviews", icon: MessageSquare },
] as const;

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const NavContent = () => (
    <>
      <div className="p-4 border-b border-border">
        <Link
          href="/admin"
          className="font-semibold text-primary"
          onClick={() => setOpen(false)}
        >
          카리페인트 관리자
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {adminNav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === href || (href !== "/admin" && pathname.startsWith(href))
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(false)}
        >
          사이트로 돌아가기
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* 모바일: 상단 헤더 + 햄버거 버튼 */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/admin" className="font-semibold text-primary text-sm">
          카리페인트 관리자
        </Link>
        <div className="w-10" />
      </header>

      {/* 모바일: 슬라이드 오버레이 메뉴 */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="메뉴"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-background border-r border-border flex flex-col shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-semibold text-primary">메뉴</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="메뉴 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* 데스크톱: 고정 사이드바 */}
      <aside className="hidden md:flex w-56 shrink-0 border-r border-border bg-muted/30 flex-col min-h-screen">
        <NavContent />
      </aside>
    </>
  );
}
