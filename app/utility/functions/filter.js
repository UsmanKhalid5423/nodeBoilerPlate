/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const operator = require("sequelize").Op;

/*******************************************************/
//Implementing Filter.
/*******************************************************/
const filter = (req, query) => {
    const { attribute, filter } = req.query;
    if (attribute) {
        if (query.where) {
            query['where'][attribute] = filter
        }
        else {
            query[attribute] = filter;
        }

    }

    return query;
}

const filter_v2 = (req, query) => {
    console.log("filter v2");
    let { attributes } = req.query;
    let params;
    if (attributes)
        params = JSON.parse(attributes);
    else
        params = JSON.parse('[]');

    console.log("Attributes are: : : ", params)
    for (let param of params) {
        if (query.where) {
            query['where'][param.key] = param.value
        }
        else {
            query[param.key] = param.value
        }
    }
    console.log("The query is -> ", query);
    return query;
}

const filter_v3 = (req, query,attributes) => {
    console.log("- - - - -- - >", attributes);
    let params;
    if (attributes)
        params = JSON.parse(attributes);
    else
        params = JSON.parse('[]');

    console.log("Attributes are: : : ", params)
    for (let param of params) {
        if (query.where) {
            query['where'][param.key] = param.value
        }
        else {
            query[param.key] = param.value
        }
    }
    console.log("The query is -> ", query);
    return query;
}

const search = (query, attribute, search) => {

    if (query.where) {
        return query['where'][attribute] = {
            [operator.like]: "%" + search + "%"
        }
    }
    else {
        return query[attribute] = {
            [operator.like]: "%" + search + "%"
        }
    }


}


// Mujtaba bro's code
const searchOnMultipleFields_old = (query, attributes, search) => {
    let fullObject = [];

    for (let i = 0; i < attributes.length; i++) {
        fullObject.push({ [attributes[i]]: { [operator.like]: "%" + search + "%" } })
        query['where'] = { [operator.or]: fullObject }

    }

    console.log(query);


}


const searchOnMultipleFields = (query, attributes, search) => {
    let fullObject = [];
    let searchQuery = search.split(' ');
    console.log('----- searchQuery ----- ',searchQuery)
    for(let s=0;s<searchQuery.length;s++)
    {
        if(searchQuery[s]!='' && searchQuery[s]!=' ')
        {
            for (let i = 0; i < attributes.length; i++) {
                //fullObject.push({ [attributes[i]]: { [operator.like]: "%" + search + "%" } })
                fullObject.push({ [attributes[i]]: { [operator.like]: "%" + searchQuery[s] + "%" } })
                query['where'] = { [operator.or]: fullObject }

            }
        }

    }

    console.log(query);


}




const searchWithStartingLetter = (query, attribute, search) => {
    if (query.where) {
        return query['where'][attribute] = {
            [operator.like]: search + "%"
        }
    }
    else {
        return query[attribute] = {
            [operator.like]: search + "%"
        }
    }


}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    filter,
    filter_v2,
    filter_v3,
    search,
    searchWithStartingLetter,
    searchOnMultipleFields
};
