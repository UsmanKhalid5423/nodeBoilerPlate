/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const { conforms } = require("lodash");
const moment = require("moment");
const sequelize = require("sequelize");
const { query } = require("winston");

/*******************************************************/
//Database Functions.
/*******************************************************/

/**
 * Function: USED TO CREATE OR UPDATE A RESOURCE.
 */
const save = async model => {
  return await model.save();
};

/**
 * Function: USED TO CREATE  RESOURCE.
 */
 const create = async (model,data) => {
  return await model.create(data);
};

/**
 * Function: USED TO CREATE BULK RESOURCES.
 */
const bulkSave = async (model, collection) => {
  return await model.bulkCreate(collection);
};


/**
 * Function: USED TO CREATE BULK RESOURCES.
 */
 const bulkSave_v2 = async (model, collection,attributes) => {
  return await model.bulkCreate(collection,{
    updateOnDuplicate: attributes
  });
};


/**
 * Function: USED TO UPDATE BULK RESOURCES.
 */
const bulkUpdate = async (model, action, where, hook) => {
  if (hook){
    console.log( "HOOK??");
    return model.update(action, {
      where: where
    }, { individualHooks: true});
  }
  else{
    return model.update(action, {
      where: where
    });
  }
  
};

/**
 * Function:USED TO FIND A RESOURCE BY ID.
 */
const findById = async (model, id) => {
  return await model.findOne({ where: { id: id, isDeleted: false } });
};


/**
 * Function:USED TO FIND A RESOURCE BY ID.
 */
 const findById_v2 = async (model, id) => {
  return await model.findOne({ where: { id: id} });
};



const findByWithScope = async (model,scopeNames, where,attributes) => {
  where.isDeleted = false
  if(attributes)
  {
    return await model.scope(scopeNames)
    .findOne({
      where: where,
      attributes: attributes
    });    
  }
  else{
    return await model.scope(scopeNames)
    .findOne({
      where: where,
    });
  }
  
};


/**
 * Function: USED TO FIND A RESOURCE BY USING A CERTAIN CONDITION.
 */
const findBy = async (model, where, orderBy) => {
  where.isDeleted = false;
  if (orderBy) {
    return await model.findOne({
      where: where,
      order: [[orderBy, "DESC"]],
    });
  }
  else {
    return await model.findOne({
      where: where,
    });
  }
};

const findBy_v2 = async (model, where, attributes) => {
  where.isDeleted = false;
  if (attributes){
    const query =  await model.findOne({
      where: where,
      attributes:attributes
    }); 
    return query;
  }
  else {
    return await model.findOne({
      where: where,
    });
  }
};

const findBy_v3 = async (model, where, attributes) => {
  if (attributes){
    const query =  await model.findOne({
      where: where,
      attributes:attributes
    }); 
    return query;
  }
  else {
    return await model.findOne({
      where: where,
    });
  }
};

const findBy_v4 = async (model, where, orderBy) => {
  if (orderBy) {
    return await model.findOne({
      where: where,
      order: [[orderBy, "DESC"]],
    });
  }
  else {
    return await model.findOne({
      where: where,
    });
  }
};

/**
 * Function: USED TO FIND A RESOURCE IF AVAILABLE , IF NOT THEN CREATE THAT RESOURCE.
 */
const findOrCreate = async (model, where) => {
  return await model.findOrCreate({ where: where });
};

/**
 * Function: USED TO FIND A RESOURCE BY ID AND USING SCOPE FOR FOREIGN TABLE DATA.
 */
const findByIdWithScope = async (model, scopeNames, id) => {
  return await model
    .scope(scopeNames)
    .findOne({ where: { id: id, isDeleted: false } });
};

/**
 * Function: USED TO FETCH A RECORD ALONG WITH ASSOCIATION.
 */
const findWithAssociation = async (model, include, id) => {

  return await model.findOne({
    where: { id: id, isDeleted: false },
    include: include
  });
};

const findWithAssociation_v2 = async (model, include) => {

  return await model.findOne({
    include: include
  });
};
/**
 * Function: USED TO FETCH RESOUCRES
 */
const fetch = async (model, query, attributes, groupBy) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (groupBy) {
    query.group = [groupBy]
  }
  if (attributes)
    query["attributes"] = attributes;

  return await model.findAll(query);
};


/**
 * Function: USED TO FETCH RESOUCRES DELETED INCLUDED
 */
 const fetch_v2 = async (model, query, attributes, groupBy) => {
  // if (query.where) {
  //   query.where.isDeleted = false;
  // } else {
  //   query.where = { isDeleted: false };
  // }
  if (groupBy) {
    query.group = [groupBy]
  }
  if (attributes)
    query["attributes"] = attributes;

  return await model.findAll(query);
};



