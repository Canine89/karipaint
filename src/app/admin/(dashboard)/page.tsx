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
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">대시보드</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Card key={href}>
            <CardHeader className="flex flex-row items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{count}</p>
              <Button asChild variant="link" className="mt-2 p-0 h-auto">
                <Link href={href}>관리하기</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
