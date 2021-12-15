<h3>Vehicles API</h3>
<ul>
  <li>Create Vehicle

```
Method: POST
URL: http://localhost:5151/api/v1/vehicles
```

```
Request:
{
	"name" : "VEHICLE_NAME",
	"plateNumber" : "PLATE_NUM",
	"ownerName": "OWNER_NAME"
}
```

  </li>
</ul>

---

<h3>Parking Gates API</h3>
<ul>
  <li>Create Parking Gate

```
Method: POST
URL: http://localhost:5151/api/v1/parking-gates
```

```
Request:
{
	"gateName" : "GATENAME"
}
```

  </li>
</ul>

---

<h3>Parking API</h3>
<ul>
  <li>Create Parking
  
  ```
  Method: POST
  URL: http://localhost:5151/api/v1/parkings
  ```
  ```
  Request:
  {
    "parkingGateId" : 3,
    "vehicleId" : 2
  }
  ```
  ```
  SCENARIO: Vehicle already Parked
  Response 533:
  {
    "data": null,
    "message": "This Vehicle is already parked"
  }
  ```
  ```
  Response 200:
  {
    "data": {
      "id": 3,
      "startTime": "2021-12-15T18:23:22.989Z",
      "vehicleId": 1,
      "parkingGateId": 2
    },
    "message": "OK"
  }

```
</li>

<li>End Parking

```
Method: PATCH
URL: http://localhost/api/v1/parkings/end

```

```
Request:
{
  "vehicleId" : 3
}

```

```

SCENARIO: Vehicle isn't Parked
Response 535:
{
  "data": null,
  "message": "This Vehicle is not yet parked"
}

```

```

Response 200:
{
  "data": {
    "id": 1,
    "vehicleId": 3,
    "parkingGateId": 2,
    "startTime": "2021-12-15T18:20:49.000Z",
    "endTime": "2021-12-15T18:54:31.081Z",
    "fee": 10
  },
  "message": "OK"
}

```

</li>

</ul>
```
