## Spoon mate's client

### How to start

```bash
yarn        # install
yarn start  # start development server
            # 실시간 수정되는 코드 내용 반영해줌
```

### 개발시, 참고할 부분

1. **Lint**  
   **a. What is Lint?**

   > 소스 코드에서 문법적 오류, 스타일적 오류 등에 표시를 달아주는 행위

   **b. Linters**
   `ESLint`, `Prettier`

   - ESLint: 코드의 퀄리티 보장
   - prettier: 코드의 스타일을 통일

    **c. 읽어보면 좋은 자료**  
    https://helloinyong.tistory.com/325

<br/>

2. **import할 때 약어**  
    **a. 약어를 사용하는 이유**  
    -> 폴더 구조가 복잡하기 때문에 약어를 사용

   **b. 약어 설정 방법**
   `tsconfig.paths.json`에 경로별 약어를 설정해두면 됨

   **c. 읽어보면 좋은 자료**  
   https://medium.com/@relee6203/typescript-tsconfig-%EC%A0%88%EB%8C%80%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-4db1870767f8
