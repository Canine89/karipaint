import { MapPin, Square, Paintbrush, ImageIcon } from "lucide-react";
import { faqRepository } from "@/lib/repositories";
import { Hero } from "@/components/organisms/Hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InquiryBanner } from "@/components/organisms/InquiryBanner";

export const metadata = {
  title: "견적 문의 | 카리페인트",
  description: "편한 방법으로 언제든 문의하세요. 카카오톡, 인스타 DM으로 빠르게 상담 가능합니다.",
};

const INQUIRY_ITEMS = [
  { icon: MapPin, label: "지역·공간", example: "서울 중랑구 / 아파트·상가·사무실" },
  { icon: Square, label: "전체 평수", example: "20평, 30평" },
  { icon: Paintbrush, label: "시공 면", example: "벽만, 천장만, 문·문틀, 전체" },
  { icon: ImageIcon, label: "현장 사진", example: "노출 천장·벽(옹벽) 등" },
] as const;

export default async function InquiryPage() {
  const faqs = await faqRepository.getAll();

  return (
    <>
      <Hero
        variant="compact"
        title="견적 문의"
        subtitle="카카오톡·인스타 DM으로 빠르게 상담해 드립니다"
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-xl mx-auto space-y-10">
            {/* 연락 채널 */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                연락 채널
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                아래 버튼으로 연락 주시면 실시간 상담이 가능합니다.
              </p>
              <InquiryBanner compact />
            </div>

            {/* 문의 시 알려주실 내용 */}
            <div className="rounded-lg border border-[#E5E0D9] bg-[#FAF8F5] px-5 py-5">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                문의 시 알려주실 내용
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                아래 정보를 함께 보내주시면 빠른 견적 상담이 가능합니다.
              </p>
              <div className="grid gap-3">
                {INQUIRY_ITEMS.map(({ icon: Icon, label, example }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 text-sm py-2 border-b border-[#E5E0D9]/60 last:border-0"
                  >
                    <Icon
                      className="h-4 w-4 text-[#722F37]/60 shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div>
                      <span className="font-medium text-foreground">{label}</span>
                      <span className="text-muted-foreground"> · {example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 견적 절차 */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                견적 절차
              </h2>
              <ol className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#722F37]/10 text-xs font-medium text-[#722F37]">1</span>
                  <span>연락 주시면 현장 방문 일정을 조율합니다</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#722F37]/10 text-xs font-medium text-[#722F37]">2</span>
                  <span>현장 확인 후 상세 견적을 제출해 드립니다</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#722F37]/10 text-xs font-medium text-[#722F37]">3</span>
                  <span>견적 확인 후 시공 일정을 협의합니다</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-[#F5F3EE]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-xl mx-auto">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                자주 묻는 질문
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
