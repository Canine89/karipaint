# Molecule: FormField

## 구성 Atoms
- Label
- Input (또는 Textarea, Select)
- Optional: 에러 메시지, 도움말 텍스트

## 용도
- 연락처 폼
- 견적 요청 폼
- 회원가입/로그인

## Props

```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  // ... Input props 전달
}
```
