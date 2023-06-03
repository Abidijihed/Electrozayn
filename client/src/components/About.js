import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: '#f8f8f8',
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        We are a leading provider of LED lights, chargers, and battery repair services. With years of experience in the industry, we offer high-quality products and reliable repairs to meet your needs.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our LED lights are energy-efficient, long-lasting, and available in a variety of styles to suit different applications. Whether you need LED lights for residential, commercial, or industrial purposes, we have a wide selection to choose from.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Additionally, we provide chargers for various devices, including smartphones, tablets, laptops, and more. Our chargers are built with safety features to protect your devices and ensure efficient charging.
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have a faulty battery, our expert technicians can help. We offer professional battery repair services to extend the lifespan of your batteries and restore their performance. Whether it's a smartphone battery, laptop battery, or any other type of battery, we have the expertise to handle it.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Customer satisfaction is our top priority. We strive to provide excellent products, reliable repairs, and exceptional customer service. Feel free to contact us if you have any questions or need assistance with your LED lights, chargers, or battery repairs.
      </Typography>
    </Container>
  );
};

export default About;
