import Subject from '../../models/subject';
import { fakerSubject } from '../../common/dump';

export const createSubject = async (req, res) => {
  try{
    const {name, teachers} = req.body;
    const subject = new Subject({name, teachers});
    const result = await subject.save();
    res.success(result);
  } catch(error){
    res.fail(error.message);
  }
};

export const getSubjectList = async (req, res) => {
  try{
    const {limit, skip, status} = req.query;
    const fliterMatch = {$and: [{status}] };
    const countConditions = { status};
    const conditions = [ {$match: fliterMatch} ];
    const [subjects, total] = await Promise.all([ Subject.aggregate([...conditions, {$skip: skip}, {$limit: limit} ]), Subject.count(countConditions) ]);
    res.success(subjects, {limit, skip, total});
  } catch(error){
    res.fail(error.message);
  }
};

export const getSubjectById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const subject = await Subject.findOne({_id: id, status});
    res.success(subject);
  } catch(error){
    res.fail(error.message);
  }
};

export const updateSubjectById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{_id: id, status}, {$set: data}];
    await Subject.updateOne(...conditions);
    res.success('Successfully Updated.');
  } catch(error){
    res.fail(error.message);
  }
};

export const deleteSubjectById = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.query;
    const conditions = [{_id: id, status}, {$set: {status: 'inactive'}}];
    const result = await Subject.updateOne(...conditions);
    console.log(result);
    res.success('Successfully deleted.');
  } catch(error){
    res.fail(error.message);
  }
};

export const fakeSubject = async (req, res) => {
  try{
    const subject = new Subject(fakerSubject);
    await subject.save();
    res.success('ss');
  }catch(error){
    res.fail(error);
  }
};