/**
 * Function: USED TO FETCH A SINGLE RESOURCE.
 */
const fetchRecord = async (model) => {
  return await model.findOne({ where: { isDeleted: false } });
};
/**
 * Function: USED TO FETCH RECORD ALONG WITH SORTING
 */
const fetchWithSorting = async (model, query, attributes, orderBy, sortOrder) => {
  let listOrderBy, listSortOrder, listGroupBy;
  if (orderBy)
    listOrderBy = orderBy
  else
    listOrderBy = "id"
  if (sortOrder)
    listSortOrder = sortOrder
  else
    listSortOrder = "ASC";
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes;

  query["order"] = [[listOrderBy, listSortOrder]]
  return await model.findAll(query);
};


// change by usman khalid

/**
 * Function: USED TO FETCH RECORD ALONG WITH SORTING
 */
 const fetchWithSorting_v2 = async (model, query, orderBy, sortOrder,attributes) => {
  let listOrderBy, listSortOrder, listGroupBy;
  if (orderBy)
    listOrderBy = orderBy
  else
    listOrderBy = "id"
  if (sortOrder)
    listSortOrder = sortOrder
  else
    listSortOrder = "ASC";
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes;

  query["order"] = [[listOrderBy, listSortOrder]]
  return await model.findAll(query);
};


/**
 * Function: USED TO FETCH ALL DISTINCT RESOURCES.
 */
const fetchDistinct = async (model, where, columnName) => {
  where.isDeleted = false;
  return await model.findAll({
    where: where,
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col(columnName)), columnName]
    ]
  });
};


/**
 * Function: USED TO FETCH AND COUNT RESOURCES
 */
const fetchAndCount = async (model, query, attributes) => {
  if (query.where)
    query.where.isDeleted = false;
  else
    query.where = { isDeleted: false };
  if (attributes)
    query["attributes"] = attributes

  return await model.findAndCountAll(query);
};
/**
 * Function: USED TO FETCH RESOURCES ALONG WITH SCOPE.
 */
const fetchWithScope = async (model, scopeNames, query, attributes) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes;
  return await model.scope(scopeNames).findAll(query);
};

/**
 * Function: USED TO FETCH RESOURCES ALONG WITH SCOPE.
 */
 const fetchWithScope_v2 = async (model, scopeNames, query, attributes) => {
  // if (query.where) {
  //   query.where.isDeleted = false;
  // } else {
  //   query.where = { isDeleted: false };
  // }
  if (attributes)
    query["attributes"] = attributes;
  return await model.scope(scopeNames).findAll(query);
};

/**
 * Function: USED TO FETCH RESOURCES ALONG WITH SCOPE WITH SORTING.
 */
 const fetchWithScope_v3 = async (model, scopeNames, query,orderBy, sortOrder,attributes) => {
  let listOrderBy, listSortOrder, listGroupBy;
  if (orderBy)
    listOrderBy = orderBy
  else
    listOrderBy = "id"
  if (sortOrder)
    listSortOrder = sortOrder
  else
    listSortOrder = "ASC";
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes;

  query["order"] = [[listOrderBy, listSortOrder]]

  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes;

  return await model.scope(scopeNames).findAll(query);
};


/**
 * Function: USED TO FETCH RESOURCES ALONG WITH SCOPE AND COUNT THEM.
 */
const fetchAndCountWithScope = async (model, scopeNames, query, attributes) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = { isDeleted: false };
  }
  if (attributes)
    query["attributes"] = attributes
  return await model.scope(scopeNames).findAndCountAll(query);
};

/**
 * Function: USED TO FETCH RESOURCES ALONG WITH ASSOCIATION.
 */

const fetchWithAssociation = async (
  model,
  query,
  attributes,
  customQuery
) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = {
      isDeleted: false
    };
  }
  if (attributes)
    query["attributes"] = attributes
  query.include = customQuery;
  return await model.findAll(query);
};

/**
 * Function: USED TO FETCH RESOURCES ALONG WITH ASSOCIATION AND COUNT THEM.
 */
const fetchAndCountWithAssociation = async (
  model,
  query,
  attributes,
  customQuery
) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = {
      isDeleted: false
    };
  }

  if (attributes)
    query["attributes"] = attributes

  query.include = customQuery;


  console.log("END QURY", query);
  return await model.findAndCountAll(query);
};

/**
 * Function: USED TO FETCH RESOURCES ALONG WITH ASSOCIATION AND SCOPE AND COUNT THEM.
 */
