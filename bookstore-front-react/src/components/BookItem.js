import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import {deleteBook, setBook, setBookImage} from "../services/BookService";
import {image2Base64} from "../utils/image2base64";
import {config} from "../config";



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
    uploadImage: {
        width: "10vw",
    },
    viewImage: {
        width: "3vw",
    },
});

class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
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

    uploadImage(e) {
        if (e.target.files.length === 0) {
            this.setState({
                image: null,
            });
            return;
        }
        image2Base64(e.target.files[0], (data) => {
            this.setState({
                image: data,
            });
        });
    }

    deleteBook() {
        deleteBook(this.props.userId, this.props.book.bookId, (data) => {
            if (data) {
                this.props.update();
                alert("????????????");
            } else {
                alert("????????????");
            }
        });
    }

    setBook() {
        if (this.state.image != null) {
            setBookImage(this.props.book.bookId, this.state.image, (data) => {
                if (!data) {
                    alert("?????????????????????");
                }
            });
        }
        if (this.props.book.isbn === "" || this.props.book.bookName === "" || this.props.book.author === ""
            || this.props.book.category === "" || this.props.book.price === "" || this.props.book.storage === ""
            || this.props.book.intro === "") {
            alert("?????????????????????");
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
        }
        if (isNaN(book.ISBN) || book.ISBN < 0) {
            alert("ISBN?????????????????????");
        } else if (isNaN(book.price) || book.price <= 0) {
            alert("??????????????????");
        } else if (isNaN(book.storage) || book.storage < 0) {
            alert("????????????????????????");
        } else {
            setBook(this.props.userId, book, (data) => {
                if (data) {
                    this.props.update();
                    alert("????????????");
                } else {
                    alert("????????????????????????ISBN???????????????");
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
                           onChange={this.changeBookName.bind(this)}
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
                    <button className={classes.viewImage}>
                        <a href={`${config.apiUrl}/getBookImage?bookId=` + this.props.book.bookId} target="_blank">
                            ??????
                        </a>
                    </button>
                </td>
                <td>
                    <input type={"file"}
                           className={classes.uploadImage}
                           onChange={this.uploadImage.bind(this)}
                           accept={".jpg"}
                    />
                </td>
                <td>
                    <button onClick={this.setBook.bind(this)}>
                        ??????
                    </button>
                </td>
                <td>
                    <button onClick={this.deleteBook.bind(this)}>
                        ??????
                    </button>
                </td>

            </tr>
        );
    }
}

export default withStyles(styles)(BookItem);