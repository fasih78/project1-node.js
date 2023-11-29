const express = require("express");
const fs = require("fs");

const file1 = async (req, res) => {
  try {
    let data = [
      {
        name: "ABC",
        age: 98878,
      },
      {
        name: "ABC",
        age: 98878,
      },
      {
        name: "ABC",
        age: 98878,
      },
    ];
    const data1 = JSON.stringify(data);
    fs.writeFile("demo2.js", data1, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Failed to write file");
      } else {
        res.send("File written successfully.");
      }
    });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const readFile1 = async (req, res) => {
  try {
  const filePath = './demo2.js'
console.log(filePath);
    fs.readFile(filePath, "utf8", (err, data) => {
      res.status(200).send({ data: JSON.parse(data) });
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const copyFILE =async (req,res) =>{

try {
  fs.copyFile(
    "source.txt",
    "./demo2.js",
    fs.constants.COPYFILE_FICLONE,
    (err) => {
      if (err){
        console.log("error");
      }
      console.log("success");
    }
  );


} catch (error) {
  
}

}





module.exports = {
  file1,
  readFile1,
};
