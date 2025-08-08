import { useEffect, useState } from "react";
import MapDiv from "./components/MapDiv";

function App() {
  // js
  // 지도의 로딩 상태를 관리하는 state
  const [isMaploaded, setIsMaploaded] = useState(false);

  // 화면이 보이면 한번만 실행
  useEffect(() => {
    // 카카오 맵 스크립트 태그(엘리먼트)를 생성하라.
    const kakaoMapScript = document.createElement("script");
    // 스크립트를 동적, 즉 비동기로 불러들인다.
    kakaoMapScript.async = true;
    // 카카오 SDK URL 을 설정하라.
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KKO_MAP_JS_API_KEY}&autoload=false&libraries=services,clusterer`;
    // html 문서의 head 태그에 추가하라.
    document.head.appendChild(kakaoMapScript);
    // 스크립트 로드가 완료되면 실행될 이벤트 리스너 추가
    kakaoMapScript.addEventListener("load", () => {
      // 카카오맵을 로딩하고 로딩상태가 변하면 리렌더링 한다.
      window.kakao.maps.load(() => {
        // 카카오지도 로딩 완료로 리렌더링 진행
        setIsMaploaded(true);
      });
    });
  }, []);

  // 지도가 로드 되지않으면 로딩메시지를 출력한다.
  if (!isMaploaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }
  // jsx
  return (
    <div>
      <h1>지도 출력</h1>
      <MapDiv />
    </div>
  );
}

export default App;
