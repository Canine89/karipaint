# 컴포넌트 인덱스 (빠른 참조)

## Atoms → Molecules → Organisms → Templates → Pages

### Atoms (`docs/atoms/`)
| 컴포넌트 | 용도 |
|----------|------|
| Button | CTA, 폼 제출 |
| ColorSwatch | 페인트 색상 미리보기 |
| Icon | 아이콘 표시 |
| Input | 텍스트 입력 |
| Label | 제목/설명 |
| Link | 내부/외부 링크 |
| Badge | 태그/상태 |
| Divider | 구분선 |
| Spacer | 여백 |

### Molecules (`docs/molecules/`)
| 컴포넌트 | 구성 Atoms | 용도 |
|----------|------------|------|
| SearchBar | Input, Icon, Button | 검색 |
| FormField | Label, Input | 폼 필드 |
| ProductCard | ColorSwatch, Label, Badge, Button | 제품 카드 |
| ContactCta | Icon, Label, Link | 연락 CTA |
| NavItem | Link, Icon, Badge | 네비게이션 |
| CardHeader | Label, Button, Badge | 카드 헤더 |
| ColorPreview | ColorSwatch, Label | 색상 상세 보기 |

### Organisms (`docs/organisms/`)
| 컴포넌트 | 구성 | 용도 |
|----------|------|------|
| Header | 로고, NavItem[], SearchBar, ContactCta | 전역 헤더 |
| Footer | 링크, ContactCta, SNS | 전역 푸터 |
| Hero | 배경, Label, Button | 메인 배너 |
| ProductGrid | CardHeader, ProductCard[] | 제품 목록 |
| ContactForm | FormField[] | 문의 폼 |
| ColorPaletteSection | ColorPreview[] | 색상 섹션 |
| TrustBadges | Icon+Label | 신뢰 요소 |
| InquiryBanner | ContactCta[] | 견적 문의 배너 (카톡/인스타/톡톡) |

### Templates (`docs/templates/`)
| 템플릿 | Organisms | 적용 페이지 |
|--------|-----------|-------------|
| HomeTemplate | Hero, TrustBadges, ProductGrid, ColorPalette, ContactForm, Footer | 홈 |
| ProductListTemplate | SearchBar, ProductGrid, Pagination | 제품 목록 |
| ProductDetailTemplate | ColorPreview, ProductGrid, ContactForm | 제품 상세 |
| ContactTemplate | ContactForm, ContactCta, InquiryBanner | 문의/견적 |
