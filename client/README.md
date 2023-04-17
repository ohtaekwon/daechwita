## Client Reop (Front-End)

```
📦src
 ┣ 📂components
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜handler.ts
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜index.types.ts
 ┃ ┃ ┣ 📜LogIn.tsx
 ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂Background
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Card
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Chart
 ┃ ┃ ┣ 📜index.options.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Column
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Layout
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂ProgressBar
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┣ 📂Search
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Skeleton
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┃ ┗ 📂Spinner
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜index.types.ts
 ┣ 📂hooks
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📜useGoBack.ts
 ┃ ┃ ┣ 📜useInput.ts
 ┃ ┃ ┣ 📜useInputReducer.ts
 ┃ ┃ ┣ 📜useInterSection.ts
 ┃ ┃ ┣ 📜useItems.ts
 ┃ ┃ ┣ 📜useLogout.ts
 ┃ ┃ ┣ 📜useResumes.ts
 ┃ ┃ ┗ 📜useSpeech.ts
 ┃ ┣ 📂auto
 ┃ ┃ ┗ 📜useAutoHeightTextarea.ts
 ┃ ┗ 📂dnd
 ┃ ┃ ┣ 📜useColumn.ts
 ┃ ┃ ┣ 📜useColumnDragAndDrop.ts
 ┃ ┃ ┗ 📜useColumnDrop.ts
 ┣ 📂lib
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┣ 📜charts.ts
 ┃ ┃ ┃ ┣ 📜resumes.ts
 ┃ ┃ ┃ ┣ 📜schedules.ts
 ┃ ┃ ┃ ┣ 📜tempResumes.ts
 ┃ ┃ ┃ ┗ 📜users.ts
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┣ 📜getResumes.ts
 ┃ ┃ ┃ ┗ 📜getSchedulesList.ts
 ┃ ┃ ┗ 📂utils
 ┃ ┃ ┃ ┣ 📜global.ts
 ┃ ┃ ┃ ┣ 📜helpers.ts
 ┃ ┃ ┃ ┣ 📜instance.ts
 ┃ ┃ ┃ ┗ 📜methods.ts
 ┃ ┗ 📂firebase
 ┃ ┃ ┣ 📜firebase.config.ts
 ┃ ┃ ┣ 📜mapUserData.ts
 ┃ ┃ ┣ 📜userCookies.ts
 ┃ ┃ ┗ 📜useUser.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜MyDataCharts.tsx
 ┃ ┃ ┗ 📜TotalDataCharts.tsx
 ┃ ┣ 📂Interview
 ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂WriteResume
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜Memorized.tsx
 ┃ ┃ ┣ 📜WriteResumeAdditionalSelect.tsx
 ┃ ┃ ┣ 📜WriteResumeForm.tsx
 ┃ ┃ ┣ 📜WriteResumeImageBox.tsx
 ┃ ┃ ┗ 📜WriteResumeOptionBox.tsx
 ┃ ┣ 📜Auth.tsx
 ┃ ┣ 📜Resumes.tsx
 ┃ ┣ 📜Schedules.tsx
 ┃ ┗ 📜TempResumes.tsx
 ┣ 📂routes
 ┃ ┣ 📜AuthCompletedRouter.tsx
 ┃ ┣ 📜DefaultRouter.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂store
 ┃ ┗ 📜atoms.ts
 ┣ 📂styles
 ┃ ┣ 📜globalStyles.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┣ 📜chart.ts
 ┃ ┣ 📜emotion.d.ts
 ┃ ┣ 📜resumes.ts
 ┃ ┗ 📜schedule.ts
 ┣ 📂utils
 ┃ ┣ 📜constants.ts
 ┃ ┣ 📜helpers.ts
 ┃ ┣ 📜media.ts
 ┃ ┗ 📜validate.ts
 ┣ 📂_common
 ┃ ┗ 📂components
 ┃ ┃ ┣ 📂Badge
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Box
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Flex
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Form
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Grid
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Icons
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Section
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┣ 📂Text
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┃ ┃ ┗ 📂Textarea
 ┃ ┃ ┃ ┣ 📜index.styles.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.types.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜queryClient.ts
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts

```

- `_common` : 공통 라이브러리, 코드, 컴포넌트를 담고 있는 폴더로 수정을 지양 component폴더에는 프로젝트에 기반이 되는 컴포넌트들이 있습니ㅏㄷ.

  - `e.g : Box, Flex, Grid, Section ...`

- `components`: 프로젝트에서 사용하는 컴포넌트로 `Auth` , `Card`, `Chart`, `Column`, `Layout`, `Header` 컴포넌트 등
- `lib` : 프로젝트에서 사용하는 `api` 와 `firebase` config를 모아둔 폴더
  - `api` : 서버와 통신하는 REST API
  - `utils` : Axios에 대한 instance, error handling 함수, HTTP 통신 모듈을 위한 methods 함수
  - `service` : Response로 오는 데이터를 정제하는 기능을 담당
- `hooks` : 프로젝트에서 사용하는 hook을 모아놓은 폴더
  - `app` : 프로젝트 전반적으로 사용하는 훅
  - `dnd` : Drag & Drop에서 사용하는 훅
- `pages` : 애플리케이션의 페이지를 나타내는 폴더
- `store` : 애플리케이션에서 사용하는 전역상태 관리를 담은 폴더(Recoil)
- `styles` : 프로젝트에서 사용하는 글로벌 스타일, 테마
- `types` : 프로젝트에서 사용하는 타입으로 emotion 선언, chart, resumes, schdules타입
- `utils` : 애플리케이션에서 필요한 함수, 변수, 등을 모아놓은 폴더
  - `constant` : 상수들 모음
  - `helpers` : 도와주는 함수들
  - `media` : 반응형을 위해 사용하는 함수
  - `validate` : 유효성 검증을 위한 변수
- `queryClient` : React Query 클라이언트와 옵션설정, QueryKey 등
