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
    };

    changeISBN(e) {
        let book = this.props.book;
        book.isbn = e.target.value;
        this.props.onChange(book);
    }

    changeBookName(e) {
        let book = this.props.book;
        book.bookName = e.target.value;
        this.props.onChange(book);
    }

    changeAuthor(e) {
        let book = this.props.book;
        book.author = e.target.value;
        this.props.onChange(book);
    }

    changeCategory(e) {
        let book = this.props.book;
        book.category = e.target.value;
        this.props.onChange(book);
    }

    changePrice(e) {
        let book = this.props.book;
        book.price = e.target.value;
        this.props.onChange(book);
    }

    changeStorage(e) {
        let book = this.props.book;
        book.storage = e.target.value;
        this.props.onChange(book);
    }

    changeIntro(e) {
        let book = this.props.book;
        book.intro = e.target.value;
        this.props.onChange(book);
    }

    changeImage(e) {
        let book = this.props.book;
        book.image = e.target.value;
        this.props.onChange(book);
    }

    deleteBook() {
        deleteBook(this.props.userId, this.props.book.bookId, (data) => {
            if (data) {
                this.props.update();
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        });
    }

    setBook() {
        if (this.props.book.isbn === "" || this.props.book.bookName === "" || this.props.book.author === ""
            || this.props.book.category === "" || this.props.book.price === "" || this.props.book.storage === ""
            || this.props.book.intro === "" || this.props.book.image === "") {
            alert("请完整填写信息");
            return;
        }
        let book = {
            bookId: this.props.book.bookId,
            ISBN: parseInt(this.props.book.isbn),
            bookName: this.props.book.bookName,
            author: this.props.book.author,
            category: this.props.book.category,
            price: Math.floor(parseFloat(this.props.book.price) * 100),
            intro: this.props.book.intro,
            storage: parseInt(this.props.book.storage),
            image: this.props.book.image,
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
                    this.props.update();
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
                    <input value={this.props.book.bookId}
                           className={classes.bookId}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.book.isbn}
                           className={classes.bookId}
                           onChange={this.changeISBN.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.bookName}
                           className={classes.bookName}
                           onChange={this.changeBookName}
                    />
                </td>
                <td>
                    <input value={this.props.book.author}
                           className={classes.author}
                           onChange={this.changeAuthor.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.category}
                           className={classes.category}
                           onChange={this.changeCategory.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.price}
                           className={classes.price}
                           onChange={this.changePrice.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.storage.toString()}
                           className={classes.price}
                           onChange={this.changeStorage.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.intro}
                           className={classes.intro}
                           onChange={this.changeIntro.bind(this)}
                    />
                </td>
                <td>
                    <input value={this.props.book.image}
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