import nameParttern from './search';
export const fliterAlgorithms = (data) => {
  const {limit, skip, status, name, gender} = data;

  const partternName = new nameParttern(name, gender);
  //projection
  const fliterProject = {
    fullname: { $concat: ['$first','$last']}, fullnameReverse: { $concat: ['$last','$first']}, first: 1, last: 1, gender: 1, status: 1};
  //Fliter name by reverse or normal
  const fliterName = name ? {$or:
    [ {fullname: {$in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()]}},
      {fullnameReverse: {$in: [partternName.getFullnameRegExp(), partternName.getReverseRegExp()]}} ]} : {} ;
  //find by gender
  const fliterGender = gender ? {gender: partternName.getGenderRegExp()} : {};

  //bind conditions of matching
  const fliterMatch = {$and: [ {status}, {...fliterName}, {...fliterGender} ]};

  return [ [{$project: {...fliterProject}}, {$match: {...fliterMatch}}, {$skip: skip}, {$limit: limit}], [{$project: {...fliterProject}}, {$match: {...fliterMatch}}, {$count: 'total'}] ];
};