const fetchAndCountWithScopeAndAssociation = async (
  model,
  scopeNames,
  query,
  customQuery
) => {
  if (query.where) {
    query.where.isDeleted = false;
  } else {
    query.where = {
      isDeleted: false
    };
  }

  query.include = customQuery;


  console.log("END QURY", query);
  return await model.scope(scopeNames).findAndCountAll(query);
};

/**
 * Function: USED TO SEARCH A RESOURCE.
 */
const search = async (model, where) => {
  return await model.findOne({
    where: where
  });
};

/**
 * Function: USED TO SEARCH A RESOURCE , ALONG WITH THE DELETED DATA.
 */
const searchById = async (model, id) => {
  return await model.findByPk(id);
};

/**
 * Function: USED TO SUM A SPECIFIC COL ON A CONDITION.
 */
const sum = async (model, where, column) => {
  where.isDeleted = false;
  return await model.findOne({
    where: where,
    attributes: [[sequelize.fn("sum", sequelize.col(column)), "total"]]
  });
};


/**
 * Function: USED TO SUM A SPECIFIC COL ON A CONDITION ALONG WITH ASSOCIATION.
 */
const sumWithAssociation = async (model, where, column, customQuery) => {
  where.isDeleted = false;
  return await model.findOne({
    where: where,
    include: customQuery,
    attributes: [[sequelize.fn("sum", sequelize.col(column)), "total"]]
  });
};

/**
 * Function: USED TO INCREMENT A SPECIFIC COL OF A MODEL.
 */

const increment = async (model, col,where)=>{
  model.increment(col, where);
}

/**
 * Function: USED TO DECREMENT A SPECIFIC COL OF A MODEL.
 */

const decrement = async (model, col,where)=>{
  model.decrement(col, where);
}

/**
 * Function: USED TO COUNT TOTAL NO. OF RESOURCES.
 */
const count = async (model, where, groupBy) => {
  let query = {};
  if (where) {
    query = { ...where };
    query["isDeleted"] = false;
  }
  else {
    query = { isDeleted: false }
  }
  if (groupBy)
    return await model.count({ where: query, group: [groupBy] });
  else
    return await model.count({ where: query });

  // return await model.findOne({ where: { id: id, isDeleted: false } });
};

/**
 * Function: USED TO SUM A SPECIFIC COL ON A CONDITION ALONG WITH ASSOCIATION.
 */
const countWithAssociation = async (model, where, customQuery) => {
  let query = {};
  if (where) {
    query = { ...where };
    query["isDeleted"] = false;
  }
  else {
    query = { isDeleted: false }
  }
  return await model.count({ where: query, include: customQuery });
  // return await model.findOne({ where: { id: id, isDeleted: false } });
};

/**
 * Function: USED TO  SOFT DELETE A RESOURCE.
 */
const remove = async (model, id) => {
  const record = await model.findOne({ where: { id: id, isDeleted: false } });
  console.log("ID -- - - - - ->", id);
  console.log(record);
  record.isDeleted = true;
  record.deletedTime = moment().unix();
  return await record.save();
};

const remove_v2 = async (record) => {
  record.isDeleted = true;
  record.deletedTime = moment().unix();
  return await record.save();
};

// added by usman khalid
const remove_v3 = async(model, id) =>{
  const record = await model.findByPk(id);
  record.status = "0";
  return await record.destroy();
};

/**
 * Function: USED TO HARD DELETE A RESOURCE.
 */
const truncate = async (model, id) => {
  return await model.destroy({ where: { id: id, isDeleted: false } });
};


const truncate_v2 = async (model, where) => {
  return await model.destroy({ where: where });
};
/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
  save,
  create,
  bulkSave,
  bulkSave_v2,
  bulkUpdate,
  findById,
  findById_v2,
  fetchRecord,
  findBy,
  findBy_v2,
  findBy_v3,
  findBy_v4,
  findByWithScope,
  findOrCreate,
  findByIdWithScope,
  findWithAssociation,
  findWithAssociation_v2,
  fetch,
  fetch_v2, // with deleted record also
  fetchWithSorting,
  fetchWithSorting_v2,
  fetchDistinct,
  fetchAndCount,
  fetchWithScope,
  fetchWithScope_v2,
  fetchWithScope_v3,
  fetchAndCountWithScope,
  fetchWithAssociation,
  fetchAndCountWithAssociation,
  fetchAndCountWithScopeAndAssociation,
  search,
  searchById,
  sum,
  sumWithAssociation,
  count,
  countWithAssociation,
  increment,
  decrement,
  remove,
  remove_v2,
  remove_v3,
  truncate,
  truncate_v2
};
