/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v0.0.0
// source: message.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./message_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MessageServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.MessageServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Message,
 *   !proto.Empty>}
 */
const methodDescriptor_MessageService_sendMsg = new grpc.web.MethodDescriptor(
  '/MessageService/sendMsg',
  grpc.web.MethodType.UNARY,
  proto.Message,
  proto.Empty,
  /**
   * @param {!proto.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.MessageServiceClient.prototype.sendMsg =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/MessageService/sendMsg',
      request,
      metadata || {},
      methodDescriptor_MessageService_sendMsg,
      callback);
};


/**
 * @param {!proto.Message} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.MessageServicePromiseClient.prototype.sendMsg =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/MessageService/sendMsg',
      request,
      metadata || {},
      methodDescriptor_MessageService_sendMsg);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.Message>}
 */
const methodDescriptor_MessageService_receiveMsg = new grpc.web.MethodDescriptor(
  '/MessageService/receiveMsg',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.Empty,
  proto.Message,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Message.deserializeBinary
);


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.MessageServiceClient.prototype.receiveMsg =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/MessageService/receiveMsg',
      request,
      metadata || {},
      methodDescriptor_MessageService_receiveMsg);
};


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.MessageServicePromiseClient.prototype.receiveMsg =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/MessageService/receiveMsg',
      request,
      metadata || {},
      methodDescriptor_MessageService_receiveMsg);
};


module.exports = proto;

