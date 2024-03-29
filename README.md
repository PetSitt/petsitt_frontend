![PetSitt](https://user-images.githubusercontent.com/30254570/181733324-25c5ba55-b010-49d3-9627-65df39ac523f.png)

## 📌 프로젝트 기간 및 팀원 소개
기간 : 2022년 6월 24일 ~ 2022년 7월 31일(6주)

## 👨‍👧‍👧팀원
ReactJS : 소윤호, 김하연, 이정민\
Node.js : 김형근, 유승완, 서아름, 김정현\
UI/UX : 고가은

## ⚒️개발 스팩
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![](https://img.shields.io/badge/styledComponents-db7093?style=for-the-badge&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/REACT-0A395B?style=for-the-badge&logo=REACT&logoColor=white)
![](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)\
![](https://img.shields.io/badge/AXIOS-671ddf?style=for-the-badge&logo=AXIOS&logoColor=black)
![](https://img.shields.io/badge/reactquery-ff4154?style=for-the-badge&logo=reactquery&logoColor=black)
![](https://img.shields.io/badge/Socket.io-000000?style=for-the-badge&logo=Socket.io&logoColor=white)

## 🏗Service Architecture
![Architecture](https://user-images.githubusercontent.com/30254570/182975305-d5c93633-af7c-48a4-9a38-f170f5afb4ef.png)
<br/>
<br/>
## 🙉 기술적 의사결정
### socket.io
Node.JS, express를 기반으로 개발되어 호환성이 매우 좋습니다. 서버에서 변경사항이 있을 때만 응답을 보내기 때문에, 다른 방식에 비하여 불필요한 리소스 낭비를 줄일 수 있습니다. namespace와 room의 기능을 내장하고 있어서, 채팅기능 구현시간을 획기적으로 줄여주고, 코드를 깔끔하게 짤 수 있게 도와주는 모듈입니다.
### SSE(Server Side Event)
표준 기술이기 때문에, 모든 브라우저 대부분을 지원합니다. 연결이 끊어지면 자동으로 다시 연결을 시도하는 기능이 포함되어 있습니다. 구현이 매우 간단하다는 장점이 있습니다.
polling방식, long-polling 방식과 큰 차이가 없지만, 지속적인 연결 확인이 불필요하다는 점, 구현할 기능이 서버에서 변경된 내용을 받기만 해도 되는 부분이라는 점,
서버에서 클라이언트와 연결 지속시, CPU 사용률이 적다는 이유로 선택하였습니다.
### React Query
리덕스처럼 큰 리소스 소모 없이 useQuery, useMutation같은 훅들을 사용하면 리액트 컴포넌트 내부에서 API요청 및 데이터 관리를 좀 더 효율적으로 할 수 있을거라 판단했고, 데이터 캐싱, 로딩 상태 확인 등 react-query 자체의 기능을 활용해 데이터 관리를 보다 더 손쉽게 하고 기능 구현에 더욱 집중을 할 수 있을것 같아서 선정하였습니다.
### github actions
- 배포 자동화를 통해 효율적인 협업 및 작업 환경을 구축하기 위함.
- 처음에는 Jenkins를 우선순위로 두었지만, 시간적 제약(서버 설치, Docker 환경 구성)으로 인해 Github Actions를 사용하기로 결정하였습니다.
### Kakao Map API + Daum postcode API
돌보미가 프로필 정보를 등록할 때, 그리고 사용자가 돌보미를 원하는 장소에서 검색할 때 주소 검색 기능이 필요하여 Daum postcode API를 도입하였고, Daum postcode API의 주소 데이터를 연동하여 돌보미들의 위도,경도 값을 얻어와 카카오맵에 돌보미들의 위치를 표기해주기 위해 Kakao Map API를 함께 사용하였습니다.
<br/>
<br/>

## 🔧 유저 피드백 및 개선 사항
### ✔️ 채팅 UI 개선
#### 👉🏻 피드백 내용
돌보미 채팅 중 하단 홈,예약,프로필 터치시 팝업 종료 안되고 이동됨
채팅할 때 모달 바깥의 화면이 움직이고 버튼들이 터치도 되어서 신경쓰여요
채팅 목록이 뜨면 밑에 살짝 보이는 네비 바? 그 부분에서 홈버튼이나 달력 버튼이나 마이페이지 버튼을 누르면 기존에 떠 있던 채팅목록이 자동으로 꺼졌으면 좋겠다고 생각했어요. 아니면 말풍선 버튼을 누르면 채팅목록이 아예 새로운 팝업창으로 뜨는것도 좋을 것 같아요!!
#### 👉🏻 개선 내용
- 채팅창과 하단의 네비바가 모바일 기기 사이즈에 따라 겹치는 정도가 달라지는 것을 개선하고 하단 네비바는 채팅기능에 보여지지 않아도 될 것 같다고 판단 > 채팅창 모달이 화면을 덮어버리는 방식으로 UI 개선
- 채팅창이 활성화 되어있지 않을 경우에는 Server-Side-Events 를 통해 실시간으로 메세지 수신 여부를 알려주는 NEW 알림 아이콘 추가
- 채팅 리스트에 마지막으로 수신한 메세지 보여지도록 추가
<details>
<summary>개선전 UI</summary>
<div markdown="1">
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183656413-b97fe6f9-bf0a-4100-99c0-b18c65b4adbe.png"/>
</div>
</details>
<details>
<summary>개선후 UI</summary>
<div markdown="1">
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183656480-d36c3507-c193-422b-bb20-bbc4d7b57335.png"/>
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183783713-398bc02d-d96a-49d6-92a4-144ba6b4649f.png"/>
</div>
</details>
<br/>

### ✔️사용자 편의를 위해 Alert 추가
#### 👉🏻 개선 내용
회원가입 및 비밀번호 변경 시 처리가 완료되면 페이지가 이동되고, 리뷰 및 일지 작성 완료를 누른 후에는 모달창이 사라지는데, 이에 대한 결과를 사용자에게 알려주어야 의도한 기능이 제대로 작동되었는지 알기 쉽다고 판단되어 간단한 Alert 추가
<details>
<summary>개선 UI</summary>
<div markdown="1">
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183785253-67c274ab-5638-4682-b3e1-2f9af41ff1e5.png"/>
</div>
</details>
<br/>

### ✔️메인페이지 실시간 위치 정보 불러오기 로딩 속도 개선
#### 👉🏻 피드백 내용
첫 페이지 로딩이 조금 더 빨랐으면 좋을 것 같습니다!\
조회에 너무 많은 시간이 소요됩니다.

#### 👉🏻 개선 내용
메인 페이지의 경우 사용자의 실시간 위치 정보를 파악 후 근처의 돌보미 리스트를 불러오는데, Geolocation API가 사용자 위치를 파악하는데에 인터넷 상황에 따라 길면 5~6초 혹은 그 이상도 소요된다.
- 최초 접속 시 받아온 사용자의 위치 정보를 저장하고 3분 이내로 사용자가 메인 페이지에 다시 진입할 경우 Geolocation API를 다시 호출하지 않고 기존 위치 정보를 활용해 데이터를 불러오도록 수정
- 최초 접속 시에도, Geolocation API가 사용자 정보를 불러오는 데에 7초 이상 소요될 경우 위치정보 불러오기를 멈추고, 검색기능을 이용하라는 안내 문구를 띄움. 일시적인 네트워크 오류였을 가능성도 있으므로 재시도 버튼도 함께 노출.
- 실시간 위치 정보 공유를 차단했을 경우, 바로 Error처리되어 검색 기능을 활용하라는 안내 문구 노출
<details>
<summary>개선 UI</summary>
<div markdown="1">
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183785710-d65c938b-3b89-4b16-8359-7be1d342e0c5.png"/>
</div>
</details>
<br/>

## 🔎 주요기능
<details>
<summary>실시간 위치 정보 및 지도 (kakao Map API)를 활용한 돌보미 리스트 표기</summary>
<div markdown="1">
  <ul>
    <li>펫싯에 접속한 사용자의 실시간 위치 정보를 얻어와 근처의 돌보미 리스트를 보여줌</li>
    <li>혹은 사용자가 검색한 주소 기준으로 가까운 곳에 위치한 돌보미 리스트 확인 가능</li>
    <li>카카오 맵에서 돌보미 마커 선택 시, 해당 돌보미의 이름과 평점을 간단히 보여주고 돌보미 정보 카드를 클릭할 경우 해당 돌보미의 상세 페이지로 이동</li>
  </ul>
  <img width="700" src="https://user-images.githubusercontent.com/30254570/182987583-cf548b46-01ee-4c6f-bb39-6b42afb10a17.png"/>
</div>
</details>

<details>
<summary>채팅 (Socket.io)</summary>
<div markdown="1">
  <ul>
    <li>각 시터에 해당된 채팅방 생성</li>
    <li>채팅창 상단에 위치 시, 새로운 채팅메세지를 스크롤다운 없이 확인가능</li>
  </ul>
  <img width="700" src="https://user-images.githubusercontent.com/47635373/182986632-01005204-13c9-4d08-9a47-c5fb893bd445.png"/>
</div>
</details>
<details>
<summary>알림 (SSE)</summary>
<div markdown="1">
  <ul>
    <li>채팅방에 접속해있지 않거나, 새로 사이트에 로그인 했을 경우 새로운 알림 아이콘 표시</li>
    <li>로그인 중 새로운 메시지를 전송받았을 경우</li>
    <li>펫싯 사이트에 접속해있지 않다가 다시 로그인 했을 때 새로운 메세지가 있는 경우</li>
  </ul>
  <img width="700" src="https://user-images.githubusercontent.com/30254570/183269953-0fbce393-5255-46a1-86e3-3591ca9fc38d.png"/>
</div>
</details>

## 🧑🏻‍💻역할 분담
| Name | Blog | 분담 |
|------------|------------|------------|
|소윤호|[Tistory](https://triplexlab.tistory.com/)|HTTPS, 회원가입, 비밀번호찾기, CI/CD, Daum postcode API, 반응형, 유저 정보 페이지 조회 및 수정, 반려동물 프로필(CRUD), 돌보미 프로필(CRUD), Multi Datepicker, 실시간 채팅(Socket.io)|
|김하연|[velog](https://velog.io/@hayeooooon/)|로그인, 아이디찾기, Daum postcode API + Kakao Map API 연동, 메인페이지 검색, 상세페이지, 예약페이지, 리뷰/돌봄일지, 실시간 채팅(SSE), 모달 및 얼럿 컴포넌트|

## 👉🏻바로 가기
[자세한 내용은 wiki를 참고해주세요😃😃](https://github.com/PetSitt/petsitt_frontend/wiki)
