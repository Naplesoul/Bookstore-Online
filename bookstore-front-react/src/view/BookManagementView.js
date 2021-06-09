import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookItem from "../components/BookItem";
import {addBook} from "../services/BookService";

const header = [
    "ID", "ISBN", "书名", "作者", "分类", "单价", "库存", "简介", "图片 URL", "操作"
];

const styles = theme => ({
    root: {
        marginLeft: "2vw",
    },
    table: {
        marginBottom: 70,
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
        width: "12vw",
    },
    op: {
        width: 90
    }
});

class BookManagementView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBook: {
                bookId: "",
                isbn: "",
                bookName: "",
                author: "",
                category: "",
                price: "",
                storage: "",
                intro: "",
                image: "",
            },
        };
    };

    addBook() {
        let isbn = document.getElementById("addISBN").value.trim();
        let bookName = document.getElementById("addBookName").value.trim();
        let author = document.getElementById("addAuthor").value.trim();
        let category = document.getElementById("addCategory").value.trim();
        let price = document.getElementById("addPrice").value.trim();
        let storage = document.getElementById("addStorage").value.trim();
        let intro = document.getElementById("addIntro").value.trim();
        let image = document.getElementById("addImage").value.trim();
        if (isbn === "" || bookName === "" || author === "" || category === ""
            || price === "" || storage === "" || intro === "" || image === "") {
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
            image: image,
        }
        if (isNaN(book.isbn) || book.isbn < 0) {
            alert("ISBN号应为非负整数");
        } else if (isNaN(book.price) || book.price <= 0) {
            alert("单价应为正数");
        } else if (isNaN(book.storage) || book.storage < 0) {
            alert("库存应为非负整数");
        } else {
            addBook(book, (data) => {
                if (data.bookId >= 0) {
                    let newBookData = this.props.bookData;
                    newBookData.push(data);
                    this.props.setBookData(newBookData);
                    this.clearAdd();
                    alert("录入成功， 新书ID为：" + data.bookId);
                } else {
                    alert("录入失败，请检查ISBN号是否重复");
                }
            });
        }
    }

    deleteBook(bookId) {
        let bookData = this.props.bookData;
        let len = bookData.length;
        for (let i = 0; i < len; ++i) {
            if (bookData[i].bookId === bookId) {
                bookData.splice(i, 1);
                this.props.setBookData(bookData);
                return;
            }
        }
    }

    setBook(book) {
        let bookData = this.props.bookData;
        let len = bookData.length;
        for (let i = 0; i < len; ++i) {
            if (bookData[i].bookId === book.bookId) {
                bookData[i] = book;
                this.props.setBookData(bookData);
                return;
            }
        }
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
        this.setState({
            searchBook: {
                bookId: document.getElementById("searchBookId").value.trim().toLowerCase(),
                isbn: document.getElementById("searchISBN").value.trim().toLowerCase(),
                bookName: document.getElementById("searchBookName").value.trim().toLowerCase(),
                author: document.getElementById("searchAuthor").value.trim().toLowerCase(),
                category: document.getElementById("searchCategory").value.trim().toLowerCase(),
                price: document.getElementById("searchPrice").value.trim().toLowerCase(),
                storage: document.getElementById("searchStorage").value.trim().toLowerCase(),
                intro: document.getElementById("searchIntro").value.trim().toLowerCase(),
                image: document.getElementById("searchImage").value.trim().toLowerCase(),
            }
        });
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
        this.setState({
            searchBook: {
                bookId: "",
                isbn: "",
                bookName: "",
                author: "",
                category: "",
                price: "",
                storage: "",
                intro: "",
                image: "",
            },
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <table className={classes.table}>
                    <tr>
                        <th colSpan={5}>
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
                            <input placeholder="图片 URL"
                                   className={classes.image}
                                   id="addImage"
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
                        {header.map((head, index) => {
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
                            <input placeholder="图片 URL"
                                   className={classes.image}
                                   id="searchImage"
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
                    {this.props.bookData.map((book, index) => {
                        if ((this.state.searchBook.bookId === "" || book.bookId.toString() === this.state.searchBook.bookId)
                            && (this.state.searchBook.isbn === "" || book.isbn.toString() === this.state.searchBook.isbn)
                            && book.bookName.toString().toLowerCase().indexOf(this.state.searchBook.bookName) >= 0
                            && book.author.toString().toLowerCase().indexOf(this.state.searchBook.author) >= 0
                            && book.category.toString().toLowerCase().indexOf(this.state.searchBook.category) >= 0
                            && (this.state.searchBook.price === "" || book.price === parseFloat(this.state.searchBook.price).toFixed(2)*100)
                            && (this.state.searchBook.storage === "" || book.storage.toString() === this.state.searchBook.storage)
                            && book.intro.toString().toLowerCase().indexOf(this.state.searchBook.intro) >= 0
                            && book.image.toString().toLowerCase().indexOf(this.state.searchBook.image) >= 0) {
                            return (
                                <BookItem  userId={this.props.user.userId} book={book}
                                           deleteBook={this.deleteBook.bind(this)}
                                           setBook={this.setBook.bind(this)}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </table>
            </div>
        );
    }

};

export default withStyles(styles)(BookManagementView);