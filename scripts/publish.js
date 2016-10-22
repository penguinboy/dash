var s3 = require('s3');
var config = require('../aws.config');
var http = require('http');
var https = require('https');

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 20;

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: config.s3_key,
    secretAccessKey: config.s3_secret,
    region: config.region
  },
});

var params = {
  localDir: "dist",
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.

  s3Params: {
    Bucket: config.bucket,
    Prefix: "",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});

uploader.on('fileUploadStart', function(file, s3Key) {
  console.log("Starting upload:", file, s3Key);
});

uploader.on('fileUploadEnd', function(file, s3Key) {
  console.log("Ending upload:", file, s3Key);
});