# 카카오 로그인

- CRA 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉 , `.env` 사용법이 다름
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉 , `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기/로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱` 선택후 이동
  <img width="1127" height="300" alt="Image" src="https://github.com/user-attachments/assets/f8b0aeb7-bc0c-4cd5-854e-dbdecfcb7678" />
- 내용 작성하기
  <img width="1352" height="813" alt="Image" src="https://github.com/user-attachments/assets/600f4537-6287-4347-827a-989c44099a98" />
- 목록확인하기
  <img width="1346" height="607" alt="Image" src="https://github.com/user-attachments/assets/4669a780-853c-4134-9fad-bbe7c26cb838" />
- 비즈앱 등록하기
  <img width="954" height="756" alt="Image" src="https://github.com/user-attachments/assets/c5b26eef-60f1-4ec1-a792-60d182d9c855" />
- 첫 진행시 약관동의후 진행하기
  <img width="1050" height="481" alt="Image" src="https://github.com/user-attachments/assets/9158b39e-d8fb-4b62-88ca-6e37805a33db" />
  <img width="1059" height="471" alt="Image" src="https://github.com/user-attachments/assets/e289572f-518e-4aff-813d-dc609d780663" />
  <img width="678" height="342" alt="Image" src="https://github.com/user-attachments/assets/d4028b80-4f40-423c-b2b0-c05262808686" />
- 키 복사하기
  <img width="647" height="360" alt="Image" src="https://github.com/user-attachments/assets/fb6dcf9e-fdd7-490d-a308-212b1e459744" />

## 3. Rest API 및 JS 키 관리

- `외부노출 금지`
- / 폴더에 `.env` 파일 생성
- `생성되는 파일 위치 절대 주의`
  <img width="297" height="253" alt="Image" src="https://github.com/user-attachments/assets/7ed1a48f-090a-4611-baa6-543d2a913177" />

### 3.1. 접두어는 `REACT_APP_` 으로 `약속`됨

- 예) Next.js 에서는 `NEXT_APP_` 으로 약속됨
- 예) Vite 프로젝트에서는 `VITE_` 로 약속됨

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=본인키
REACT_APP_KKO_LOGIN_JS_API_KEY=본인키
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성확인
  <img width="398" height="563" alt="Image" src="https://github.com/user-attachments/assets/70553265-30a8-4cf7-9f9d-d4e69e26074d" />

## 4. 카카오 로그인 플랫폼 설정하기

<img width="1070" height="728" alt="Image" src="https://github.com/user-attachments/assets/d6d44e32-da03-4577-8196-4537d554ef4a" />

### 4.1. 리다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="715" height="525" alt="Image" src="https://github.com/user-attachments/assets/8c6bc897-0917-4f54-8440-bfbe9c961124" />
  <img width="966" height="272" alt="Image" src="https://github.com/user-attachments/assets/67d899de-a2ba-48ae-8015-63e4c223688b" />

## 5. 동의항목 설정

<img width="1326" height="367" alt="Image" src="https://github.com/user-attachments/assets/4631b3ac-cfcd-4597-978e-02fd8c7c0f2b" />
<img width="688" height="773" alt="Image" src="https://github.com/user-attachments/assets/011131c7-32b2-4757-ac78-94053d6ffd9c" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 생성

### 6.1. 1단계

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios 로 변경 권장`)

- kkoapi.js

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성
- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 생성

#### 6.4.1. Router 셋팅

- /src/App.js

```js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

- After.jsx

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

## 7. Recoil 활용해보기

- /src/atoms/kkoLoginAtom.js

```js
import { atom } from "recoil";

export const KKOLoginAtom = atom({
  key: "KKOLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../atoms/kkoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  //   console.log(kkoLoginUrl);
  const LogOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      email: "",
      thumbnail_image_url: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={LogOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/login")
- 조건문으로 안내메시지 및 버튼으로 이동권장
