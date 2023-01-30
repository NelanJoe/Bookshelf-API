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
    path: "/books/{bookId}",
    handler: getNotesByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editNotesByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteNotesByIdHandler,
  },
];

module.exports = routes;
