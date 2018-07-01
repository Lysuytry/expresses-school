import Joi from 'joi';
import objectid from 'joi-objectid';

Joi.objectId = objectid(Joi);

const createSubjectValidator = Joi.object().keys({
  name: Joi.string().required(),
  teachers: Joi.array().items(Joi.objectId())
});

const updateSubjectValidator = Joi.object().keys({
  name: Joi.string(),
  teachers: Joi.array()
});

export const validateCreatedSubject = (req, res, next) => {
  try{
    const {name, teachers} = req.body;
    const error = Joi.validate({name, teachers}, createSubjectValidator);
    error.error === null ? next() : res.fail(error);
  } catch(error){
    res.fail(error.message);
  }
};

export const validateUpdateSubject = (req, res, next) => {
  try{
    const {name, teachers} = req.body;
    const error = Joi.validate({name, teachers}, updateSubjectValidator);
    error.error === null ? next() : res.fail(error.value);
  } catch(error){
    res.fail(error.message);
  }
};
