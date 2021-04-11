## Automatic DB Backup

This is a [Node.js](https://nodejs.org/en/)
 based module which facilitates in automatic DB backup at a specified time.

## Installation

`npm install DB_Backup`

## How to use

```javascript
var DB_Backup = require('DB_Backup');
app.use(DB_Backup.setBackupTime({
     backupTime: "30 * * * * *",
     host : "localhost",
     port: 27017,
     dbName: "landscanapi",
     bucket: "s3bucketname",
     key: "awsapikey"
}));

```
 It takes a config object as input containing backup time, host, port, database name, bucket and key.
 
 ### Documentation-

 * Backup Time: The time at which you want to take backup everyday. It is entered in the cron string format (30 * * * * *) where first field from the left denotes seconds, minutes, hour, day, month, year respectively.

 * Host: Signifies the host you are using

 * Port: The port at which you are using

 * Database Name: Name of the database you want to take backup of

 * Bucket: S3 bucket name

 * Key: AWS API key

 ### Errors

 This module creates errors depending on the format in which config object has been sent if the object mismatches the order or misses out on any field, an error will be thrown. To avoid seeing this error please enter config object in the specified format only.

 ### License

 MIT