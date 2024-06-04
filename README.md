![캡처](https://github.com/GarbageCode1984/Latte_Talk/assets/75023330/32082368-b8b2-4bd8-9373-5a1f7c7106cd)

# 웹채팅 프로젝트 라떼톡입니다.

회원가입 기능과 로그인 기능을 지원하고 실시간 양방향 메시지를 보낼 수 있는 채팅을 지원합니다.


### 테스트 계정
Id : test@test.com
password : test1234

Id : test2@test.com
password : test1234


### 사용된 기술  
React + Node.js + Express + Mongo DB + socket.IO


---


![login](https://github.com/GarbageCode1984/Latte_Talk/assets/75023330/7ebe1c22-b73e-42af-8bb6-97cef6cd09f8)


이메일과 패스워드를 입력받아 회원정보가 있는 가입자인지 체크합니다.


![register](https://github.com/GarbageCode1984/Latte_Talk/assets/75023330/7e28d7c2-12ff-44bd-9455-41aff9a17a16)


회원이 아니라면 이메일과 패스워드와 닉네임을 입력받아 계정을 생성할 수 있습니다.

가입된 회원정보는 몽고DB에 저장되며 패스워드는 bcrypt와 salt를 이용해 암호화하여 안전하게 저장됩니다.




![캡처-removebg-preview](https://github.com/GarbageCode1984/Latte_Talk/assets/75023330/ce9c33a6-0265-4f89-a352-3a8d2c97faba)


가입한 사용자들끼리 채팅방에서 채팅을 나눌 수 있습니다.


---
### Update


v1.0.1 : 메시지가 24시간이 지나면 삭제됩니다.


v2.0.1 : 
  
  전체적인 디자인 수정

  채팅방 생성 기능 추가
                  
  채팅방 패스워드 기능 추가
                  
  계정 삭제 기능 추가
                  
  메시지 시간 표시

