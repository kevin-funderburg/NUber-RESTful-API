# NUber RESTful API
This projects goal was to simulate Uber via a RESTful API, Node.js, and Google Maps API by the Agile process of software development.

- Authors: Kevin Funderburg, Fernando Valdez, Chad Palmer
- Texas State University
- Software Engineering - Professor: Jason Diaz - Spring 2019
______
## To launch this project:
1. clone git repository to a local repo
2. navigate to the local repo in command prompt/terminal
3. Start the server with the following command:
```
npm install
node server.js
```
You should receive the following response:
```
Express server listening on port 3000
success!
```
4. API can now be tested.
___

## Testing the API
- This API consists of admins, riders, drivers and trips.
- Admins can create or delete: riders, drivers, or admins.
- A rider can make a trip
- A trip can be made with ZenMode enabled, or special notes to the driver.
- The trip can be updated with a tip amount and rating.


### GET
______
```
- Get all trips - http://localhost:3000/trip
- Get all riders - http://localhost:3000/rider
- Get all drivers - http://localhost:3000/driver
- Get rider information - http://localhost:3000/driver/:id
- Get driver information - http://localhost:3000/driver/:id
- Get all drivers within 10 miles - http://localhost:3000/rider/driverByDistance/:id
- Make a trip with http://localhost:3000/rider/driverByDistance/:id
```

### PUT
______
```
- Update driver data - http://localhost:3000/driver/:id
- Update rider data - http://localhost:3000/rider/:id
- Update trip data - http://localhost:3000/trip/:id
```

______
### POST/DELETE
```
- Create drivers - http://localhost:3000/admin/driver
- Create riders - http://localhost:3000/admin/rider
- Create admins - http://localhost:3000/admin/
```
