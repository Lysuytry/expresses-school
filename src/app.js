import parser from 'body-parser';
import env from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import studentRoute from './api/student/student.route';
import teacherRoute from './api/teacher/teacher.route';
import { ENDPOINT, mongoDBOptions } from './common/constant';

env.config();

mongoose.connect(process.env.CONNECT, mongoDBOptions, (err) => {
  err ? console.log(err) : console.log(`MongoDB Connected`);
});

const app = new express();

app.use((req, res, next) => {
  //response fail
  res.fail = (message, code = 400) => {
    console.log(message);
    return res.status(code).json({message});
  };
  //response success
  res.success = (data, options, code = 200) => {
    data = typeof data === 'object' ? {data, options}: {message: data};
    return res.status(code).json(data);
  };
  next();
});

app.use(logger(`dev`));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false}));

app.use(ENDPOINT, studentRoute);
app.use(ENDPOINT, teacherRoute);

export default app;
