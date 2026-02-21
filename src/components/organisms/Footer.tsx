import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { company } = siteConfig;
  return (
    <footer className="bg-[#1A1A1A] py-8">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
          <span className="text-sm text-white font-normal">
            {siteConfig.brandName}
          </span>
          <span className="hidden md:inline text-[#6B6359]">|</span>
          <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-[#6B6359]">
            <Link href="/inquiry" className="hover:text-white transition-colors">
              견적 문의
            </Link>
            <span>|</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">
              작업 결과물
            </Link>
            <span>|</span>
            <span>건설업 도장 공사</span>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-[#333] flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-4 text-xs text-[#6B6359] text-center md:text-left">
          <span>대표: {company.ceo}</span>
          <span className="hidden md:inline">|</span>
          <span>법인명: {company.name}</span>
          <span className="hidden md:inline">|</span>
          <span>사업자등록번호: {company.businessNumber}</span>
          <span className="hidden md:inline">|</span>
          <span>주소: {company.address}</span>
          <span className="hidden md:inline">|</span>
          <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-white transition-colors">
            연락처: {company.phone}
          </a>
          <span className="hidden md:inline">|</span>
          <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
            이메일: {company.email}
          </a>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/admin/login"
            className="text-[#444] text-[11px] hover:text-[#666] transition-colors"
          >
            관리자
          </Link>
        </div>
      </div>
    </footer>
  );
}
