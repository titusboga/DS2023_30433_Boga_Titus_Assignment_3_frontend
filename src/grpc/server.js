const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "message.proto";
const SERVER_URI = "0.0.0.0:50052";

const observers = [];

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const sendMsg = (call, callback) => {
  const chatObj = call.request;
  observers.forEach((observer) => {
    observer.call.write(chatObj);
  });
  callback(null, {});
};

const receiveMsg = (call, callback) => {
  observers.push({
    call,
  });
};

const server = new grpc.Server();

server.addService(protoDescriptor.MessageService.service, {
  sendMsg,
  receiveMsg,
});

server.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});

console.log("Server is running!");