import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {AppBar, Avatar, Typography, Toolbar, Button, useTheme, useMediaQuery, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';
import { getPosts } from '../../actions/posts';

import useStyles from './styles'; 
import memories from '../../images/socialMedia.png';
import MenuIcon from '@material-ui/icons/Menu';


const Navbar =()=>{

const classes = useStyles();
//const user1 = null; // check it user in usestate below

const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));
const [openDrawer, setOpenDrawer] = useState(false);

const dispatch = useDispatch();
const history = useNavigate();
const location = useLocation();

const Logout = () => {
    dispatch({type: 'LOGOUT'});
    
    history('/');
    dispatch(getPosts());
    setuser(null);
};

useEffect(() => {
    const token = user?.token;

    if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) Logout();

    }

    setuser(JSON.parse(localStorage.getItem('profile')));
// eslint-disable-next-line
  },[location]);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  //console.log("isMobile");
  //console.log(isMobile);

return (

    isMobile ? ( 
        <>
                <AppBar className={classes.appBar1} position = "static" color="inherit"  >
                    <div className={classes.brandContainer} >
                        <Typography className={classes.heading} variant = "h4" align="center" >Sharepic</Typography>
                        <img className={classes.image} src={memories} alt="icon" height="50" />
                    </div>
                    <IconButton onClick={() => setOpenDrawer(!openDrawer)} size="large">
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                    
                </AppBar>

                {openDrawer ? (
                    <div className={classes.toolbar1}>
        
                        {user ? (
                                <div className ={classes.profile2}>
                                    <Button variant="contained" className ={classes.Logout} color = "secondary" onClick ={Logout} style={{marginTop: '10px'}} >Logout</Button>

                                    <div className ={classes.profile3}>
                                        <Avatar className={classes.purple} alt ={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>   
                                        <Typography className= {classes.userName} variant= "h5">{user.result.name}</Typography>
                                    </div>
                            
                                </div>
                        ):(
                                <div className ={classes.profile2}>
                                <Button component ={Link} to="/auth" variant="contained" color ="primary" style={{marginTop: '35px'}}>sign in</Button>
                                </div>
                        )}
                    </div>
                     ) : (null)
                    }
        

        </>
    ):(
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant = "h2" align="center" >Sharepic</Typography>
            <img className={classes.image} src={memories} alt="icon" height="50" />
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                <div className ={classes.profile}>
                    <Avatar className={classes.purple} alt ={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>
                    <Typography className= {classes.userName} variant= "h6">{user.result.name}</Typography>
                
                    <Button variant="contained" className ={classes.Logout} color = "secondary" onClick ={Logout} >Logout</Button>
                </div>
                ):(
                <Button component ={Link} to="/auth" variant="contained" color ="primary">sign in</Button>
                )}
            </Toolbar>
        </AppBar>

    )

);

};

export default Navbar;