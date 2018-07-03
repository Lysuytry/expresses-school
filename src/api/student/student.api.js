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
    await Student.updateOne({_id: id, status}, {$set: {status: 'inactive'}});
    res.success('Succesfully deleted.');
  } catch(error){
    res.fail(error.message);
  }
};

//////////////
//    Used via aggregate function
// export const getStudentSubjectsById = async (req, res) => {
//   try{
//     const { id } = req.params;
//     const { status } = req.query;
//     //from algorithms.js
//     const conditions = joinSubjectById(id, status);
//     //.....
//     const student = await Student.aggregate(conditions);
//     student ? res.success(student) : res.success({});
//   } catch(error){
//     res.fail(error);
//   }
// };
//////////////////
//    Used via population mongoose
export const getStudentSubjectsById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const studentField = '_id first last';
    const student = await Student.findOne({_id: id, status}, studentField).populate({ path: 'subjects', select: '_id name'});
    student ? res.success(student) : res.success({});
  } catch(error){
    res.fail(error);
  }
};

///////////////////
//    used to update or deleted subject from student
export const updateStudentSubjectById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const conditions = {_id: id, status};
    const { subjects } = req.body;
    await Student.update(conditions, {$addToSet: {subjects} });
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};
///////////////////
//    used to deleted or deleted subject from student
export const deleteStudentSubjectById = async (req, res) => {
  try{
    const { id, subId } = req.params;
    const { status } = req.query;
    const conditions = {_id: id, status};
    await Student.update(conditions, {$pull: {subjects: subId} }, {multi: true});
    res.success('Successfully deleted field.');
  } catch(error){
    res.fail(error);
  }
};


//////////////

export const fakeStudent = async (req, res) => {
  try{
    const student = new Student(fakerStudent);
    await student.save();
    res.success('ss');
  }catch(error){
    res.fail(error);
  }
};
