import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardActions, CardHeader, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Post } from '../data/post';

interface Props {
  item: Post;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      marginTop: 10,
      marginBottom: 10,
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export default function ListItem(props: Props) {

  //
  const item: Post = props.item;
  const user = item.user;
  console.log('user: ', user);
  const userLabel = user.charAt(0);
  const title = item.title;
  const age = item.age;
  const score = item.score;
  const comments = item.comments;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userLabel}
          </Avatar>
        }
        title={title}
        subheader={age}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="favorites">
          <FavoriteIcon />
        </IconButton>
        {score}
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        {comments}
      </CardActions>
    </Card>
  );
}
