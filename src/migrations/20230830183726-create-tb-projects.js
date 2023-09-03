"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_project: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      nodejs: {
        type: Sequelize.BOOLEAN,
      },
      golang: {
        type: Sequelize.BOOLEAN,
      },
      reactjs: {
        type: Sequelize.BOOLEAN,
      },
      javascript: {
        type: Sequelize.BOOLEAN,
      },
      image: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_projects");
  },
};
