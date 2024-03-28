const mysql = require('mysql');
const express = require("express");


const con =mysql.createConnection({
    host:"0.0.0.0",
    user:"root",
    password:"",
    database:"college"
});

console.log("Database connected Successfully");
module.exports = con;
