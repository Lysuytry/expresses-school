import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);

const createScoreValidator = Joi.object().keys({
  exam: Joi.string().required(),
  student: Joi.objectId().required(),
  result: Joi.array().items(Joi.object().keys(
    {
      subject: Joi.objectId().required(),
      subjectName: Joi.string().required(),
      socre: Joi.number().max(101).min(0)
    }
  ))
});

const updateScoreValidator = Joi.object().keys({
  exam: Joi.string(),
  student: Joi.objectId(),
  result: Joi.array().items(Joi.object().keys(
    {
      subject: Joi.objectId(),
      subjectName: Joi.string(),
      socre: Joi.number().max(101).min(0)
    }
  ))
});

const validator = (req, schema) => {
  const {exam, student, result} = req.body;
  return Joi.validate({exam, student, result}, schema);
};

export const validateCreatingScore = (req, res, next) => {
  try{
    const error = validator(req, createScoreValidator);
    error.error === null ? next() : res.fail(error.error.message);
  } catch(error){
    res.fail(error.error);
  }
};

export const validateUpdatingScore = (req, res, next) => {
  try{
    const error = validator(req, updateScoreValidator);
    error.error === null ? next() : res.fail(error.error.message);
  } catch(error){
    res.fail(error);
  }
};
