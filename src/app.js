const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');
require('./database');
const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('./routes/index'));
server.listen(3000, () => console.log('server on port 3000'));

app.use(bodyParser.json());
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM7", {
    baudRate: 9600
});
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function() {
    console.log('connection is opened');
});

parser.on('data', function(data) {
    let temp = parseInt(data, 10) + " °C";
    console.log(temp);
    io.emit('temp', data.toString());
});

io.on('connection', (socket) => {
    console.log('nueva coneccion', socket.id);
    socket.on('disconnect', (socket) => {
        console.log('desconectado');
    });
});
parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));