# 구현 시 참고 사항

> Pencil 디자인(pencil-new.pen)을 코드로 구현할 때 고려할 점

---

## 1. 텍스트 오버플로우 (Text Overflow)

### 1.1 디자인 적용 내용

- **텍스트 노드에 `width: fill_container` 적용**: 모든 본문·설명·제목 텍스트는 부모 컨테이너 너비에 맞춰 줄바꿈되도록 설정함
- **대상 영역**: Hero, 견적 문의 단계 설명, 작업 결과물 카드, 인쿼리 배너, 헤더/푸터 등

### 1.2 구현 시 CSS 적용

| 상황 | 권장 CSS (Tailwind) | 비고 |
|------|---------------------|------|
| **다중 줄 줄바꿈** | `w-full break-words` | 한글: `break-keep` (word-break: keep-all)로 단어 중간 끊김 방지 가능 |
| **단일 줄 말줄임** | `truncate` 또는 `overflow-hidden text-ellipsis whitespace-nowrap` | 제목 등 고정 1줄일 때 |
| **N줄 말줄임** | `line-clamp-{n}` (Tailwind 3.3+) | `display: -webkit-box; -webkit-line-clamp: n` |
| **flex 자식 텍스트** | 부모에 `min-w-0` 또는 텍스트에 `min-w-0` | flex 아이템이 넘칠 때 shrink 허용 |

### 1.3 구체 적용 예시

```css
/* 본문/설명 텍스트 - 줄바꿈 */
.text-body {
  width: 100%;
  overflow-wrap: break-word;
  word-break: keep-all; /* 한글 단어 경계 유지 */
}

/* 카드 제목 - 2줄 말줄임 */
.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 네비/버튼 라벨 - 1줄 말줄임 */
.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 1.4 모바일(375px) 특별 주의

- **견적 문의 단계 본문**: 375px에서 2~3줄 이상 될 수 있음 → `min-height`보다 `min-h-0` 권장
- **Hero 제목**: "공간의 가치를 높이는, 내 손으로 완성하는" → 모바일에서 2줄 자연 줄바꿈
- **카드 설명**: "아파트 거실·방 벽면 도장" 등 → `line-clamp-2` 고려

---

## 2. 반응형 브레이크포인트

| 구분 | 너비 | 적용 |
|------|------|------|
| 모바일 | 375px | 세로 스택, 단일 열 |
| 태블릿 | 640px ~ 1023px | 2열 그리드 등 |
| PC | 1024px+ | 3열 그리드, 2열 레이아웃 |

---

## 3. 접근성

- 색상 대비: Primary(#722F37), Secondary(#B8860B) 대비 검증
- 포커스 링크/버튼: `focus:ring-2 focus:ring-offset-2` 등 명시적 포커스 스타일
- 이미지: alt 텍스트 필수

---

## 4. 애니메이션 구현

- **디자인 시스템 참고**: [DESIGN_SYSTEM.md §3.7](./DESIGN_SYSTEM.md#37-애니메이션--모션-animation--motion)
- **접근성**: `@media (prefers-reduced-motion: reduce)` 시 애니메이션 축소 또는 비활성화
- **권장**: CSS `transition`, `transform`, `opacity` 위주로 구현

---

## 5. 관련 문서

- [SCREEN_PLAN.md](./SCREEN_PLAN.md) – 화면 구성
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) – 디자인 토큰·컴포넌트·애니메이션
- [design-tokens.json](../design-tokens.json) – 색상·간격 등 토큰
