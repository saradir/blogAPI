

curl -X POST http://localhost:5000/api/users `
  -H "Content-Type: application/json" `
  -d "{ \"username\": \"alice\", \"email\": \"alice@example.com\", \"password\": \"secret123\" }"
