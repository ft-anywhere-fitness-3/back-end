# <p align="center">Backend Api</p>

## <p align="center">https://ft-anywhere-fitness-3.herokuapp.com</p>

## <p align="center">---------- REGISTER / LOGIN ----------</p>

## Dummy Login Info

<details>
<summary>Usernames/Passwords</summary>

```json
[
  {
    "user_username": "jimhalpert",
    "user_password": "randompassword"
  },
  {
    "user_username": "pambeesly",
    "user_password": "anotherrandompassword"
  },
  {
    "user_username": "dwightschrute",
    "user_password": "somethingrandom"
  }
]
```

</details>

### [POST] /api/auth/register

- Register a new user
  - _username required (must be between 3 and 30 characters)_
  - _password required (must be between 6 and 30 characters)_
  - _phone number required_

_What you send:_

```json
{
  "user_name": "Jim Halpert",
  "user_username": "jimhalpert",
  "user_email": "jim@something.com",
  "user_password": "randompassword",
  "user_role": //if nothing provided, defaults to 2 (integer NOT string) | 1 = instructor, 2 = client
}
```

_What you receive:_

```json
{
  "message": "u have successfully created an account with jimhalpert username"
}
```

### [POST] /api/auth/login

- Login
  - _username and password required_
  - _provides a newly created token_

_What you send:_

```json
{
  "user_username": "pambeesly",
  "user_password": "anotherrandompassword"
}
```

_What you receive:_

```json
{
  "message": "Welcome back pambeesly",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJpYXQiOjE2MjcyNjY4MDYsImV4cCI6MTYyNzM1MzIwNn0.J1dFd3ghUPYVTodsaAU3Bg2RRcmYM_1oOe-96nvLLUg",
  "role": 2 //or 1 if you click the 'I am an instructor' checkbox
}
```

##

## <p align="center">---------- USERS ----------</p>

### [GET] /api/users/

**_RESTRICTED ENDPOINT_**

- Get an array of users
  - _requires valid token in authorization header to access_

_What you receive:_

```json
[
  {
    "user_email": "pam@something.com",
    "user_id": 1,
    "user_name": "Pam Beasley",
    "user_password": "$2a$08$/C4lRMgj5RlRwxlNqn8T0.l1LR3dsDSEPsVSFpUWV8Mry.HWbqZN.",
    "user_role": 2,
    "user_username": "pambeasley"
  },
  {
    "user_email": "jim@something.com",
    "user_id": 2,
    "user_name": "Jim Halpert",
    "user_password": "$2a$08$/C4lRMgj5RlRwxlNqn8T0.l1LR3dsDSEPsVSFpUWV8Mry.HWbqZN.",
    "user_role": 2,
    "user_username": "jimhalpert"
  },
  {
    "user_email": "dwight@something.com",
    "user_id": 3,
    "user_name": "Dwight Schrute",
    "user_password": "$2a$08$/C4lRMgj5RlRwxlNqn8T0.l1LR3dsDSEPsVSFpUWV8Mry.HWbqZN.",
    "user_role": 2,
    "user_username": "dwightschrute"
  }
]
```

### [DELETE] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

- Delete an existing user
  - _requires valid token in authorization header to delete_
  - _(example uses "6" for **:user_id** in URL)_

_What you receive:_

```json
{
  "user_id": 6,
  "user_username": "DeletedUser"
}
```

##

## <p align="center">---------- CLASSES ----------</p>

### [GET] /api/classes

**_RESTRICTED ENDPOINT_**

- Get an array of classes for authenticated user
  - _requires valid token in authorization header to access_
  - _(example uses "1" for **:user_id** in URL)_

_What you receive:_

```json
[
  {
    "attendees": "0",
    "class_duration": "2 hours",
    "class_id": 1,
    "class_level": 5,
    "class_location": "123 Street Dr, City STATE",
    "class_max_size": 10,
    "class_name": "Morning Run",
    "class_start": "7:00AM",
    "class_type": "Cardio",
    "instructor_id": 2
  },
  {
    "attendees": "5",
    "class_duration": "1 hour",
    "class_id": 2,
    "class_level": 5,
    "class_location": "123 Street Dr, City STATE",
    "class_max_size": 7,
    "class_name": "Aerobics",
    "class_start": "10:00AM",
    "class_type": "Swimming",
    "instructor_id": 4
  }
]
```

### [GET] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

- Get information for a specific class
  - _requires valid token in authorization header to access_
  - _(example uses "1" for **:user_id** and "1" for **:class_id** in URL)_

_What you receive:_

```json
{
  "attendees": "0",
  "class_duration": "2 hours",
  "class_id": 1,
  "class_level": 5,
  "class_location": "123 Street Dr, City STATE",
  "class_max_size": 10,
  "class_name": "Morning Run",
  "class_start": "7:00AM",
  "class_type": "Cardio",
  "instructor_id": 2
}
```

### [POST] /api/classes

**_RESTRICTED ENDPOINT_**

- Add a class (authenticated instructor)
  - _requires valid token in authorization header to send_
  - _(example uses "1" for **:user_id** and "8" for **:class_id** in URL)_
  - _required information:_
    - _class_name (string)_
    - _class_type (string)_
    - _class_level (integer)_
    - _class_location (string)_
    - _class_max_size (integer)_
    - _class_start (string)_
    - _class_duration (string)_
    - _instructor_id (integer)_ // save the user_id and user_role in localStorage

_What you send:_

```json
{
  "class_name": "Aerobics",
  "class_type": "Swimming",
  "class_start": "10:00AM",
  "class_duration": "1 hour",
  "class_level": 7,
  "class_location": "Dallas, TX",
  "class_max_size": 25,
  "instructor_id": 2
}
```

_What you receive:_

```json
{
  "class_id": 1,
  "instructor_id": 2,
  "class_name": "Aerobics",
  "class_type": "Swimming",
  "class_start": "10:00AM",
  "class_duration": "1 hour",
  "class_level": 7,
  "class_location": "Dallas, TX",
  "class_max_size": 25
}
```
