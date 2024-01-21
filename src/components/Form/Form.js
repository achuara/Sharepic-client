import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, useTheme, useMediaQuery, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  // eslint-disable-next-line
  const posts = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '' });

  const [openDrawer, setOpenDrawer] = useState(false);
  
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  //console.log(user?.result?.name);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  //console.log("isMobile");
  //console.log(isMobile);

  useEffect(() => {
    //console.log("check form");
    //console.log(post);
    //console.log("check form");
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({  title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("currentId");
    //console.log(currentId);
    //console.log("currentId");
    
    if (currentId === 0) {
      //console.log("1st check");
      //console.log({...postData, name: user?.result?.name });
      //console.log("1st check");
      dispatch(createPost({...postData, name: user?.result?.name }));
      clear();
    } else {
      //console.log("2st check");
      //console.log({...postData, name: user?.result?.name });
      //console.log("2st check");
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
      clear();
    }
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          please sign in to share your picture and like other's picture.
        </Typography>
      </Paper>
    );
     
  }

 

  return (
    isMobile ? (
      <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        
          <IconButton onClick={() => setOpenDrawer(!openDrawer)} size="large" style={{position : "inherit"}}>
            <Typography variant="h5">
            {currentId ? `Editing"${post.title}"` : 'Share a Picture '}<CloudUploadIcon fontSize="large"/>
            </Typography>
          </IconButton>
         
        
        {openDrawer ? (
          <>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>  
          </>
        ):(
          null
        )}

             </form>
      </Paper>
    ):(
      <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Share a Picture'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        {/*
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })} />
        */}
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
      </Paper>
    )
    
      
   
    
  );
};

export default Form;
