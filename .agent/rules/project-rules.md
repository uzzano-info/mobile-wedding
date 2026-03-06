# Mobile Wedding Invitation Project Rules

## 프로젝트 특성
- **모바일 전용** 세로 레이아웃 (max-width: 430px)
- 데스크톱에서는 중앙 모바일 프레임으로 표시
- 감성적 프리미엄 스타일의 모바일 청첩장

## 디자인 규칙
- CSS Custom Properties 필수 사용 (하드코딩 금지)
- 폰트: Cormorant Garamond (서양 세리프) + Noto Serif KR (한국 세리프) + Pretendard (산스세리프)
- 팔레트: 따뜻한 베이지/크림 톤 (#FAF8F5, #F3EDE6, #B8A694)
- 애니메이션: transform, opacity만 사용 (reflow 유발 속성 금지)

## JavaScript 규칙
- 모듈 단일 책임 원칙 (main, countdown, petals, calendar 분리)
- Intersection Observer 기반 스크롤 페이드인
- Canvas 애니메이션은 viewport 진입 시에만 실행 (성능 최적화)
- 접근성: aria-label, semantic HTML 필수

## 파일 구조
```
mobile-wedding/
├── index.html
├── css/style.css
├── js/ (main, countdown, petals, calendar)
└── images/ (hero + couple photos)
```
