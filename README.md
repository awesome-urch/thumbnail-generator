# Demo Credit API Docs

Documentation.

# Authentication

Just a faux authentication that returns the user's ID after registration or login. The user ID would then be supplied as a POST param to other endpoints of the wallet service.

## Login

### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin", "password":"password"}' \
  http://localhost:3000/login
```

### Response

```json
{
  "ok": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@email.com",
    "created_at": "2018-04-03 14:43:02.183277-04",
    "updated_at": "2018-04-03 14:43:02.183277-04"
  }
}
```

## Register

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"new-user", "password":"my-password", "email":"my@email.com"}' \
  http://localhost:3000/register
```

### Response

```json
{
  "ok": true,
  "message": "Registration successful",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```
