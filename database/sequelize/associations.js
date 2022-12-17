module.exports = function (model) {

    /**
 * Relation: CHILD <---> BRANCH .
 */
    model.child.belongsTo(model.branch, {
        as: "branch",
        foreignKey: "branchId"
    });

};



