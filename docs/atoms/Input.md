# Atom: Input

## 개요
텍스트 입력 필드. 폼, 검색 등에 사용.

## Variants
- `text` – 일반 입력
- `email` – 이메일
- `tel` – 전화번호
- `number` – 숫자
- `password` – 비밀번호

## States
- default / focus / error / disabled / readonly

## Props

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  // ...
}
```
