import Student from '../../models/student';

export const getStudentList = async (req, res) => {
  try{
    const [students, total] = await Promise.all([Student.find(), Student.count()]);
    const options = {total};
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
    const { id } = req.query;
    const student = await Student.findOne(id);
    res.success(student);
  } catch(error){
    res.fail(error);
  }
};
