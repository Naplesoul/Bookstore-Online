import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    icon: {
        marginLeft: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },
});

class SearchBox extends React.Component
{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    };

    onTextChange(e) {
        let text = e.target.value.trim().toLowerCase();
        this.props.onTextChange(text);
    };

    onKeyPress(e) {
        if (this.props.onEnterPress == null)
            return;
        if (e.which === 13) {
            this.props.onEnterPress();
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <SearchIcon className={classes.icon}/>
                <InputBase
                    className={classes.input}
                    value={this.props.text}
                    placeholder={this.props.placeHolder}
                    onChange={this.onTextChange.bind(this)}
                    onKeyPress={this.onKeyPress.bind(this)}
                />
            </Paper>
        );
    };
};

export default withStyles(styles)(SearchBox);
