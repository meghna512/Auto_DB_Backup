## Automatic DB Backup

This is an [npm module](https://www.npmjs.com/package/db_backup) which facilitates automatic [mongodb](https://www.mongodb.com/) database backup at a specified time each day, this project uses Amazon S3 Bucket for data storage. It creates mongodump of the data and converts it into a zip file which is uploaded to [Amazon S3 Bucket](https://aws.amazon.com/s3/) and this task is automated using node cron.

## Installation

`npm install db_backup`

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

 * **Backup Time**: The time at which you want to take backup everyday. It is entered in the cron string format (30 * * * * *) where first field from the left denotes seconds, minutes, hour, day, month, year respectively.

 * **Host**: Signifies the host you are using

 * **Port**: The port at which you are using

 * **Database Name**: Name of the database you want to take backup of

 * **Bucket**: S3 bucket name

 * **Key**: AWS API key

 ### Errors

 This module creates errors depending on the format in which config object has been sent if the object mismatches the order or misses out on any field, an error will be thrown. To avoid seeing this error please enter config object in the specified format only.

 ### License

[MIT](https://github.com/meghna512/Auto_DB_Backup/blob/master/LICENSE)
