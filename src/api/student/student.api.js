import Student from '../../models/student';
import {fakerStudent} from '../../common/dump';
import {fliterAlgorithms} from '../../common/algorithms';

export const getStudentList = async (req, res) => {
  try{
    const {limit, skip} = req.query;
    // ./common/algorithms.js
    const [find, count] = fliterAlgorithms(req.query);
    const [students, amount] = await Promise.all([Student.aggregate(find), Student.aggregate(count)]);
    const total = amount[0].total;
    const options = {limit, skip, total};
    res.success(students, options);
  } catch( error ){
    res.fail(error);
  }
};

export const createStudent = async (req, res) => {
  try{
    //year-month-day
    const {first, last, gender, birthday, email, telephone, subjects} = req.body;
    const student = new Student({first, last, gender, birthday, email, telephone, subjects});
    const result = await student.save();
    res.success(result);
  } catch( error ){
    res.fail(error);
  }
};

export const getStudentById = async (req, res) => {
  try{

    const { id } = req.params;
    const { status } = req.query;
    const student = await Student.findOne({_id: id, status});
    student ? res.success(student) : res.success({});
  } catch(error){
    res.fail(error);
  }
};

export const updateStudentById = async (req, res) => {
  try{
    const data = req.body;
    const {id} = req.params;
    const {status} = req.query;
    const conditions =[{_id: id, status}, {$set: data}];
    const result = await Student.updateOne(...conditions);
    console.log(result);
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};

export const deleteStudentById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const conditions = [{_id: id, status}, {$set: {status: 'inactive'}}];
    await Student.updateOne(...conditions);
    res.success('Succesfully deleted.');
  } catch(error){
    res.fail(error.message);
  }
};

export const fakeStudent = async (req, res) => {
  try{
    const student = new Student(fakerStudent);
    await student.save();
    res.success('ss');
  }catch(error){
    res.fail(error);
  }
};
