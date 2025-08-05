# react-icons

- https://react-icons.github.io/react-icons/
- 설치 : `npm i react-icons`
- 참조 : https://velog.io/@chaevivi/React-React-Icons-사용법

## 1. 활용

```jsx
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function App() {
  const point = 10;
  const rate = 3;
  return (
    <div>
      <h1>
        App
        <FaSearch />
      </h1>
      <div>
        {[...Array(point)].map((item, index) => {
          return (
            <FaStar
              key={index}
              style={{
                color: index < rate ? "gold" : "gray",
              }}
            />
          );
        })}
        <h2>
          당신의 별점은?(
          <FaStar style={{ color: "orange", fontSize: 20 }} />)
        </h2>
      </div>
    </div>
  );
}

export default App;
```
