module.exports = function (sequelize, Sequelize) {
    const Model = sequelize.define(
        "child",
        {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            branchId: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'branch',
                    key: 'id'
                },
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            dateOfBirth: {
                type: Sequelize.DATEONLY,
            },
            gender: {
                type: Sequelize.ENUM,
                values: ['male', 'female', 'other']
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdTime: {
                type: Sequelize.BIGINT(20)
            },
            updatedTime: {
                type: Sequelize.BIGINT(20)
            },
            deletedTime: {
                type: Sequelize.BIGINT(20)
            }
        },
        {
            tableName: "child",
            timestamps: false,
            collate: "utf8_general_ci"
        }
    );

    Model.prototype.toJSON = function () {
        const attributes = Object.assign({}, this.get());
        delete attributes.deletedTime;
        delete attributes.isDeleted;
        // attributes.religiousFestivals = attributes.religiousFestivals.split(",");
   
        return attributes;
    };
    return Model;
};
