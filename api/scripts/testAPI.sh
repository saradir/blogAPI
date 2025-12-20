#!/usr/bin/env bash

set -e
set -o pipefail

BASE_URL="http://localhost:3000"
ADMIN_USER='{"email":"admin@test.com","password":"password123"}'

echo "== Creating admin user =="

curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@test.com",
    "password": "password123",
    "isAdmin": true
  }' || true

echo
echo "== Logging in =="

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/login" \
  -H "Content-Type: application/json" \
  -d "$ADMIN_USER")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "Failed to retrieve token"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

echo "Token acquired"

echo
echo "== Creating post =="

CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "First Post",
    "text": "Hello world",
    "isDraft": true
  }')

POST_ID=$(echo "$CREATE_RESPONSE" | jq -r '.post.id')

if [ "$POST_ID" = "null" ] || [ -z "$POST_ID" ]; then
  echo "Failed to create post"
  echo "$CREATE_RESPONSE"
  exit 1
fi

echo "Post created with ID $POST_ID"

echo
echo "== Get all posts =="
curl -s "$BASE_URL/api/posts" | jq .

echo
echo "== Get post by ID =="
curl -s "$BASE_URL/api/posts/$POST_ID" | jq .

echo
echo "== Update post =="
curl -s -X PUT "$BASE_URL/api/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "isDraft": false
  }' | jq .

echo
echo "== Attempt forbidden update (should be ignored or rejected) =="
curl -s -X PUT "$BASE_URL/api/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 999,
    "createdAt": "2000-01-01"
  }' | jq .

echo
echo "== Delete post =="
curl -s -X DELETE "$BASE_URL/api/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo
echo "== Delete post again (expect error) =="
curl -s -X DELETE "$BASE_URL/api/posts/$POST_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo
echo "== Done =="
read -p "Press Enter to exit..."
