import React from 'react';
import { Card, CardActions, /*CardContent,*/ CardMedia, Button, Typography, CircularProgress } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //console.log(post);

  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.like.length > 0) {
      return post.like.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.like.length > 2 ? `You and ${post.like.length - 1} others` : `${post.like.length} like${post.like.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.like.length} {post.like.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  
  return (
    !post ? <CircularProgress /> :
    (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
        )}
      {/*
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      */}
      <Typography className={classes.title} gutterBottom variant="body2" >{post.title}</Typography>
      {/*
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      */}

      <CardActions className={classes.cardActions}>
        

        {(user?.result?._id !== undefined) && (
            <div>
                  <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                  <Likes/>
                  </Button>
            </div>
        )}    

          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div>
              
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                  <DeleteIcon fontSize="small" /> Delete
                </Button>
            </div>    
          )}

        
      </CardActions>
    </Card>
    )
  );
};

export default Post;