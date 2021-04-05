import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';

import UserAvatar from "../components/UserAvatar";
import HomeView from "./HomeView";
import BrowseView from "./BrowseView";
import InfoView from "./InfoView";
import OrderView from "./OrderView";
import CartView from "./CartView";
import ProfileView from "./ProfileView";
import CartIcon from "../components/CartIcon";

const drawerWidth = 240;


let bookData = [
    {id: 0, name: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, intro: "The book is a sequel to \"The Hobbit\" and is recognized as the originator of modern fantasy literature. ", picDir: require("../assets/book0.jpg").default},
    {id: 1, name: "Le Petit Prince", author: "Antoine de Saint-Exupéry", category: "novel", price: 9.88, storage: 31, intro: "The protagonist of this book is a little prince from an alien planet. The book uses a pilot as the storyteller, telling the various adventures that the little prince went through when he set off from his own planet to the earth. ", picDir: require("../assets/book1.jpg").default},
    {id: 2, name: "Java核心技术卷II", author: "凯S.霍斯特曼", category: "编程", price: 95.2, storage: 300, intro: "本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新，同时修正了第9版中的不足，系统全面讲解了Java语言的核心概念、语法、重要特性和开发方法，包含大量案例，实践性强。", picDir: require("../assets/book2.jpg").default},
    {id: 3, name: "深入理解计算机系统", author: "兰德尔·E·布莱恩特", category: "编程", price: 136.9, storage: 1200, intro: "程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！", picDir: require("../assets/book3.jpg").default},
    {id: 4, name: "Effective C++", author: "梅耶", category: "编程", price: 51.3, storage: 1000, intro: "大师名著纵横二十载，稳居任一荐书单三甲；称职程序员傍身绝学，通向C++精微奥妙之门。", picDir: require("../assets/book4.jpg").default},
    {id: 5, name: "Java编程思想", author: "Bruce Eckel", category: "编程", price: 91.2, storage: 200, intro: "Java学习必读经典,殿堂级著作！赢得了全球程序员的广泛赞誉。", picDir: require("../assets/book5.jpg").default},
    {id: 6, name: "魔兽世界编年史套装", author: "克里斯˙梅森", category: "魔幻小说", price: 449.2, storage: 123, intro: "暴雪官方历时二十年编纂而成的史料！三卷《魔兽世界编年史》将呈现大量从未公布的精美原画和插图，读者在阅读故事之余，更能享受一次视觉上的饕餮盛宴，是魔兽粉丝收藏的优选。", picDir: require("../assets/book6.jpg").default},
    {id: 7, name: "三体：全三册", author: "刘慈欣", category: "科幻小说", price: 50.2, storage: 124, intro: "刘慈欣代表作，亚洲首部“雨果奖”获奖作品！", picDir: require("../assets/book7.jpg").default},
    {id: 8, name: "悲惨世界", author: "雨果", category: "世界名著", price: 104, storage: 345, intro: "《悲惨世界》是雨果在流亡期间写的长篇小说，是他的代表作，也是世界文学宝库的珍品之一。 《悲惨世界》通过冉阿让等人的悲惨遭遇以及冉阿让被卞福汝主教感化后一系列令人感动的事迹，深刻揭露和批判了19世纪法国封建专制社会的腐朽本质及其罪恶现象，对穷苦人民在封建重压下所遭受的剥削欺诈和残酷迫害表示了悲悯和同情。", picDir: require("../assets/book8.jpg").default},
    {id: 9, name: "机器学习", author: "周志华", category: "编程", price: 61.6, storage: 255, intro: "击败AlphaGo的武林秘籍，赢得人机大战的必由之路：人工智能大牛周志华教授巨著，全面揭开机器学习的奥秘。", picDir: require("../assets/book9.jpg").default},
    {id: 10, name: "纳尼亚传奇", author: "刘易斯", category: "魔幻小说", price: 86.2, storage: 31, intro: "刘易斯基金会独家授权插图！翻译家吴岩，陈良廷，刘文澜经典译本！", picDir: require("../assets/book10.jpg").default},
    {id: 11, name: "老人与海", author: "海明威", category: "世界名著", price: 27.8, storage: 241, intro: "收录诺贝尔文学奖获奖作品《老人与海》《乞力马扎罗的雪》，深深影响了马尔克斯、塞林格等文学家的创作理念。", picDir: require("../assets/book11.jpg").default},
    {id: 12, name: "魔力的胎动", author: "东野圭吾", category: "悬疑/推理小说", price: 35.9, storage: 123, intro: "喜欢《解忧杂货店》，就一定要读这本书。珍藏印签。有了想要守护的东西，生命就会变得有力量。悲凉的人生、千疮百孔的命运、一桩桩悲剧的发生与救赎，读来令人喟叹不已。", picDir: require("../assets/book12.jpg").default},
    {id: 13, name: "软件工程原理", author: "沈备军、陈昊鹏、陈雨亭", category: "编程", price: 35.9, storage: 1024, intro: "从软件工程的本质出发、结合实际案例，系统全面地介绍软件过程、软件建模技术与方法及软件工程管理同时介绍一些热点新技术和新方法。", picDir: require("../assets/book13.jpg").default},
];


