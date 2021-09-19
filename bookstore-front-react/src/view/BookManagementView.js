import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookItem from "../components/BookItem";
import {addBook, filterBooks, setBookImage} from "../services/BookService";
import {Pagination} from "antd";
import {image2Base64} from "../utils/image2base64";

const header = [
    "ID", "ISBN", "书名", "作者", "分类", "单价", "库存", "简介", "图片", "上传图片", "操作"
];

const pageSize = 15;

const emptySearch = {
    bookId: null,
    isbn: null,
    bookName: "",
    author: "",
    category: "",
    price: null,
    storage: null,
    intro: "",
    image: "",
};

const styles = theme => ({
    root: {
        marginLeft: "2vw",
    },
    table: {
        marginBottom: 50,
    },
    bookId: {
        width: "3vw",
    },
    bookName: {
        width: "10vw",
    },
    author: {
        width: "9vw",
    },
    category: {
        width: "7vw",
    },
    price: {
        width: "4vw",
    },
    intro: {
        width: "18vw",
    },
    image: {
        width: "3vw",
    },
    op: {
        width: 90
    },
    page: {
        marginLeft: '33vw',
    },
    uploadImage: {
        width: "10vw",
    },
});

class BookManagementView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBook: emptySearch,
            bookCount: 0,
            currentPage: 1,
            bookData: [],
            uploadImage: null,
        };
        this.filterBooks(1, pageSize, emptySearch);
    };

    convertString(bookData) {
        let _bookData = bookData;
        let len = bookData.length;
        for (let i = 0; i < len; ++i) {
            _bookData[i].isbn = _bookData[i].isbn.toString();
            _bookData[i].price = (_bookData[i].price/100).toFixed(2).toString();
            _bookData[i].storage = _bookData[i].storage.toString();
        }
        return _bookData;
    }

    filterBooks(page, size, searchBook) {
        filterBooks(page, size, searchBook, (_bookData) => {
            this.setState({
                currentPage: page,
                searchBook: searchBook,
                bookCount: _bookData.totalElements,
                bookData: this.convertString(_bookData.content),
            });
        });
    }

    updateBooks() {
        filterBooks(this.state.currentPage, pageSize, this.state.searchBook, (_bookData) => {
            this.setState({
                bookCount: _bookData.totalElements,
                bookData: this.convertString(_bookData.content),
            });
        });
    }

    setPage(_page, _pageSize) {
        filterBooks(_page, _pageSize, this.state.searchBook, (_bookData) => {
            this.setState({
                currentPage: _page,
                bookCount: _bookData.totalElements,
                bookData: this.convertString(_bookData.content),
            });
        });
    }

    addBook() {
        let isbn = document.getElementById("addISBN").value.trim();
        let bookName = document.getElementById("addBookName").value.trim();
        let author = document.getElementById("addAuthor").value.trim();
        let category = document.getElementById("addCategory").value.trim();
        let price = document.getElementById("addPrice").value.trim();
        let storage = document.getElementById("addStorage").value.trim();
        let intro = document.getElementById("addIntro").value.trim();
        if (isbn === "" || bookName === "" || author === "" || category === ""
            || price === "" || storage === "" || intro === "") {
            alert("请完整填写信息");
            return;
        }
        let book = {
            isbn: parseInt(isbn),
            bookName: bookName,
            author: author,
            category: category,
            price: Math.floor(parseFloat(price) * 100),
            storage: parseInt(storage),
            intro: intro,
        }
        if (isNaN(book.isbn) || book.isbn < 0) {
            alert("ISBN号应为非负整数");
        } else if (isNaN(book.price) || book.price <= 0) {
            alert("单价应为正数");
        } else if (isNaN(book.storage) || book.storage < 0) {
            alert("库存应为非负整数");
        } else {
            addBook(book, (newBookId) => {
                if (newBookId >= 0) {
                    this.updateBooks();
                    this.clearAdd();
                    if (this.state.uploadImage != null) {
                        setBookImage(newBookId, this.state.uploadImage, (data) => {
                            if (!data) {
                                alert("图片上传失败！");
                            } else {
                                alert("录入成功, 新书ID为：" + newBookId);
                            }
                        });
                    } else {
                        alert("录入成功, 新书ID为：" + newBookId + "\n新书未添加封面，建议立即添加");
                    }
                } else {
                    alert("录入失败，请检查ISBN号是否重复");
                }
            });
        }
    }

    onUploadImageChange(e) {
        if (e.target.files.length === 0) {
            this.setState({
                uploadImage: null,
            });
            return;
        }
        image2Base64(e.target.files[0], (data) => {
            this.setState({
                uploadImage: data,
            });
        });
    }

    clearAdd() {
        document.getElementById("addISBN").value = "";
        document.getElementById("addBookName").value = "";
        document.getElementById("addAuthor").value = "";
        document.getElementById("addCategory").value = "";
        document.getElementById("addPrice").value = "";
        document.getElementById("addStorage").value = "";
        document.getElementById("addIntro").value = "";
        document.getElementById("addImage").value = "";
    };

    search() {
        let bookId = document.getElementById("searchBookId").value.trim().toLowerCase();
        let isbn = document.getElementById("searchISBN").value.trim().toLowerCase();
        let bookName = document.getElementById("searchBookName").value.trim().toLowerCase();
        let author = document.getElementById("searchAuthor").value.trim().toLowerCase();
        let category = document.getElementById("searchCategory").value.trim().toLowerCase();
        let price = document.getElementById("searchPrice").value.trim().toLowerCase();
        let storage = document.getElementById("searchStorage").value.trim().toLowerCase();
        let intro = document.getElementById("searchIntro").value.trim().toLowerCase();

        if (bookId == null || bookId.length === 0) {
            bookId = null;
        } else {
            bookId = parseInt(bookId);
            if (isNaN(bookId) || bookId < 0) {
                alert("书籍ID号应为非负整数");
                return;
            }
        }
        if (isbn == null || isbn.length === 0) {
            isbn = null;
        } else {
            isbn = parseInt(isbn);
            if (isNaN(isbn) || isbn < 0) {
                alert("ISBN号应为非负整数");
                return;
            }
        }
        if (price == null || price.length === 0) {
            price = null;
        } else {
            price = parseFloat(price);
            if (isNaN(price) || price < 0) {
                alert("单价应为正数");
                return;
            }
            price = Math.floor(price * 100);
        }
        if (storage == null || storage.length === 0) {
            storage = null;
        } else {
            storage = parseInt(storage);
            if (isNaN(storage) || storage < 0) {
                alert("库存应为非负整数");
                return;
            }
        }
        let searchBook = {
            bookId: bookId,
            isbn: isbn,
            bookName: bookName,
            author: author,
            category: category,
            price: price,
            storage: storage,
            intro: intro,
        };
        this.filterBooks(1, pageSize, searchBook);
    };

    clearSearch() {
        document.getElementById("searchBookId").value = "";
        document.getElementById("searchISBN").value = "";
        document.getElementById("searchBookName").value = "";
        document.getElementById("searchAuthor").value = "";
        document.getElementById("searchCategory").value = "";
        document.getElementById("searchPrice").value = "";
        document.getElementById("searchStorage").value = "";
        document.getElementById("searchIntro").value = "";
        document.getElementById("searchImage").value = "";
        this.filterBooks(1, pageSize, emptySearch);
    };

    onBookItemChange(book) {
        let bookData = this.state.bookData;
        let len = bookData.length;
        for (let i = 0; i < len; ++i) {
            if (bookData[i].bookId === book.bookId) {
                bookData[i] = book;
                break;
            }
        }
        this.setState({
            bookData: bookData,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <table className={classes.table}>
                    <tr>
                        <th colSpan={2}>
                            <h2>
                                录入书籍
                            </h2>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <input value="ID"
                                   className={classes.bookId}
                                   disabled
                            />
                        </td>
                        <td>
                            <input placeholder="ISBN"
                                   className={classes.bookId}
                                   id="addISBN"
                            />
                        </td>
                        <td>
                            <input placeholder="书名"
                                   className={classes.bookName}
                                   id="addBookName"
                            />
                        </td>
                        <td>
                            <input placeholder="作者"
                                   className={classes.author}
                                   id="addAuthor"
                            />
                        </td>
                        <td>
                            <input placeholder="分类"
                                   className={classes.category}
                                   id="addCategory"
                            />
                        </td>
                        <td>
                            <input placeholder="单价"
                                   className={classes.price}
                                   id="addPrice"
                            />
                        </td>
                        <td>
                            <input placeholder="库存"
                                   className={classes.price}
                                   id="addStorage"
                            />
                        </td>
                        <td>
                            <input placeholder="简介"
                                   className={classes.intro}
                                   id="addIntro"
                            />
                        </td>
                        <td>
                            <input placeholder="上传图片"
                                   type={"file"}
                                   className={classes.uploadImage}
                                   id="addImage"
                                   onChange={this.onUploadImageChange.bind(this)}
                            />
                        </td>
                        <td>
                            <button onClick={this.addBook.bind(this)}>
                                录入
                            </button>
                        </td>
                        <td>
                            <button onClick={this.clearAdd.bind(this)}>
                                清除
                            </button>
                        </td>
                    </tr>
                </table>
                <table className={classes.table}>
                    <tr>
                        <th colSpan={2}>
                            <h2>
                                书籍信息
                            </h2>
                        </th>
                    </tr>
                    <tr>
                        {header.map((head) => {
                            return (
                                <th>
                                    {head}
                                </th>
                            );
                        })}
                    </tr>
                    <tr>
                        <td>
                            <input placeholder="ID"
                                   className={classes.bookId}
                                   id="searchBookId"
                            />
                        </td>
                        <td>
                            <input placeholder="ISBN"
                                   className={classes.bookId}
                                   id="searchISBN"
                            />
                        </td>
                        <td>
                            <input placeholder="书名"
                                   className={classes.bookName}
                                   id="searchBookName"
                            />
                        </td>
                        <td>
                            <input placeholder="作者"
                                   className={classes.author}
                                   id="searchAuthor"
                            />
                        </td>
                        <td>
                            <input placeholder="分类"
                                   className={classes.category}
                                   id="searchCategory"
                            />
                        </td>
                        <td>
                            <input placeholder="单价"
                                   className={classes.price}
                                   id="searchPrice"
                            />
                        </td>
                        <td>
                            <input placeholder="库存"
                                   className={classes.price}
                                   id="searchStorage"
                            />
                        </td>
                        <td>
                            <input placeholder="简介"
                                   className={classes.intro}
                                   id="searchIntro"
                            />
                        </td>
                        <td>
                            <input placeholder="图片"
                                   className={classes.image}
                                   id="searchImage"
                                   disabled
                            />
                        </td>
                        <td>
                            <input placeholder="上传图片"
                                   className={classes.uploadImage}
                                   id="uploadImage"
                                   disabled
                            />
                        </td>
                        <td>
                            <button onClick={this.search.bind(this)}>
                                筛选
                            </button>
                        </td>
                        <td>
                            <button onClick={this.clearSearch.bind(this)}>
                                清除
                            </button>
                        </td>

                    </tr>
                    {this.state.bookData.map((book, index) => {
                        return (
                            <BookItem  userId={this.props.user.userId}
                                       book={book}
                                       update={this.updateBooks.bind(this)}
                                       onChange={this.onBookItemChange.bind(this)}
                            />
                        );
                    })}
                </table>
                <div className={classes.page}>
                    <Pagination current={this.state.currentPage}
                                total={this.state.bookCount}
                                defaultPageSize={pageSize}
                                onChange={this.setPage.bind(this)}
                    />
                </div>
            </div>
        );
    }

};

export default withStyles(styles)(BookManagementView);
