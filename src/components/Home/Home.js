 import React, {useState, useEffect} from "react";
 import { Container,  Grow, Grid, useTheme, useMediaQuery } from '@material-ui/core';
 import { useDispatch } from 'react-redux';

 import { getPosts } from '../../actions/posts';
 import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import './Home.css';
//import axios from "axios";




 const Home = () =>{

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    
  
    useEffect(() => {

      // insert data start


      // testing start
      /*const getFriends = async () => {
        //const p= {  senderId:'64ec59eba046973fbc9a8006', receiverId:'64ed9ae040cc8a373c0f761c'};

      //const message1 = {
      //sender: "64ec59eba046973fbc9a8006",
      //text: "Hi, this is first message",
      //conversationId: "64f4e108a92c1525bcfdc17e",
    //};
    //const res = await axios.post("/messages",  message1);
    //console.log(res.data);

        //console.log("check inserting data value");
        //console.log(p);
        //const res = await axios.get("http://localhost:5000/user/suman");
        const res = await axios.get("http://localhost:5000/user/search/s");// for searching regex
          // const res = await axios.post("/conversations",  p);
         //const res = await axios.get("/user/" + user._id);
        // const res = await axios("/users?userId=" + friendId); check about it
        //console.log("check conversation user api start");
        console.log("check conversation api end");
        console.log(res.data);
        console.log("check conversation api end");
      };
      getFriends();*/
      // testing end 


       //console.log("check home");

      // insert data end

      dispatch(getPosts());
    }, [currentId, dispatch]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  
    //console.log("isMobile");
    //console.log(isMobile);

    return(
    
        <Grow in>
        <Container>
          <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>

            {isMobile ? (
              <Grid style={{maxHeight: "650px", overflowY: "scroll"}} item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
            ) : (
              <Grid style={{maxHeight: "500px", overflowY: "scroll"}} item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid> 
            )}

                       
          </Grid>
        </Container>
      </Grow>

    );
  };

 export default Home;