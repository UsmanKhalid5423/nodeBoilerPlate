module.exports = function (sequelize, Sequelize) {
    const Model = sequelize.define(
        "branch",
        {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            contactNumber: {
                type: Sequelize.STRING,
                unique: true,
            },
            address: {
                type: Sequelize.STRING,
            },
            logoPath: {
                type: Sequelize.STRING,
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
                type: Sequelize.BIGINT
            },
            updatedTime: {
                type: Sequelize.BIGINT
            },
            deletedTime: {
                type: Sequelize.BIGINT
            }
        },
        {
            tableName: "branch",
            timestamps: false,
            collate: "utf8_general_ci"
        }
    );

    Model.prototype.toJSON = function () {
        const attributes = Object.assign({}, this.get());
        delete attributes.deletedTime;
        delete attributes.isDeleted;

        return attributes;
    };
    return Model;
};
