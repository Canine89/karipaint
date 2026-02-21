# 카리페인트(KARI Paint) 디자인 시스템 문서

> 아토믹 디자인 패턴 기반의 재사용 가능한 디자인 문서  
> 참조: [네이버 블로그 - 카리페인트](https://blog.naver.com/karipaint/223423136060)

---

## 1. 브랜드 개요

> 📄 상세 브랜드 스토리: [BRAND_STORY.md](./BRAND_STORY.md)

### 1.1 회사 정체성
- **이름**: 카리페인트 (KARI Paint)
- **대표**: 박용규
- **업종**: 건설업 – 도장 공사업 (경미한 공사)
- **설립**: 2023년 11월 27일
- **핵심 가치**: 성취감, 감동·희열, 지속적 성장, 2대 계승, 공간 가치

### 1.2 브랜드 톤앤매너
- **장인정신형** – 기술 기반, 현장 경험 강조
- **감성 중심** – 고객 만족에서 오는 감동, B2C 감성 브랜딩
- **친근하고 부담 없는** – 편한 채널로 문의 유도 (카톡, 인스타, 톡톡)
- **깔끔하고 정돈된** 시각 언어

### 1.3 디자인 원칙
1. **재사용성(Reusability)**: 모든 컴포넌트는 여러 맥락에서 재사용 가능해야 함
2. **일관성(Consistency)**: 동일한 패턴이 전체 사이트에 적용됨
3. **접근성(Accessibility)**: 색상 대비, 타이포그래피 기준 준수
4. **확장성(Scalability)**: 새 페이지/섹션 추가 시 기존 컴포넌트 활용

---

## 2. Atomic Design 패턴 개요

```
Atoms (원자)     → Molecules (분자)    → Organisms (유기체)    → Templates → Pages
가장 작은 단위       atoms 조합            organisms 조합          레이아웃       구체적 화면
```

| 레벨 | 설명 | 예시 |
|------|------|------|
| **Atoms** | 더 이상 나눌 수 없는 기본 요소 | 버튼, 라벨, 아이콘, 색상 스와치 |
| **Molecules** | 여러 atoms의 조합 | 버튼+아이콘, 카드 헤더, 검색바 |
| **Organisms** | 복잡한 UI 블록 | 헤더, 푸터, 제품 그리드, 히어로 섹션 |
| **Templates** | 페이지 골격 레이아웃 | 홈, 상품, 문의 페이지 템플릿 |
| **Pages** | 실제 콘텐츠가 채워진 화면 | 홈페이지, 제품 상세 페이지 |

---

## 3. Design Tokens (디자인 토큰)

디자인 토큰은 전체 시스템의 **스타일 변수**로, 코드와 디자인 도구에서 공유합니다.

### 3.1 색상 (Color)

> 📄 로고 기반 상세 분석: [COLOR_PALETTE_LOGO_BASED.md](./COLOR_PALETTE_LOGO_BASED.md)

```yaml
# 로고 색상 정체성 반영 (마룬 + 블랙 + 크림)
colors:
  primary:           # 로고 아이콘 - 딥 마룬/버건디
    main: "#722F37"
    light: "#8B3D47"
    dark: "#5A242B"
  
  secondary:         # 참파뉴 골드 - 왕관/프리미엄 포인트
    main: "#B8860B"
    light: "#D4AF37"
    dark: "#8B6914"
  
  neutral:           # 따뜻한 톤 (로고 배경 크림 기준)
    white: "#FFFFFF"
    background: "#FAF8F5"      # 크림 배경 (로고 배경 톤)
    background-alt: "#F5F3EE"
    gray-50: "#FAFAF8"
    gray-100: "#F0EDE8"
    gray-200: "#E5E0D9"
    gray-300: "#D4CFC6"
    gray-400: "#A39E95"
    gray-500: "#6B6359"
    gray-600: "#554D44"
    gray-700: "#3D3630"
    gray-800: "#2A2520"
    gray-900: "#1A1A1A"       # 본문 텍스트 (로고 블랙 근접)
    black: "#000000"
  
  semantic:
    success: "#2E7D32"
    warning: "#B8860B"        # secondary와 통일
    error: "#8B2635"          # 마룬 계열
    info: "#5A242B"
```

### 3.2 타이포그래피 (Typography)

```yaml
typography:
  fontFamily:
    primary: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif"
    heading: "'Pretendard', 'Noto Sans KR', sans-serif"
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  
  # 용도별 폰트 크기
  usage:
    h1: "32-48px (5xl, 4xl)"
    h2: "24px (2xl)"
    h3: "20px (xl)"
    body: "16px (base)"
    caption: "12-14px (xs, sm)"
  
  fontSize:
    xs: "0.75rem"    # 12px
    sm: "0.875rem"   # 14px
    base: "1rem"     # 16px
    lg: "1.125rem"   # 18px
    xl: "1.25rem"    # 20px
    "2xl": "1.5rem"  # 24px
    "3xl": "2rem"    # 32px
    "4xl": "2.5rem"  # 40px
    "5xl": "3rem"    # 48px
  
  fontWeight:
    light: 300
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  
  lineHeight:
    tight: 1.2
    normal: 1.5
    relaxed: 1.75
    loose: 2
```

### 3.3 간격 (Spacing)

```yaml
spacing:
  unit: 4px   # 기본 단위
  scale:
    0: 0px
    1: 4px
    2: 8px
    3: 12px
    4: 16px
    5: 20px
    6: 24px
    8: 32px
    10: 40px
    12: 48px
    16: 64px
    20: 80px
    24: 96px

# 컴포넌트별 간격 적용
componentSpacing:
  cardSection:    # 카드/섹션
    gap: 12-24px
    padding: 20-32px
  formField:     # 폼 필드
    gap: 16px
  buttonGroup:   # 버튼 그룹
    gap: 12px
  cardGrid:      # 카드 그리드
    gap: 16-24px
  pageSection:   # 페이지 섹션
    gap: 24-32px
```

### 3.4 그림자 (Shadow)

```yaml
shadow:
  sm: "0 1px 2px rgba(0,0,0,0.05)"
  base: "0 2px 4px rgba(0,0,0,0.06)"
  md: "0 4px 6px rgba(0,0,0,0.07)"
  lg: "0 10px 15px rgba(0,0,0,0.08)"
  xl: "0 20px 25px rgba(0,0,0,0.1)"
```

### 3.5 모서리 (Border Radius)

```yaml
radius:
  none: 0
  sm: "4px"
  base: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
```

### 3.6 브레이크포인트 (Breakpoints)

```yaml
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  "2xl": 1536px
```

### 3.7 애니메이션 / 모션 (Animation & Motion)

전문성과 신뢰를 살리며, 과하지 않게 적용합니다.

#### 원칙

- **절제된 움직임**: 눈에 띄되 산만하지 않게
- **의미 있는 동작**: 시선 유도, 상태 피드백, 계층 강조
- **접근성**: `prefers-reduced-motion` 존중
- **성능**: CSS/transform 위주, GPU 가속 사용

#### 적용 포인트 (우선순위)

| 우선순위 | 위치 | 애니메이션 | 목적 |
|----------|------|------------|------|
| **P0** | Hero (랜딩) | 제목·서브·CTA 순차 fade-in + slide-up | 첫 인상, 시선 집중 |
| **P0** | CTA 버튼 (견적 문의하기, 카카오톡) | hover: scale(1.02), transition 200ms | 클릭 유도 |
| **P0** | 포트폴리오 카드 | hover: shadow 상승, 이미지 약간 scale(1.05) | 시공 사례 강조 |
| **P1** | TrustBadges | 스크롤 시 stagger fade-in (0.1s 간격) | 신뢰 요소 강조 |
| **P1** | 견적 문의 3단계 | 스크롤 시 순차 나타남 (1→2→3) | 절차 이해 유도 |
| **P1** | 헤더 | 스크롤 시 배경 opacity·shadow 변화 (sticky) | 네비게이션 가독성 |
| **P2** | InquiryBanner | CTA 버튼 subtle pulse (2s 주기) | 문의 유도 |
| **P2** | 페이지 전환 | fade 또는 short slide | 페이지 변경 부드러움 |

#### 토큰 (CSS 변수 예시)

```yaml
motion:
  duration:
    fast: "150ms"    # 버튼 hover
    normal: "300ms"  # 카드, 섹션 전환
    slow: "500ms"    # 페이지 로드, Hero
  easing:
    default: "cubic-bezier(0.4, 0, 0.2, 1)"
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)"
    out: "cubic-bezier(0, 0, 0.2, 1)"
  delay:
    stagger: "100ms"  # 연속 요소 간 간격
```

#### 적용하지 않을 대상

- Footer, 본문 텍스트 블록, FAQ 답변
- 자동 재생되는 과한 애니메이션
- 깜빡임·회전 등 시선을 심하게 끄는 효과

---

## 4. 문서 구조

```
docs/
├── DESIGN_SYSTEM.md      ← 본 문서 (브랜드, 토큰, 원칙)
├── BRAND_STORY.md        ← 회사 스토리, 방향성, 문의 채널
├── CONTACT_LINKS.md      ← 문의 링크 placeholder (배포 시 입력)
├── COMPONENT_INDEX.md    ← 전체 컴포넌트 빠른 참조
├── atoms/               ← Atoms 상세
├── molecules/           ← Molecules 상세
├── organisms/           ← Organisms 상세
├── templates/           ← Templates 상세
└── pages/               ← Pages 인벤토리
```

**디자인 토큰 JSON**: 프로젝트 루트의 `design-tokens.json` (코드/도구 연동용)  
**시각 디자인**: `pencil-new.pen` (Pencil – 문서와 동기화된 시각적 디자인 시스템)

---

## 5. 브랜드 소스 및 문의 채널

- [카리페인트 네이버 블로그 - About KARI Paint](https://blog.naver.com/karipaint/223423136060)
- **문의 채널**: 카카오톡 1:1, 인스타그램 DM, 네이버 톡톡 (자세한 내용은 `docs/BRAND_STORY.md` 참조)

