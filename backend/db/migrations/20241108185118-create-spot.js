"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        lat: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        lng: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        avgRating: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          defaultValue: null,
        },
        previewImage: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
    /**
     *
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
