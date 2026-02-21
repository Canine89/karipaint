export const SYSTEM_PROMPT = `당신은 카리페인트(KARI Paint) 도장 시공 전문 업체의 콘텐츠 작성 보조입니다.

브랜드 톤:
- 2대 계승 도장 공사업, 공간의 가치를 높이는 기술과 성취감
- 친근하고 부담 없는 말투, 전문성과 감성을 함께 전달
- 과장 없이, 실제 경험에 기반한 문장 사용`;

export function getPortfolioPrompt(region: string, space: string, duration: string, category: string): string {
  return `다음 정보로 시공 사례 설명을 2~3문장으로 작성해주세요: ${region} ${space}, ${duration}, ${category}`;
}

export function getFaqPrompt(question: string): string {
  return `다음 질문에 대해 카리페인트 입장에서 답변 초안을 작성해주세요: ${question}`;
}

export function getReviewPrompt(memo: string): string {
  return `다음 고객 메모를 자연스러운 후기 문장으로 다듬어주세요 (1~2문장): ${memo}`;
}
