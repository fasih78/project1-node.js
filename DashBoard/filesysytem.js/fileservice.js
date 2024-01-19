const express = require("express");
const fs = require("fs");
const CustomerModel = require("../customers/customermodel");
const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config()
const connectdb =require ('../db.js')

const CreateFileHandler = async (req, res) => {
  try {

    const customerid =  req.params.id;
    console.log(customerid);

    const customer = await CustomerModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(customerid),
         isDeleted:false
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country_id",
          foreignField: "_id",
          as: "country",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "city",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "_id",
          as: "state",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
    ]);
  
    console.log(customer);
  

  const file = fs.appendFile('test.txt', JSON.stringify(customer, null, 2), (err) => {

      if (err) {
        console.error('Error appending to file:', err);
      } else {
        console.log('Data appended to file successfully.');
      }
    });
    
    return  res.status(200).send({message:"file saved sucessfully!"})
  
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  
};


const  ReadFile = async (req,res)=>{
  const filePath = 'test.txt';
  
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.log(`File content:\n${data}`);
      res.status(200).send([{data:data}])
    }
  });

}

const Copyfile = async (req, res) => {
  try {
 
    const sourcePath = 'test.txt';
    const destinationPath = 'copy1.txt';

    function copyFile(sourcePath, destinationPath, callback) {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
      writeStream.write('Hello, Anas');
      readStream.on('error', (err) => {
        if (callback) {
          callback(err);
        } else {
          console.error(`Read stream error: ${err.message}`);
        }
      });

      readStream.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data: ${chunk.toString()}`);
      });
      
      // Handle 'end' event when the stream ends
      readStream.on('end', () => {
        console.log('Finished reading data.');
      });
      writeStream.on('error', (err) => {
        if (callback) {
          callback(err);
        } else {
          console.error(`Write stream error: ${err.message}`);
        }
      });

      writeStream.on('finish', () => {
        if (callback) {
          callback(null);
        } else {
          console.log('File copied successfully!');
        }
      });

      readStream.pipe(writeStream);
    }

    copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Error copying file: ${err.message}`);
      } else {
        console.log('File copied successfully!');
      }
    });
    return res.status(200).send({message:`file copied and name is ${destinationPath}`})
  } catch (error) {

    console.error(error);
  }
};

const grid = async(req,res)=>{

  const db = mongoose.connection.db;

  const bucket = new GridFSBucket(db, {
    chunkSizeBytes: 1024 * 1024,
    bucketName: 'myFilesBucket'
  });
  res.status(201).send({message:"grid is created"})
}



module.exports ={CreateFileHandler,ReadFile , Copyfile , grid}
