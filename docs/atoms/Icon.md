# Atom: Icon

## 개요
아이콘 세트에서 단일 아이콘을 렌더링하는 컴포넌트.  
일관된 크기, 색상, 접근성을 보장.

## 권장 아이콘 세트
- Heroicons, Lucide, Phosphor 중 택 1 (일관성 유지)
- SVG 기반, 스케일 가능

## Sizes
- `xs`: 16px
- `sm`: 20px
- `md`: 24px
- `lg`: 32px
- `xl`: 40px

## Props

```typescript
interface IconProps {
  name: string;            // 아이콘 이름
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;         // CSS color
  ariaLabel?: string;     // 접근성
  className?: string;
}
```

## 카리페인트 권장 아이콘
- `palette` – 색상/제품
- `brush` – 도장/시공
- `home` – 인테리어
- `truck` – 배송
- `phone` / `mail` – 연락
- `chevron-down` / `arrow-right` – 네비게이션
