import Teacher from '../../models/teacher';

export const getTeacherList = async (req, res) => {
  try{
    const teachers = await Teacher.find();
    res.success(teachers);
  } catch(error){
    res.fail(error);
  }
};

export const createTeacher = async (req, res) => {
  try{
    const { first, last, gender, phone, email} = req.body;
    const teacher = new Teacher({ first, last, gender, phone, email});
    await teacher.save();
    res.success(`create an object`, 201);
  } catch(error){
    res.fail(error);
  }
};
