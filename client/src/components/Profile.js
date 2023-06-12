import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Avatar, Typography, Divider, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: '0 auto',
    marginTop: theme.spacing(10),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  profileImage: {
    width: '150px',
    height: '150px',
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));

function ProfilePage() {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [order,setOrder]=useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    axios.get("https://www.electrozayn.com/api/user/getone/"+ user_id)
      .then((res) => {
        setUser(res.data);
      });
  }, [user]);
  useEffect(()=>{
    const user_id = localStorage.getItem("id");
    axios.get(`https://www.electrozayn.com/api/get_user_order/${user_id}`)
    .then((res)=>{
      setOrder(res.data)
      console.log(res.data)
    })
  })

  return (
    
    <>
      {user.map((el) => {
        return (
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              }
              title={<Typography variant="h4" className={classes.title}>Profile Information</Typography>}
            />
            <CardContent>
            <img src={el?el.profileImage:"https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg"} alt="Profile" className={classes.profileImage} />
            
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Email:</Typography>
                <Typography variant="body1">{el.Email}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Phone Number:</Typography>
                <Typography variant="body1">{el.phoneNumber}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>First Name:</Typography>
                <Typography variant="body1">{el?el.FirstName:null}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Last Name:</Typography>
                <Typography variant="body1">{el?el.LastName:null}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Address:</Typography>
                <Typography variant="body1">{el?el.Address:null}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Code Zip:</Typography>
                <Typography variant="body1">{el?el.Zip:null}</Typography>
              </div>
              <Divider />
              <div className={classes.section}>
                <Typography variant="h6" gutterBottom>Country:</Typography>
                <Typography variant="body1">{el?el.country:null}</Typography>
              </div>
              <Divider />
            </CardContent>

            <Button>LogOut</Button>
          </Card>

        );
      })}
      <div>
        {order.map((el)=>{
         return(
          <div>
             <h1 style={{ color: el.validate_add_or_not === 0 ? 'red' : 'green' }}>
        {el.validate_add_or_not === 0 ? 'Waiting for Confirmation' : 'Confirmed'}
      </h1>
            <h3>{el.product_name}</h3>
          </div>

         )
        })}
      </div>
    </>
  );
}

export default ProfilePage;
