const cron = require('node-cron');
const AWS = require('aws-sdk');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const path = require('path');

const s3 = new AWS.S3();


const setBackupTime = function (config) {
    console.log("Starting to create backup");
    if (configValidation(config)) {
        cron.schedule(config.backupTime, () => {
            try {
                createBackup(config);
            } catch (err) {
                throw err;
            }
        });
    }
}

function configValidation(config) {
    if (config.backupTime && config.host && config.port && config.dbName && config.bucket && config.key) {
        return true;
    } else {
        throw new Error("Please enter a valid input in the order of backup time, hostname, port, db name");
    }
}

function createBackup(config) {
    console.log("Creating Backup");
    exec(`mongodump --host ${config.host} --port ${config.port} --db ${config.dbName}`, (error, stdout, stderr) => {
        if (error) {
            throw error;
        } else {
            execSync(`zip -r backup *`, {
                cwd: path.join(__dirname, "./")
            });
            uploadBackup(config);
        }
    });
}

function uploadBackup(config) {
    console.log("Uploading Bakcup");
    const params = {
        Bucket: config.bucket,
        Key: config.key
    }
    params.Body = fs.readFileSync(path.join(__dirname, "./backup.zip"), 'binary');
    s3.putObject(params, function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log(`Backup uploaded successfully at ${new Date().toISOString()}`)
        }
    });
    cleanUp();
}

function cleanUp() {
    try {
        fs.unlinkSync(path.join(__dirname, './backup.zip'));
        fs.rmdirSync(path.join(__dirname, './dump'), { recursive: true });
    }catch(err){
        throw err;
    }  
    console.log("Clean Up Done");
}

module.exports = {
    setBackupTime
}