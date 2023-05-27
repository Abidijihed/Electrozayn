import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Info as InfoIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  aboutButton: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'blue',
      backgroundColor:"white"
    }
  },
  title2: {
    display: 'inline-block',
    marginRight: '20px',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'blue',
      backgroundColor:"white"
    },
  },
  
}));

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const token = localStorage.getItem('token');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            style={{ display: isSmallScreen ? 'flex' : 'none' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            style={{ display: isSmallScreen ? 'block' : 'none' }}
          >
            <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>
              Contact Us
              </MenuItem>
              
            <MenuItem
              component={Link}
              to="/about"
              onClick={handleMenuClose}
            >
              About Us
            </MenuItem>
            {!token && (
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                Log In
              </MenuItem>
            )}
            {token && (
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                Profile
              </MenuItem>
            )}
            <MenuItem
              component={Link}
              to="/ListProduct"
              onClick={handleMenuClose}
            >
              ListProduct
            </MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title2}>
             Electrozayn
            </Link>
          </Typography>
          <IconButton
          
            edge="end"
            className={classes.aboutButton}
            color="inherit"
            aria-label="contact"
            component={Link}
            to="/contact"
            style={{ display: isSmallScreen ? 'none' : 'flex' }}
          >
            <Typography variant="body1">Contact Us</Typography>
          </IconButton>
            <IconButton
            edge="end"
            className={classes.aboutButton}
            color="inherit"
            aria-label="about"
            component={Link}
            to="/about"
            style={{ display: isSmallScreen ? 'none' : 'flex' }}
          >
            <Typography variant="body1">About Us</Typography>
          </IconButton>
          {!token && (
            <IconButton
              edge="end"
              className={classes.aboutButton}
              color="inherit"
              aria-label="log in"
              component={Link}
              to="/login"
              style={{ display: isSmallScreen ? 'none' : 'flex' }}
            >
              <Typography variant="body1">Log In</Typography>
            </IconButton>
          )}
          {token && (
            <IconButton
              edge="end"
              className={classes.aboutButton}
              color="inherit"
              aria-label="profile"
              component={Link}
              to="/profile"
              style={{ display: isSmallScreen ? 'none' : 'flex' }}
            >
              <Typography variant="body1">Profile</Typography>
            </IconButton>
          )}
          <IconButton
          
          edge="end"
          className={classes.aboutButton}
          color="inherit"
          aria-label="contact"
          component={Link}
          to="/ListProduct"
          style={{ display: isSmallScreen ? 'none' : 'flex' }}
        >
          <Typography variant="body1">ListProduct</Typography>
        </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{ color:"black" }}
            />
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
