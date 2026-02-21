/**
 * 사이트 정적 설정
 * 환경 변수: NEXT_PUBLIC_KAKAO_URL, NEXT_PUBLIC_INSTAGRAM_URL
 */

export const siteConfig = {
  name: "카리페인트",
  brandName: "KARI Paint",
  tagline: "2대째 이어진 도장 시공",
  description:
    "공간의 가치를 높이는, 내 손으로 완성하는. 카리페인트는 2대째 이어진 도장 공사업을 기반으로 공간의 가치를 높이는 기술과 성취감을 중심 철학으로 운영됩니다.",
  company: {
    name: "카리페인트 (KARI Paint)",
    ceo: "박용규",
    businessNumber: "250-04-03158",
    taxOffice: "성북세무서",
    address: "서울특별시 성북구 성북로 123 카리빌딩 1층",
    phone: "010-9890-6678",
    email: "karipaint@naver.com",
  },
  links: {
    kakao: process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/여기에링크입력",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/계정아이디",
    naverTalk: "#",
  },
  nav: [
    { label: "홈", href: "/" },
    { label: "견적 문의", href: "/inquiry" },
    { label: "작업 결과물", href: "/portfolio" },
  ],
} as const;
