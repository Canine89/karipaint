"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  HelpCircle,
  MessageSquare,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const adminNav = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "포트폴리오", href: "/admin/portfolio", icon: Image },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "고객 후기", href: "/admin/reviews", icon: MessageSquare },
] as const;

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <>
      {/* 모바일: 상단 고정 헤더 */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center h-10 w-10 -ml-1 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="flex-1 text-center font-semibold text-sm text-foreground truncate px-2">
          카리페인트 관리자
        </span>
        <div className="w-10" />
      </header>

      {/* 모바일: 슬라이드 오버레이 메뉴 */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-visibility ${
          open ? "visible" : "invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="관리자 메뉴"
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 max-w-[80vw] bg-background flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* 메뉴 헤더 */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-border shrink-0">
            <Link
              href="/admin"
              className="font-semibold text-primary"
              onClick={close}
            >
              카리페인트
            </Link>
            <button
              type="button"
              onClick={close}
              className="flex items-center justify-center h-10 w-10 -mr-1 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all"
              aria-label="메뉴 닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {adminNav.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={`flex items-center gap-3 rounded-lg px-3 py-3.5 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          {/* 하단 */}
          <div className="p-3 border-t border-border shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent transition-colors"
              onClick={close}
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              사이트로 돌아가기
            </Link>
          </div>
        </aside>
      </div>

      {/* 데스크톱: 고정 사이드바 */}
      <aside className="hidden md:flex w-56 shrink-0 border-r border-border bg-muted/30 flex-col min-h-screen">
        <div className="h-14 px-5 flex items-center border-b border-border shrink-0">
          <Link href="/admin" className="font-semibold text-primary">
            카리페인트 관리자
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            사이트로 돌아가기
          </Link>
        </div>
      </aside>
    </>
  );
}
