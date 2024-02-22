import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
  name: "Resume", 
  tableName: "resume", 
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    }, 
    content: {
      type: "varchar",
    },
    userId: {
      type: "varchar",
    },
    status: {
      type: "varchar",
    },
    createdAt: {
      type: "datetime",
    },   
  },
  relations: {
    categories: {
      target: "User",
      type: "many-to-one",
      joinTable: true,
      joinColum: {name: 'userId'},
      cascade: true,
    },
  }
})