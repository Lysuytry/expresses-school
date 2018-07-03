import Student from '../../models/student';
import {fakerStudent} from '../../common/dump';

export const getStudentList = async (req, res) => {
  try{
    const {limit, skip, status} = req.query;
    const fliterMatch = {$and: [{status}]};
    const countCondition = [{status} ];
    const conditions = [ {$match: {...fliterMatch}}, {$skip: skip}, {$limit: limit}];
    const [students, total] = await Promise.all([Student.aggregate(conditions), Student.count(...countCondition)]);
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
