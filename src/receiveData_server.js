const io = require('socket.io-client');

function receiveData(ip, port) {
    const socket = io(`http://${ip}:${port}`);

    socket.on('connect', () => {
        console.log("Connected");
        const send_data = 'listener';
        socket.emit('message', send_data);
    });

    socket.on('data', (data) => {
        try {
            const data_json = JSON.parse(data.toString());
            console.log(`latitude: ${data_json['latitude']}`);
            console.log(`longitude: ${data_json['longitude']}`);
            console.log(`altitude: ${data_json['altitude']}`);
            console.log(`yaw: ${data_json['yaw']}`);
            console.log(`pitch: ${data_json['pitch']}`);
            console.log(`roll: ${data_json['roll']}`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('error', (error) => {
        console.error(error);
    });

    socket.on('disconnect', () => {
        console.log("Connection closed");
    });
}

function main() {
    const ip = '203.255.57.136';
    const port = 5252;
    receiveData(ip, port);
}

main();


