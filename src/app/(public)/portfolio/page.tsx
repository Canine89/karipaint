import Image from "next/image";
import { portfolioRepository } from "@/lib/repositories";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/organisms/Hero";

export const metadata = {
  title: "작업 결과물 | 카리페인트",
  description: "공간을 변화시킨 시공 사례 갤러리",
};

export default async function PortfolioPage() {
  const portfolios = await portfolioRepository.getAll();

  return (
    <>
      <Hero
        variant="compact"
        title="작업 결과물"
        subtitle="공간을 변화시킨 시공 사례"
        showCta={false}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((item) => (
              <Card key={item.id} className="overflow-hidden" id={item.id}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={item.imageUrl.includes("placehold")}
                  />
                  <Badge className="absolute top-2 left-2 bg-primary/90">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                    <span>{item.region}</span>
                    <span>·</span>
                    <span>{item.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
