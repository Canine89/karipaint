# Molecule: SearchBar

## 구성 Atoms
- Input (검색 입력)
- Icon (search)
- Button (검색/초기화)

## 용도
- 제품 검색
- 색상 코드 검색
- 블로그/뉴스 검색

## Props

```typescript
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  showClearButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

## 레이아웃
```
[🔍 입력 필드........................] [검색]
```
