# Atom: Button

## 개요
사용자 행동을 유도하는 클릭 가능한 버튼 요소.

## Variants (변형)

| Variant | 용도 | 스타일 |
|---------|------|--------|
| `primary` | 주요 CTA (문의하기, 신청하기 등) | primary 색상 배경 |
| `secondary` | 부가 행동 | outline 또는 secondary 색상 |
| `ghost` | 보조/덜 강조된 행동 | 투명 배경, 호버 시 배경 |
| `danger` | 삭제, 경고 행동 | error 색상 |

## Sizes (크기)

| Size | 높이 | 패딩 | 폰트 크기 |
|------|------|------|-----------|
| `sm` | 32px | 8px 16px | 14px |
| `md` | 40px | 12px 24px | 16px |
| `lg` | 48px | 16px 32px | 18px |

## States (상태)
- `default` / `hover` / `active` / `disabled` / `loading`

## Props (속성)

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

## 사용 예시
- 폼 제출
- 네비게이션 링크
- 모달 확인/취소
- 카드 내 CTA
