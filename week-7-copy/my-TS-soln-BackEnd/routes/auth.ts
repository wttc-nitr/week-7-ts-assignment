// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
// const express = require('express');
import express from "express"
// const { authenticateJwt, SECRET } = require("../middleware/");
import { authenticateJwt, SECRET } from "../middleware/index"
// const { User } = require("../db");
import { User } from "../db/index"
const router = express.Router();

  router.post('/signup', async (req , res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req , res ) => {
      const user = await User.findOne({ _id: req.headers["userId"] });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  // module.exports = router
  export default router;