import validator from 'validator';

export const validateCreatingTeacher = (req, res, next) => {
  const { first, last, gender, phone, email} = req.body;
  try{

    validator.isAlpha(first) && validator.isAlpha(last) && validator.isAlpha(gender) && validator.isNumeric(phone)
    && validator.isEmail(email) ? next() : res.fail('Error Validation');

  } catch( error ){
    res.fail(error.message);
  }

};
