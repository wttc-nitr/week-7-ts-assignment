// const express = require("express");
import express from 'express'
const app = express();
// const mongoose = require("mongoose");
import mongoose from 'mongoose';
const port = 3000;
// const authRoutes = require("./routes/auth");
import authRoutes from "./routes/auth"
// const todoRoutes = require("./routes/todo");
import todoRoutes from "./routes/todo"
// const cors = require("cors");
import cors from "cors"

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    
})

mongoose.connect("mongodb+srv://wttc:BbS3rpgcButjNnEW@cluster0.wobs88k.mongodb.net/todo-app");
