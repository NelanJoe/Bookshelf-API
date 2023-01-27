const {
  addBookHandler,
  getAllBooksHandler,
  getNotesByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
} = require("./handlers");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getNotesByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editNotesByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteNotesByIdHandler,
  },
];

module.exports = routes;
