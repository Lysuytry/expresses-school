import Score from '../../models/score';

export const getScoreList = async (req, res) => {
  try{
    const {limit, skip, status} = req.query;
    const fliterMatch = {$match: {$and: [ {status} ]}};
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
