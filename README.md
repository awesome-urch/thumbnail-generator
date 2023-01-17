# Demo Credit API Docs

Documentation.



## Authentication

Just a faux authentication that returns the user's ID after registration or login. The user ID would then be supplied as a body param to other endpoints of the wallet service.

### Login

#### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin", "password":"password"}' \
  http://localhost:3000/login
```

#### Response

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

### Request

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

## Create Wallet Account

### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1"}' \
  http://localhost:3000/wallet/create
```

### Response

```json
{
  "ok": true,
  "message": "Wallet created successfully",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```

## Fund Wallet Account

### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1", "amount":"100"}' \
  http://localhost:3000/wallet/credit
```

### Response

```json
{
  "ok": true,
  "message": "Wallet credited successfully",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```

## Transfer to another User's Wallet Account

### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"from":"1", "to":"2", "amount":"100"}' \
  http://localhost:3000/wallet/transfer
```

### Response

```json
{
  "ok": true,
  "message": "Transfer successful",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```

## Withdraw from Wallet Account

### Request

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1", "amount":"100"}' \
  http://localhost:3000/wallet/debit
```

### Response

```json
{
  "ok": true,
  "message": "Wallet debited successfully",
  "user": {
    "id": 2,
    "username": "new-user",
    "email": "my@email.com",
    "created_at": "2023-01-01 14:43:02.183277-04",
    "updated_at": "2023-01-01 14:43:02.183277-04"
  }
}
```