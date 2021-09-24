import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';

const StyledBadge = withStyles((theme, props) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function ChatIcon(props) {
    return (
        <StyledBadge badgeContent={props.number} color="secondary">
            <ForumIcon />
        </StyledBadge>
    );
}
