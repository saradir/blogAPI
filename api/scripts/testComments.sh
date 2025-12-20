#!/usr/bin/env bash

set -e
set -o pipefail

BASE_URL="http://localhost:3000"

ADMIN_LOGIN='{"email":"admin@test.com","password":"password123"}'

echo "== Login =="
TOKEN=$(curl -s -X POST "$BASE_URL/api/login" \
  -H "Content-Type: application/json" \
  -d "$ADMIN_LOGIN" | jq -r '.token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Login failed"
  exit 1
fi

echo "== Create post =="
POST_ID=$(curl -s -X POST "$BASE_URL/api/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Post for comments","text":"Test","isDraft":false}' \
  | jq -r '.post.id')

echo "Post ID: $POST_ID"

echo "== Create comment =="
COMMENT_ID=$(curl -s -X POST "$BASE_URL/api/posts/$POST_ID/comments" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"First comment"}' \
  | jq -r '.comment.id')

echo "Comment ID: $COMMENT_ID"

echo "== List comments =="
curl -s "$BASE_URL/api/posts/$POST_ID/comments" | jq .

echo "== Show comment =="
curl -s "$BASE_URL/api/comments/$COMMENT_ID" | jq .

echo "== Edit comment =="
curl -s -X PATCH "$BASE_URL/api/comments/$COMMENT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"Edited comment"}' | jq .

echo "== Delete comment =="
curl -s -X DELETE "$BASE_URL/api/comments/$COMMENT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo "== Delete again (expect error) =="
curl -s -X DELETE "$BASE_URL/api/comments/$COMMENT_ID" \
  -H "Authorization: Bearer $TOKEN" || true

echo
echo "== Done =="
read -p "Press Enter to exit..."
