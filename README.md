# <p align="center">ft-anywhere-fitness-3 api</p>

## <p align="center">https://ft-anywhere-fitness-3.herokuapp.com</p>

## <p align="center">REGISTER / LOGIN</p>

### <p align="center">User examples:</p>

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

### [POST] /api/auth/register

- Register a new user
  - _username required (must be a string | unique)_
  - _password required (must be a string)_

_What you send:_

```json
{
  "user_name": "Jim Halpert",
  "user_username": "jimhalpert",
  "user_email": "jim@something.com",
  "user_password": "randompassword",
  "user_role": "if nothing provided, defaults to 2 (integer NOT string) | 1 = instructor, 2 = client"
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
  - _user_username and user_password required_
  - _returns the following:_
    - _message: { "Welcome back jimhalpert " }_
    - _token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIzMzE4NzksImV4cCI6MTYzMjQxODI3OX0.Ajk-7XyY83eXwbo2mp5Q2_qEUdsfr1XnWy-wGtGX2XE"_
    - _user_id: 1_
    - _user_role: 2_

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIzMzE4NzksImV4cCI6MTYzMjQxODI3OX0.Ajk-7XyY83eXwbo2mp5Q2_qEUdsfr1XnWy-wGtGX2XE",
  "user_id": 1,
  "user_role": 2
}
```

## <p align="center">CLASSES</p>

### [GET] /api/classes

**_RESTRICTED ENDPOINT_**

- Get an array of classes for authenticated user
  - _requires valid token in authorization header to access_

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
  - _required information:_
    - _class_name (string)_
    - _class_type (string)_
    - _class_level (integer)_
    - _class_location (string)_
    - _class_max_size (integer)_
    - _class_start (string)_
    - _class_duration (string)_
    - _instructor_id (integer)_

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

### [POST] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

- Adding attendance to class (authenticated client)
  - _requires valid token in authorization header to send_
  - _required information:_
    - _class_id (integer)_
    - _user_id (integer, provided at login | **save to localStorage**)_

_What you send:_

```json
{
  "class_id": 1,
  "user_id": 1
}
```

_What you receive:_

```json
{
  "class_id": 1,
  "user_id": 1
}
```

### [PUT] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

- Update an existing class (authenticated instructor)
  - _requires valid token in authorization header to send_
  - _required information:_
    - _class_name (string)_
    - _class_type (string)_
    - _class_level (integer)_
    - _class_location (string)_
    - _class_max_size (integer)_
    - _class_start (string)_
    - _class_duration (string)_
    - _instructor_id (integer)_

_What you send:_

```json
{
  "class_name": "A little change",
  "class_type": "Running",
  "class_start": "10:00AM",
  "class_duration": "1 hour",
  "class_level": 7,
  "class_location": "Chicago, IL",
  "class_max_size": 5,
  "instructor_id": 2
}
```

_What you receive:_

```json
{
  "class_name": "A little change",
  "class_type": "Running",
  "class_start": "10:00AM",
  "class_duration": "1 hour",
  "class_level": 7,
  "class_location": "Chicago, IL",
  "class_max_size": 5,
  "instructor_id": 2
}
```

### [DELETE] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

- Delete an existing class (authenticated instructor)
  - _requires valid token in authorization header to send_
  - _required information:_
    - _class_id (integer)_

_Nothing gets returned on successful deletion_
