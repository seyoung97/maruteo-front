# AllClassListPage API 명세서 (정리된 버전)

## Base URL
```
http://127.0.0.1:3001/api
```

## 인증
```
Authorization: Bearer {access_token}
```

---

## 📋 API 목록

### 1. 기부자(재능자) 목록 조회

| 항목 | 내용 |
|------|------|
| **기능** | 카테고리별 재능자(기부자) 목록을 조회합니다 |
| **Endpoint** | `/users` |
| **Method** | `GET` |
| **Path Params** | 없음 |
| **Query Params** | `role` (string, optional): "청년" 또는 "어르신"<br>`category` (string, optional): 카테고리 이름<br>`sort` (string, optional): "latest", "popular", "rating"<br>`page` (integer, optional): 페이지 번호 (기본값: 1)<br>`limit` (integer, optional): 페이지당 항목 수 (기본값: 20) |
| **Request Body** | 없음 |

**Response (200 OK):**
```json
{
  "message": "기부자 목록 조회 성공",
  "data": [
    {
      "id": 1,
      "name": "김춘자",
      "username": "chunja",
      "email": "chunja@example.com",
      "phone": "010-1234-5678",
      "birth": "1995-03-15",
      "role": "청년",
      "gender": "여성",
      "address": "서울시 강남구",
      "bio": "요리를 사랑하는 청년입니다",
      "profile_image": "https://example.com/profile1.jpg",
      "garlic_count": 430,
      "rating": 4.8,
      "is_liked": false,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_count": 95,
    "has_next": true,
    "has_prev": false
  }
}
```

**예시 호출:**
```bash
curl -X GET "http://127.0.0.1:3001/api/users?role=청년&sort=popular&page=1&limit=10" \
  -H "Authorization: Bearer {token}"
```

---

### 2. 내가 찜한 기부자 목록 조회

| 항목 | 내용 |
|------|------|
| **기능** | 현재 사용자가 찜한 재능자 목록을 조회합니다 |
| **Endpoint** | `/user-want-talents` |
| **Method** | `GET` |
| **Path Params** | 없음 |
| **Query Params** | `category` (string, optional): 카테고리 필터<br>`sort` (string, optional): 정렬 기준<br>`page` (integer, optional): 페이지 번호<br>`limit` (integer, optional): 페이지당 항목 수 |
| **Request Body** | 없음 |

**Response (200 OK):**
```json
{
  "message": "찜한 기부자 목록 조회 성공",
  "data": [
    {
      "user_id": 1,
      "talent_id": 1,
      "user": {
        "id": 1,
        "name": "김춘자",
        "username": "chunja",
        "role": "청년",
        "profile_image": "https://example.com/profile1.jpg",
        "garlic_count": 430,
        "rating": 4.8
      },
      "talent": {
        "id": 1,
        "name": "요리"
      },
      "liked_at": "2024-12-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_count": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

**예시 호출:**
```bash
curl -X GET "http://127.0.0.1:3001/api/user-want-talents?sort=latest" \
  -H "Authorization: Bearer {token}"
