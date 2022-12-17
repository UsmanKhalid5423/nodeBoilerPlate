module.exports = function (sequelize, Sequelize) {
    const Model = sequelize.define(
        "admin",
        {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            accessToken: {
                type: Sequelize.TEXT,
            },
            role: {
                type: Sequelize.ENUM,
                values: ["superAdmin", "admin"]
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
            tableName: "admin",
            timestamps: false,
            collate: "utf8_general_ci"
        }
    );

    Model.prototype.toJSON = function () {
        const attributes = Object.assign({}, this.get());
        delete attributes.deletedTime;
        delete attributes.isDeleted;
        delete attributes.password;

        return attributes;
    };
    return Model;
};
