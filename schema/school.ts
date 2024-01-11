import type {Schema} from "db-viewer-component";

const school: Schema = {
  tables: [
    {
      name: "school",
      pos: {
        x: 0,
        y: 0,
      },
      columns: [
        {
          name: "id",
          pk: true,
          type: "int",
        },
        {
          name: "cpacity",
          type: "int",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "address",
          type: "string",
        },
      ],
    },
    {
      name: "class",
      pos: {
        x: 250,
        y: 0,
      },
      columns: [
        {
          name: "id",
          pk: true,
          type: "int",
        },
        {
          name: "grade",
          type: "int",
        },
        {
          name: "school_id",
          fk: {
            table: "school",
            column: "id",
          },
          nn: true,
          uq: false,
        },
      ],
    },
    {
      name: "student",
      pos: {
        x: 500,
        y: 0,
      },
      columns: [
        {
          name: "id",
          pk: true,
          type: "int",
        },
        {
          name: "firstname",
          type: "string",
        },
        {
          name: "lastname",
          type: "string",
        },
        {
          name: "age",
          type: "int",
        },
        {
          name: "class_id",
          fk: {
            table: "class",
            column: "id",
          },
          nn: true,
        },
        {
          name: "friend",
          fk: {
            table: "student",
            column: "id",
          },
        },
      ],
    },
  ],
};

export default school;