let cartData = [
    {id: 0, num: 5, isChosen: true, name: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, picDir: require("../assets/book0.jpg").default},
    {id: 1, num: 2, isChosen: true, name: "Le Petit Prince (The Little Prince)", author: "Antoine de Saint-Exupéry", category: "novel", price: 9.88, storage: 31, picDir: require("../assets/book1.jpg").default},
];

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#2b2d38",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },

    logo: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: "#98dafb",
        cursor: "pointer",
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(6),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
    }
});

function Logo(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}


class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectPath: null,
            bookData: bookData,
            cartData: cartData,
            infoPageBook: bookData[0],
        }
    }

    clickBook(id) {
        let newInfoPageBook = this.state.infoPageBook;
        let len = this.state.bookData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.bookData[i].id === id) {
                newInfoPageBook = this.state.bookData[i];
                break;
            }
        }
        this.setState({
            infoPageBook: newInfoPageBook,
            redirectPath: "/store/info",
        });
    }

    onCartNumberChange(id, num) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                this.state.cartData[i].num = num;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        });
    };

    addCart(id, buyNow) {
        let found = false;
        let newCartData = [];
        let len = this.state.cartData.length;
        if (buyNow) {
            for (let i = 0; i < len; ++i) {
                this.state.cartData[i].isChosen = false;
                if (this.state.cartData[i].id === id) {
                    this.state.cartData[i].num += 1;
                    this.state.cartData[i].isChosen = true;
                    found = true;
                }
                newCartData.push(this.state.cartData[i]);
            }
        } else {
            for (let i = 0; i < len; ++i) {
                if (this.state.cartData[i].id === id) {
                    this.state.cartData[i].num += 1;
                    found = true;
                }
                newCartData.push(this.state.cartData[i]);
            }
        }
        if (!found) {
            let dataLen = this.state.bookData.length;
            for (let i = 0; i < dataLen; ++i) {
                if (this.state.bookData[i].id === id) {
                    newCartData.push({id: id, num: 1, isChosen: true, name: this.state.bookData[i].name, author: this.state.bookData[i].author, category: this.state.bookData[i].category, price: this.state.bookData[i].price, storage: this.state.bookData[i].storage, picDir: this.state.bookData[i].picDir});
                }
            }
        }
        this.setState({
            cartData: newCartData,
        });
        if (buyNow) {
            this.go2Cart();
        }
    };

    removeCartItem(id) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                continue;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        })
    }

    chooseCartItem(id) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                this.state.cartData[i].isChosen = !this.state.cartData[i].isChosen;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        })
    }

    cartNumber = () => {
        let num = 0;
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            num += this.state.cartData[i].num;
        }
        if (num)
            return num;
        return null;
    }

    login(){
        this.setState({
            redirectPath: "/login",
        })
    }

    logout(){
        this.props.askForLogout();
    }

    goHome(){
        this.setState({
            redirectPath: "/store",
        })
    }

    go2Books(){
        this.setState({
            redirectPath: "/store/books",
        })
    }


    go2Cart(){
        if(this.props.user)
        this.setState({
            redirectPath: "/store/cart",
        })
    }

    go2Orders(){
        this.setState({
            redirectPath: "/store/orders",
        })
    }

    go2Profile(){
        this.setState({
            redirectPath: "/store/profile",
        })
    }


    render() {
        if (this.state.redirectPath){
            let path = this.state.redirectPath;
            this.setState({
                redirectPath: null,
            });
            return(
                <Redirect to={{pathname: path}}/>
            );
        }
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Logo className={classes.logo} onClick={this.goHome.bind(this)}/>
                        <Typography variant="h5" noWrap className={classes.title} onClick={this.goHome.bind(this)}>
                            eBookstore
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.avatar}>
                            <UserAvatar user={this.props.user} go2Profile={this.go2Profile.bind(this)}
                            askForLogin={this.login.bind(this)} askForLogout={this.logout.bind(this)}/>
                        </div>


                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button onClick={this.go2Books.bind(this)}>
                                <ListItemIcon><MenuBookIcon/></ListItemIcon>
                                <ListItemText>Books</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Cart.bind(this)}>
                                <ListItemIcon>
                                    <CartIcon number={this.cartNumber()}/>
                                </ListItemIcon>
                                <ListItemText>Cart</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Orders.bind(this)}>
                                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                                <ListItemText>My Orders</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Profile.bind(this)}>
                                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                <ListItemText>My Profile</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Router>
                        <Route exact path={"/store"}>
                            <HomeView bookData={this.state.bookData}
                                      clickBook={this.clickBook.bind(this)}
                                />
                        </Route>
                        <Route exact path={"/store/books"}>
                            <BrowseView bookData={this.state.bookData}
                                        clickBook={this.clickBook.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/info/"}>
                            <InfoView bookInfo={this.state.infoPageBook}
                                      addCart={this.addCart.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/cart"}>
                            <CartView cartData={this.state.cartData}
                                      onNumberChange={this.onCartNumberChange.bind(this)}
                                      remove={this.removeCartItem.bind(this)}
                                      choose={this.chooseCartItem.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/orders"}><OrderView/></Route>
                        <Route exact path={"/store/profile"}><ProfileView/></Route>
                    </Router>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Frame);