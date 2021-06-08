import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import {deleteBook, setBook} from "../services/BookService";



const styles = theme => ({
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
});

class BookItem extends React.Component {
    constructor(props) {
        super(props);
        let book = {
            bookId: this.props.book.bookId.toString(),
            isbn: this.props.book.isbn.toString(),
            bookName: this.props.book.bookName,
            author: this.props.book.author,
            category: this.props.book.category,
            price: (this.props.book.price/100).toFixed(2).toString(),
            storage: this.props.book.storage.toString(),
            intro: this.props.book.intro,
            image: this.props.book.image,
        };
        this.state = {
            book: book,
        }
    };

    changeISBN(e) {
        let book = this.state.book;
        book.isbn = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeBookName(e) {
        let book = this.state.book;
        book.bookName = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeAuthor(e) {
        let book = this.state.book;
        book.author = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeCategory(e) {
        let book = this.state.book;
        book.category = e.target.value;
        this.setState({
            book: book,
        });
    }

    changePrice(e) {
        let book = this.state.book;
        book.price = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeStorage(e) {
        let book = this.state.book;
        book.storage = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeIntro(e) {
        let book = this.state.book;
        book.intro = e.target.value;
        this.setState({
            book: book,
        });
    }

    changeImage(e) {
        let book = this.state.book;
        book.image = e.target.value;
        this.setState({
            book: book,
        });
    }

    deleteBook() {
        deleteBook(this.props.userId, this.props.book.bookId, (data) => {
            if (data) {
                this.props.deleteBook(this.props.book.bookId);
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        });
    }

    setBook() {
        if (this.state.book.isbn === "" || this.state.book.bookName === "" || this.state.book.author === ""
            || this.state.book.category === "" || this.state.book.price === "" || this.state.book.storage === ""
            || this.state.book.intro === "" || this.state.book.image === "") {
            alert("请完整填写信息");
            return;
        }
        let book = {
            bookId: this.props.book.bookId,
            ISBN: parseInt(this.state.book.isbn),
            bookName: this.state.book.bookName,
            author: this.state.book.author,
            category: this.state.book.category,
            price: Math.floor(parseFloat(this.state.book.price) * 100),
            intro: this.state.book.intro,
            storage: parseInt(this.state.book.storage),
            image: this.state.book.image,
        }
        if (isNaN(book.ISBN) || book.ISBN < 0) {
            alert("ISBN号应为非负整数");
        } else if (isNaN(book.price) || book.price <= 0) {
            alert("单价应为正数");
        } else if (isNaN(book.storage) || book.storage < 0) {
            alert("库存应为非负整数");
        } else {
            setBook(this.props.userId, book, (data) => {
                if (data) {
                    this.props.setBook(book);
                    alert("修改成功");
                } else {
                    alert("修改失败，请检查ISBN号是否重复");
                }
            });
        }
    }



    render() {
        const { classes } = this.props;
        return(
            <tr className={classes.root}>
                <td>
                    <input value={this.state.book.bookId}
                           className={classes.bookId}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.state.book.isbn}
                           className={classes.bookId}
                           onChange={this.changeISBN.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.bookName}
                           className={classes.bookName}
                           onChange={this.changeBookName.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.author}
                           className={classes.author}
                           onChange={this.changeAuthor.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.category}
                           className={classes.category}
                           onChange={this.changeCategory.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.price}
                           className={classes.price}
                           onChange={this.changePrice.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.storage}
                           className={classes.price}
                           onChange={this.changeStorage.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.intro}
                           className={classes.intro}
                           onChange={this.changeIntro.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.state.book.image}
                           className={classes.image}
                           onChange={this.changeImage.bind(this)}
                    />
                </td>
                <td>
                    <button onClick={this.setBook.bind(this)}>
                        保存
                    </button>
                </td>
                <td>
                    <button onClick={this.deleteBook.bind(this)}>
                        删除
                    </button>
                </td>

            </tr>
        );
    }
}

export default withStyles(styles)(BookItem);