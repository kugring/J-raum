

<div style="display: flex; flex-direction:row;">
    <h2>👨‍🏫 프로젝트 소개
        <div>  
            <img src="https://img.shields.io/badge/django-092E20?style=flat&logo=django&logoColor=white" alt="Django">
            <img src="https://img.shields.io/badge/python-3776AB?style=flat&logo=python&logoColor=white" alt="Python">
            <img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
            <img src="https://img.shields.io/badge/jquery-0769AD?style=flat&logo=jquery&logoColor=white" alt="jQuery">
            <img src="https://img.shields.io/badge/css-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS">
        </div>  
    </h2>

</div>


지자체_소규모 행사의 카페를 운영중 불편사항들을 고려하여 만든 키오스크 입니다.

## ⏲️ 개발 기간 
- 2023.12.20(수) ~ 2023.04.06(토)
- 불편사항 수집
- 문제 해결에 대한 아이디어 구상
- 구현해야할 기능 구별
- 개발에 필요한 라이브러리, 프레임워크 공부
- [회원명단, 메뉴_데이터]_수집
- 테스트, 수정
- AWS 배포
- 현장 사용
  
## 🧑‍🤝‍🧑 개발자
- **임재혁**

## 💻 개발환경
- **Version** : Python 3.12
- **IDE** : PyCharm 2023
- **Framework** : Django 5.0.1
- **DB** : SQLite3

## ⚙️ 기술 스택
- **Server** : AWS EC2
- **DataBase** : SQLite3
- **WS/WAS** : Nginx, uWSGI


## 📌 주요 기능
- 메뉴 목록
  - 카테고리 항목으로 묶어서 메뉴를 보여준다.
  - 스크롤 이동으로 편의성을 제공한다.
- 포인트_결제&충전
   - 각 회원들의 보유 포인트로 결제가 가능하다.
   - 충전을 키오스크로 요청하고 관리자가 승인요청을 통해 포인트 충전이 이루어진다.
- 포인트_환불
   - 주문 취소시 자동으로 포인트가 환불 처리된다.
- 회원번호_인증
   - 디바이스 가상키보드가 아닌 직접 구현한 다이얼 버튼으로 ui를 제공

- 관리자_페이지
   - 주문 현황에 대한 대기목록 제공
   - 날짜별 주문목록 추적
   - 메뉴_추가&조회&수정&삭제
   - 회원관리
   - 엑셀_파일추출 -> [포인트_사용내역 & 포인트_충전내역 & 주문내역]
   - 포인트_괸리



## ✒️ URL
- Jraum : <a href="http://j-raum.duckdns.org/" target="_blank">Jraum</a>


