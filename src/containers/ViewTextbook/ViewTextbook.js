// ViewTextbook.js

// React
import React, { Component } from 'react';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';

// Assets
import book from '../../assets/images/book.png';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const style = {
	container: {
		height: '80vh',
		margin: 'auto',
		width: '90%'
	},
	media: {
		'background-color': '#E8EAF6',
		height: '80vh',
		padding: 60
	},
	picture: {
		height: 'calc(80vh - 120px)'
	},
	infoContainer: {
		padding: 20
	},
	infoBody: {
		height: 'calc(65vh - 40px)'
	},
	infoHeader: {
		height: '10vh'
	},
	infoButton: {
		height: '5vh'
	}
}

class ViewTextbook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
    	<Paper className="ViewTextbook" elevation={20} style={ style.container }>
    		<Grid container spacing={0}>

    			<Hidden xsDown>
	    			<Grid item xs={6} style={style.media}>
	    				<Card style={ style.picture }>
	    					<Paper elevation={12}>
		    					<CardMedia 
		    						style={ style.picture }
		    					  image={book}
		    					  title="Cover Art"
		    					/>
		    				</Paper>
	    				</Card>
	    			</Grid>
	    		</Hidden>

    			<Grid item xs={12} sm={6} md={6} style={style.infoContainer}>
    				<Grid container>
    					<Grid item xs={12} style={ style.infoHeader }>
		    				<Typography type="title" color="inherit">
						      Title
						    </Typography>
						    <Typography type="subheading" color="textSecondary">
	    					  Author
	    					</Typography>
    					</Grid>
    					<Grid item xs={12} style={ style.infoBody }>
	    					<Typography type="body1" color="inherit">
	    					  This is where the description will go
	    					</Typography>
    					</Grid>

    					<Grid item xs={12} style={ style.infoButton }>
						    <Button raised color="primary" fullWidth={true} style={ style.contactButton }>
			            Purchase Book
			          </Button>
    					</Grid>
    				</Grid>
    			</Grid>
    		</Grid>
      </Paper>
    </div>
  );
  }
}

export default ViewTextbook;

/*
<Paper elevation={4} style={ style.picture }>
	    					<img src={book} style={ style.picture }/>
	    				</Paper>

*/


/*
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Sound
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
*/