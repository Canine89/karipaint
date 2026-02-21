import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            카리페인트를 소개합니다
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {siteConfig.description}
          </p>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            <li>✓ 내 손으로 공간을 가치 있게 만들어가는 성취감</li>
            <li>✓ 공간에 만족하는 고객에게서 오는 감동</li>
            <li>✓ 새로운 기술을 배우며 계속 성장하는 일</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
