import nameParttern from './search';
import mongoose from 'mongoose';

//Algoritms for finding name & gender using in Teacher and Student
export const fliterAlgorithms = (data) => {
  const {limit, skip, status, name, gender} = data;

  const partternName = new nameParttern(name, gender);
  //projection
  const fliterProject = {
    fullname: { $concat: ['$first','$last']}, fullnameReverse: { $concat: ['$last','$first']}, first: 1, last: 1, gender: 1, status: 1, birthday: 1, email: 1, telephone: 1};
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

//Algorithm for join table Student with subject only 1

export const joinSubjectById = (id, status) => {
  ////////////  selected field to show
  const fliterProject = {_id: 1, subjects: 1, status: 1};
  ////////////
  const fliterLookup = {localField: 'subjects',  from: 'subjects', foreignField: '_id', as: 'subjects'};
  /*  using for seperate innner 2 different object outside or just like populate */
  const fliterUnwind = {path: '$subjects'};
  /*                    */
  const fliterMatch = {$and: [{_id: mongoose.Types.ObjectId(id)}, {status}] };
  //first get list id of singer who have in name query
  return [{$project: {...fliterProject}}, {$lookup: {...fliterLookup}}, {$unwind: {...fliterUnwind}}, {$match: {...fliterMatch}}];
};
