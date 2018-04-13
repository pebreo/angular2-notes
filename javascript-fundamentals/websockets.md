## Websockets using SocketsIO 

If you want to implement websockets in Javascript, a popular library to use
is SocketsIO. In the following code below you can quickly work with websockts.

In a nutshell, you will be using `on()` and `emit()` methods to send and 
receive to and from the client and server. 

Both the `on()` method has two parameters: the message and
a callback. The message is a string e.g. 'mymessage'.
THe callback is data received from the other side as a result of a message.

From the client you send messages to the server using the `emit()` and 
you receive messages from the server using `on()`.

For the server it is the same approach.
### server code - abridged
```javascript
var IO = require('socket.io');
var realtimeListener = IO.listen(server); 

realtimeListener.on('connection', function (socket) {

    // receives a throw card message from a phone
    socket.on('phone-throw-card', function (cardData) {
        if (tableSocket) {
            // ... and forwards the data to the card table
            tableSocket.emit('phone-throw-card', cardData);
        }
    });
}
```
    
### client code - abridged
```javascript
var socket = io.connect(YOUR_NODEJS_SERVER_URL);

socket.on('phone-throw-card', function (cardData) {
    // Call animate card enter function here
});
```


### complete server
```javascript
// import dependencies
var HTTP = require('http');
var IO = require('socket.io');

// Create a basic web server
var server = HTTP.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Websocket server is up and running!\n');
});

// HTTP server will listen on port 80
server.listen(80);
// create a WebSocket listener for the same server
var realtimeListener = IO.listen(server); 

// socket to the card table
var tableSocket;

realtimeListener.on('connection', function (socket) {
  
    // receives a connect message from the card table
    socket.on("table-connect", function () {
        // ...  and stores the card table socket
        tableSocket = socket;
    });

    // receives a throw card message from a phone
    socket.on('phone-throw-card', function (cardData) {
        if (tableSocket) {
            // ... and forwards the data to the card table
            tableSocket.emit('phone-throw-card', cardData);
        }
    });
});

```


### complete client
```javascript
var socket = io.connect(YOUR_NODEJS_SERVER_URL);
    
// register card table socket right after the connection is established
socket.emit('table-connect');

socket.on('phone-throw-card', function (cardData) {
    // Call animate card enter function here
});
```

## Resources

https://medium.com/outsystems-engineering/making-magic-with-websockets-and-css3-ec22c1dcc8a8
