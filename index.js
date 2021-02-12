const server = require("./api/server");

const port = 1234;

server.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})
