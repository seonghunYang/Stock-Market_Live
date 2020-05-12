import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function WishList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Typography component="div">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BookmarksIcon />
        </ListItemIcon>
        <ListItemText primary="WishList" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="ex" style={{textAlign: "center"}}/>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
          </ListItem>
        </List>
      </Collapse>
    </Typography>
  );
}