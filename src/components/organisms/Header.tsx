"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b border-[#E5E0D9]">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-xl font-semibold text-[#722F37] hover:text-[#722F37]/90 transition-colors"
        >
          {siteConfig.brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="h-10 w-[120px] rounded-lg bg-[#722F37] hover:bg-[#722F37]/90"
          >
            <Link href={siteConfig.links.kakao} target="_blank" rel="noopener noreferrer">
              견적 문의
            </Link>
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{siteConfig.brandName}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="lg" className="h-10 rounded-lg bg-[#722F37] hover:bg-[#722F37]/90 mt-4">
                <Link
                  href={siteConfig.links.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  견적 문의
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
