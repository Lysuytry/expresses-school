import Teacher from '../../models/teacher';

export const getTeacherList = async (req, res) => {
  try{
    const {status, limit, skip} = req.query;
    //const fliterMatch = {status};
    const conditions = { status };
    const [teachers, total] = await Promise.all([ Teacher.find(conditions).skip(skip).limit(limit), Teacher.count(conditions)]);
    res.success(teachers, {limit, skip, total});
  } catch(error){
    res.fail(error.message);
  }
};

export const getTeacherById = async (req, res) => {
  try{
    const { id } = req.params;
    const conditions = {_id: id, status: 'active'};
    const teacher = await Teacher.findOne(conditions);
    teacher ? res.success(teacher) : res.success({});
  } catch( error ){
    res.fail(error);
  }
};

export const createTeacher = async (req, res) => {
  try{
    const {first, last, gender, phone, email} = req.body;
    const teacher = new Teacher({ first, last, gender, phone, email});
    const data = await teacher.save();
    res.success(data);
  }catch( error){
    res.fail(error.message);
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { status = 'active' } = req.query;
    const data = req.body;
    const conditions = [{_id: id, status}, {$set: data}];
    await Teacher.updateOne(...conditions);
    res.success('Successfully updated.');
  }catch( error){
    res.fail(error.message);
  }
};

export const deleteTeacher = async (req, res) => {
  try{
    const { id } = req.params;
    const conditions = [ {_id: id, status: 'active'}, {status: 'inactive'}];
    await Teacher.updateOne(...conditions);
    res.success('Deleted successfully.');
  } catch( error ){
    res.fail(error.message);
  }
};
