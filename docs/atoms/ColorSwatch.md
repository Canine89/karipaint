# Atom: ColorSwatch

## 개요
**카리페인트 특화** – 페인트 색상 코드를 시각적으로 표현하는 원형/사각형 스와치.  
제품 카드, 색상 선택기, 샘플 북 등에서 재사용.

## Variants

| Variant | 형태 | 용도 |
|---------|------|------|
| `circle` | 원형 | 작은 미리보기, 목록 아이템 |
| `square` | 정사각형 | 그리드, 카달로그 |
| `rounded` | 둥근 사각형 | 카드 내 샘플 |

## Sizes
- `sm`: 24px
- `md`: 40px
- `lg`: 64px

## Props

```typescript
interface ColorSwatchProps {
  color: string;           // hex, rgb 등
  variant?: 'circle' | 'square' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  hexCode?: string;        // hover 시 툴팁 또는 라벨
  selected?: boolean;      // 선택 시 테두리 강조
}
```
