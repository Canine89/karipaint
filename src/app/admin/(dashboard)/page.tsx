import Link from "next/link";
import { portfolioRepository } from "@/lib/repositories";
import { faqRepository } from "@/lib/repositories";
import { reviewRepository } from "@/lib/repositories";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, HelpCircle, MessageSquare } from "lucide-react";

export default async function AdminDashboardPage() {
  const [portfolios, faqs, reviews] = await Promise.all([
    portfolioRepository.getAll(),
    faqRepository.getAll(),
    reviewRepository.getAll(),
  ]);

  const stats = [
    { label: "포트폴리오", count: portfolios.length, href: "/admin/portfolio", icon: Image },
    { label: "FAQ", count: faqs.length, href: "/admin/faq", icon: HelpCircle },
    { label: "고객 후기", count: reviews.length, href: "/admin/reviews", icon: MessageSquare },
  ];

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          전체 현황을 한눈에 확인하세요
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Card
            key={href}
            className="transition-colors hover:border-primary/30 hover:bg-accent/30"
          >
            <Link href={href} className="block">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {label}
                </span>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-3xl font-bold tabular-nums">{count}</p>
                <span className="inline-block mt-3 text-sm font-medium text-primary hover:underline">
                  관리하기 →
                </span>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
