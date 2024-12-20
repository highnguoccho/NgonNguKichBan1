const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Đã kết nối db')
    }
})

module.exports = db;