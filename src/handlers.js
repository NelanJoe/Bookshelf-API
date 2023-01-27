/**
 * Requirement data
  {
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
  }
 **/

const notes = require("./books");
const { nanoid } = require("nanoid");
const books = require("./books");
const {
  success,
  error,
  successWithoutData,
  successWithoutMessage,
} = require("./apiFormatter");

/**
 * * Post Data Book
 * */
const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (typeof name !== "string" || name === "" || name === null) {
    return h
      .response(error("fail", "Gagal menambahkan buku. Mohon isi nama buku"))
      .code(400);
  } else if (
    typeof year !== "number" ||
    year === "" ||
    year === 0 ||
    year === null
  ) {
    return h
      .response(error("fail", "Gagal menambahkan buku. Mohon isi year buku"))
      .code(201);
  } else if (typeof author !== "string" || author === "" || author === null) {
    return h
      .response(error("fail", "Gagal menambahkan buku. Mohon isi author buku"))
      .code(201);
  } else if (
    typeof summary !== "string" ||
    summary === "" ||
    summary === null
  ) {
    return h
      .response(error("fail", "Gagal menambahkan buku. Mohon isi author buku"))
      .code(201);
  } else if (
    typeof publisher !== "string" ||
    publisher === "" ||
    publisher === null
  ) {
    return h
      .response(error("fail", "Gagal menambahkan buku. Mohon isi author buku"))
      .code(201);
  }

  if (readPage > pageCount) {
    return h
      .response(
        error(
          "fail",
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        )
      )
      .code(400);
  }

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  let finished = pageCount === readPage ? true : false;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!isSuccess) {
    return h.response(error("fail", "Buku gagal ditambahkan")).code(500);
  }

  return h
    .response(success("success", "Buku berhasil ditambahkan", { bookId: id }))
    .code(201);
};

/**
 * * Get All Books
 * */
const getAllBooksHandler = (req, h) => {
  try {
    const data = books.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    });

    return h.response(successWithoutMessage("success", data)).code(200);
  } catch (err) {
    console.log(err);
  }
};

/**
 * * Get Books by id
 * */
const getNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const book = books.filter((note) => note.id === id)[0];

  if (!book) {
    return h.response(error("fail", "Buku tidak ditemukan")).code(404);
  }

  return h.response(successWithoutMessage("success", { book })).code(200);
};

/**
 * * Edit Books by id
 * */
const editNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const index = books.filter((note) => note.id === id);

  let finished = pageCount === readPage ? true : false;

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name: name ?? "",
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
    };

    if (typeof name !== "string" || name === "" || name === null) {
      return h
        .response(
          error("fail", "Gagal memperbaharui buku. Mohon isi nama buku")
        )
        .code(400);
    } else if (
      typeof year !== "number" ||
      year === "" ||
      year === 0 ||
      year === null
    ) {
      return h
        .response(
          error("fail", "Gagal memperbaharui buku. Mohon isi year buku")
        )
        .code(201);
    } else if (typeof author !== "string" || author === "" || author === null) {
      return h
        .response(
          error("fail", "Gagal memperbaharui buku. Mohon isi author buku")
        )
        .code(201);
    } else if (
      typeof summary !== "string" ||
      summary === "" ||
      summary === null
    ) {
      return h
        .response(
          error("fail", "Gagal memperbaharui buku. Mohon isi author buku")
        )
        .code(201);
    } else if (
      typeof publisher !== "string" ||
      publisher === "" ||
      publisher === null
    ) {
      return h
        .response(
          error("fail", "Gagal memperbaharui buku. Mohon isi author buku")
        )
        .code(201);
    }

    if (readPage > pageCount) {
      return h
        .response(
          error(
            "fail",
            "Gagal memperbaharui buku. readPage tidak boleh lebih besar dari pageCount"
          )
        )
        .code(400);
    }

    return h
      .response(successWithoutData("success", "Buku berhasil diperbarui"))
      .code(200);
  }

  return h.response(error("fail", "Buku gagal diperbaharui")).code(200);
};

/**
 * * DELETE Books by id
 * */
const deleteNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index) {
    books.slice(index, 1);

    return h
      .response(successWithoutData("success", "Buku berhasil dihapus"))
      .code(200);
  }

  return h
    .response(error("fail", "Buku gagal dihapus. Id tidak ditemukan"))
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getNotesByIdHandler,
  editNotesByIdHandler,
  deleteNotesByIdHandler,
};
