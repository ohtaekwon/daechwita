## Server Repo (Back-End)

```

📦src
 ┣ 📂middleware
 ┃ ┣ 📜authMiddleware.ts // auth인증 미들웨어
 ┣ 📂routes
 ┃ ┣ 📜resumes.ts // 자기소개서 데이터 관련 Router
 ┃ ┣ 📜schedules.ts // 입사지원현황 데이터 관련 Router
 ┃ ┣ 📜totalChart.ts // 전체 차트 데이터 조회 관련 Router
 ┃ ┗ 📜usersChart.ts // 유저의 차트 데이터 조회 관련 Router
 ┣ 📜firebase.ts // Firebase Config
 ┣ 📜firebaseAdmin.ts // Firebase admin config
 ┣ 📜index.ts // server 실행
 ┗ 📜serviceAccountKey.json // Firebase admin service key
```
