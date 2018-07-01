import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);
// Validation methods
const createTeacherValidatorSchema = Joi.object().keys({
  first: Joi.string().required(),
  last: Joi.string().required(),
  gender: Joi.string().required(),
  phone: Joi.string().alphanum().required(),
  email: Joi.string().email().required()
});

const updateTeacherValidatorSchema = Joi.object().keys({
  id: Joi.objectId(),
  first: Joi.string(),
  last: Joi.string(),
  gender: Joi.string(),
  phone: Joi.string().alphanum(),
  email: Joi.string().email()
});

export const validateCreatingTeacher = (req, res, next) => {
  try{
    const {first, last, email, phone, gender} = req.body;
    const { error } = Joi.validate({first, last, email, phone, gender}, createTeacherValidatorSchema);
    error.error === null ? next() : res.fail(error.message);
  } catch( error ){
    res.fail(error.message);
  }
};

export const validateUpdatingTeacher = (req, res, next) => {
  try{
    const {first, last, email, phone, gender} = req.body;
    const { id } = req.params;
    const { error } = Joi.validate({first, last, email, phone, gender, id}, updateTeacherValidatorSchema);
    error.error === null ? next() : res.fail(error.message);
  } catch(error){
    res.fail(error.message);
  }
};

export const validateQueryTeacher = (req, res, next) => {
  try{
    next();
  } catch(error){
    res.fail(error.message);
  }
};
