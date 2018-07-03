import Score from '../../models/score';
import mongoose from 'mongoose';

export const getScoreList = async (req, res) => {
  try{
    const {limit, skip, status, exam = ''} = req.query;
    const fliterMatch = {$match: {$and: [ {status}, {exam} ]}};
    const conditions = [{...fliterMatch}, {$skip: skip}, {$limit: limit}];
    const countConditions = [{status}];
    const [scores, total] = await Promise.all([ Score.aggregate(conditions), Score.count(...countConditions)]);
    res.success(scores, {limit, skip, total});
  } catch(error){
    res.fail(error.message);
  }
};

export const getScoreById = async (req, res) => {
  try{
    const { status } = req.query;
    const conditions = [ {status} ];
    const score = await Score.findOne(...conditions);
    score ? res.success(score) : res.success({});
  } catch(error){
    res.fail(error);
  }
};

export const createScore = async (req, res) => {
  try{
    const {exam, student, result} = req.body;
    const score = new Score({exam, student, result});
    const created = await score.save();
    res.success(created);
  } catch(error){
    res.fail(error);
  }
};

export const updateScoreById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } =req.query;
    const data = req.body;
    const conditions = [{_id: id, status}, {$set: data }];
    await Score.updateOne(...conditions);
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error.message);
  }
};

export const deleteScoreById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{_id: id, status}];
    await Score.updateOne(...conditions, {status: 'inactive'});
    res.success('Successfully deleted.');
  } catch(error){
    res.fail(error.error);
  }
};

export const deletedScore = async (req, res) => {
  try{
    const { id } = req.body;
    console.log(id);
    await Score.deleteMany({id});
    res.success();
  } catch(error){
    res.fail(error);
  }
};

////////////////////////////

export const getStudentScoreById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status, exam = ""} = req.query;
    const student = await Score.findOne({student: id, exam, status});
    student ? res.success(student) : res.success({});
  } catch(error){
    res.fail(error);
  }
};

//for sometime they will submit all change
export const updateManyStudentScoreById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status, exam = ""} = req.query;
    const { result } = req.body;
    await Score.update({student: id, exam, status}, {$set: result});
    res.success('Succesfully updated.');
  } catch(error){
    res.fail(error);
  }
};

//using for edit as in admin webpage always saved after click updated one by one
export const updateOneStudentScoreById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status, exam = ''} = req.query;
    const { subject = '', score = 0 } = req.body;
    await Score.update({student: id, exam, status, result: { $elemMatch: {subject: mongoose.Types.ObjectId(subject)}} }, {$set: {'result.$.score': score} });
    res.success('Succesfully updated.');
  } catch(error){
    res.fail(error);
  }
};

export const getListReportExamStudent = async (req, res) => {
  try{
    const {limit, skip, status, exam = ''} = req.query;
    const match = {status, exam};
    const conditions = [{...match}];
    //fliter field
    const showResult = '_id student result';
    const showStudent = '_id first last gender email birthday telephone';
    const [scores, total] = await Promise.all([ Score.find(...conditions, showResult).skip(skip).limit(limit).populate({path: 'student', select: showStudent}), Score.count(match)]);
    res.success(scores, {limit, skip, total});
  } catch(error){
    res.fail(error.message);
  }
};

////////////////////////////