```

---

### 3. 수업 목록 조회

| 항목 | 내용 |
|------|------|
| **기능** | 카테고리별 수업 목록을 조회합니다 |
| **Endpoint** | `/lessons` |
| **Method** | `GET` |
| **Path Params** | 없음 |
| **Query Params** | `category` (string, optional): 카테고리 이름<br>`instructor_role` (string, optional): "청년" 또는 "어르신"<br>`sort` (string, optional): "latest", "popular", "rating"<br>`page` (integer, optional): 페이지 번호<br>`limit` (integer, optional): 페이지당 항목 수 |
| **Request Body** | 없음 |

**Response (200 OK):**
```json
{
  "message": "수업 목록 조회 성공",
  "data": [
    {
      "id": 1,
      "title": "된장국 클래스",
      "description": "집에서 쉽게 만드는 된장국",
      "location": "서울시 강남구",
      "date": "2024-12-25T14:00:00Z",
      "garlic_count": 120,
      "rating": 4.7,
      "instructor": {
        "id": 1,
        "name": "김춘자",
        "role": "청년",
        "profile_image": "https://example.com/profile1.jpg"
      },
      "thumbnail": "https://example.com/lesson1.jpg",
      "is_liked": false,
      "created_at": "2024-12-01T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 15,
    "total_count": 142,
    "has_next": true,
    "has_prev": false
  }
}
```

**예시 호출:**
```bash
curl -X GET "http://127.0.0.1:3001/api/lessons?instructor_role=청년&sort=rating" \
  -H "Authorization: Bearer {token}"
```

---

### 4. 현재 사용자 정보 조회

| 항목 | 내용 |
|------|------|
| **기능** | 현재 로그인된 사용자의 정보를 조회합니다 |
| **Endpoint** | `/users/me` |
| **Method** | `GET` |
| **Path Params** | 없음 |
| **Query Params** | 없음 |
| **Request Body** | 없음 |

**Response (200 OK):**
```json
{
  "message": "사용자 정보 조회 성공",
  "data": {
    "id": 1,
    "name": "홍길동",
    "username": "hong",
    "email": "hong@example.com",
    "phone": "010-9876-5432",
    "birth": "1960-01-01",
    "role": "어르신",
    "gender": "남성",
    "address": "서울시 종로구",
    "bio": "요리를 배우고 싶은 어르신입니다",
    "profile_image": "https://example.com/profile_me.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**예시 호출:**
```bash
curl -X GET "http://127.0.0.1:3001/api/users/me" \
  -H "Authorization: Bearer {token}"
```

---

### 5. 기부자 찜하기

| 항목 | 내용 |
|------|------|
| **기능** | 특정 재능자(기부자)를 찜합니다 |
| **Endpoint** | `/user-want-talents` |
| **Method** | `POST` |
| **Path Params** | 없음 |
| **Query Params** | 없음 |
| **Request Body** | ```json<br>{<br>  "user_id": 1,<br>  "talent_id": 1,<br>  "action": "like"<br>}``` |

**Response (201 Created):**
```json
{
  "message": "기부자 찜하기 완료",
  "data": {
    "user_id": 1,
    "talent_id": 1,
    "is_liked": true
  }
}
```

**예시 호출:**
```bash
curl -X POST "http://127.0.0.1:3001/api/user-want-talents" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "talent_id": 1,
    "action": "like"
  }'
```

---

### 6. 기부자 찜 취소

| 항목 | 내용 |
|------|------|
| **기능** | 특정 재능자(기부자) 찜을 취소합니다 |
| **Endpoint** | `/user-want-talents` |
| **Method** | `DELETE` |
| **Path Params** | 없음 |
| **Query Params** | 없음 |
| **Request Body** | ```json<br>{<br>  "user_id": 1,<br>  "talent_id": 1<br>}``` |

**Response (200 OK):**
```json
{
  "message": "기부자 찜 취소 완료"
}
```

**예시 호출:**
```bash
curl -X DELETE "http://127.0.0.1:3001/api/user-want-talents" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "talent_id": 1
  }'
```

---

### 7. 재능(카테고리) 목록 조회

| 항목 | 내용 |
|------|------|
| **기능** | 사용 가능한 모든 재능(카테고리) 목록을 조회합니다 |
| **Endpoint** | `/talents` |
| **Method** | `GET` |
| **Path Params** | 없음 |
| **Query Params** | 없음 |
| **Request Body** | 없음 |

**Response (200 OK):**
```json
{
  "message": "재능 목록 조회 성공",
  "data": [
    {
      "id": 1,
      "name": "요리"
    },
    {
      "id": 2,
      "name": "정리정돈"
    },
    {
      "id": 3,
      "name": "컴퓨터"
    }
  ]
}
```

**예시 호출:**
```bash
curl -X GET "http://127.0.0.1:3001/api/talents" \
  -H "Authorization: Bearer {token}"
```

---

## 📊 API 요약표

| 기능 | Method | Endpoint | Path Params | Query Params | Request Body | 비고 |
|------|--------|----------|-------------|--------------|--------------|------|
| 기부자 목록 조회 | GET | `/users` | 없음 | role, category, sort, page, limit | 없음 | 필터링, 페이징 지원 |
| 찜한 기부자 조회 | GET | `/user-want-talents` | 없음 | category, sort, page, limit | 없음 | 로그인 필요 |
| 수업 목록 조회 | GET | `/lessons` | 없음 | category, instructor_role, sort, page, limit | 없음 | 필터링, 페이징 지원 |
| 현재 사용자 조회 | GET | `/users/me` | 없음 | 없음 | 없음 | 로그인 필요 |
| 기부자 찜하기 | POST | `/user-want-talents` | 없음 | 없음 | user_id, talent_id, action | 로그인 필요 |
| 찜 취소 | DELETE | `/user-want-talents` | 없음 | 없음 | user_id, talent_id | 로그인 필요 |
| 재능 목록 조회 | GET | `/talents` | 없음 | 없음 | 없음 | 카테고리 목록 |

---

## 🚨 공통 에러 응답

**401 Unauthorized:**
```json
{
  "message": "인증이 필요합니다",
  "error": "UNAUTHORIZED"
}
```

**400 Bad Request:**
```json
{
  "message": "유효하지 않은 요청입니다",
  "error": "INVALID_REQUEST"
}
```

**404 Not Found:**
```json
{
  "message": "리소스를 찾을 수 없습니다",
  "error": "NOT_FOUND"
}
```

**500 Internal Server Error:**
```json
{
  "message": "서버 내부 오류가 발생했습니다",
  "error": "INTERNAL_SERVER_ERROR"
}
```

---

## 💡 참고사항

1. **모든 API는 JWT 토큰이 필요**합니다 (인증 헤더 필수)
2. **페이지네이션**은 `page`와 `limit` 파라미터로 제어합니다
3. **정렬 옵션**: `latest`(최신순), `popular`(인기순), `rating`(별점순)
4. **역할 구분**: `청년`, `어르신`으로 사용자 타입을 구분합니다
5. **날짜 형식**: ISO 8601 형식 (`2024-12-19T10:30:00Z`)을 사용합니다 