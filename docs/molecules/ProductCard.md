# Molecule: ProductCard

## 구성 Atoms
- ColorSwatch (또는 이미지 영역)
- Label (제품명, 코드)
- Badge (할인, 신제품 등)
- Button (자세히 보기)

## 용도
- 제품 목록 그리드
- 추천 제품
- 색상 팔레트 미리보기

## Props

```typescript
interface ProductCardProps {
  title: string;
  code?: string;           // 색상 코드 등
  color?: string;         // ColorSwatch용
  image?: string;         // 대체 이미지
  badge?: { text: string; variant: BadgeVariant };
  href?: string;
  onClick?: () => void;
}
```
