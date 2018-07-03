import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);

const createStudentValidator = Joi.object().keys({
  first: Joi.string().required(),
  last: Joi.string().required(),
  gender: Joi.string().required(),
  birthday: Joi.string().required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().alphanum().required(),
  subjects: Joi.array().items(Joi.objectId())
});

const updateStudentValidator = Joi.object().keys({
  first: Joi.string(),
  last: Joi.string(),
  gender: Joi.string(),
  birthday: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string().alphanum(),
  subjects: Joi.array().items(Joi.objectId())
});

export const validateCreatingStudent = (req, res, next) => {
  try{
    const {first, last, gender, birthday, email, telephone, subjects} = req.body;
    const error = Joi.validate({first, last, gender, birthday, email, telephone, subjects}, createStudentValidator);
    error.error === null ? next() : res.fail(error);
  } catch(error) {
    res.fail(error.message);
  }
};

export const validateUpdatingStudent = (req, res, next) => {
  try{
    const {first, last, gender, birthday, email, telephone, subjects} = req.body;
    const error = Joi.validate({first, last, gender, birthday, email, telephone, subjects}, updateStudentValidator);
    error.error === null ? next() : res.fail(error.error);
  } catch(error){
    res.fail(error.message);
  }
};
