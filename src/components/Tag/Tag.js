import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    // maxWidth: 345,
    margin: '5px 0px'
  },
  media: {
     height: 400,
  },
};

class Tag extends Component {
  render() {
    const { classes, title, description, mediaType, mediaUrl, buttonText1, buttonLink1, buttonText2, buttonLink2 } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={mediaUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={()=> { window.open(buttonLink1, '_blank'); }}>
              {buttonText1}
            </Button>
            <Button dense color="primary" onClick={()=> {console.log('should open buttonLink2')}}>
              {buttonText2}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Tag.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  mediaType: PropTypes.string,
  mediaUrl: PropTypes.string,
  buttonText1: PropTypes.string,
  buttonLink1: PropTypes.string,
  buttonText2: PropTypes.string,
  buttonLink2: PropTypes.string,
};
Tag.defaultProps = {
  title: '',
  description: '',
  mediaType: '',
  mediaUrl: '',
  buttonText1: '',
  buttonLink1: '',
  buttonText2: '',
  buttonLink2: '',
};

export default withStyles(styles)(Tag);
