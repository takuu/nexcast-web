import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    flexDirection: 'row',
    background: theme.palette.background.paper,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflowX: 'scroll',
  },
  card: {
    maxWidth: 350,
    height: 350,
    margin: '0px 2px'
  },
  media: {
    height: 250,
    width: 250,
  },
});


class CategoryList extends Component {
  render() {
    const { name, podcastList, classes } = this.props;
    return (
      <div>
        <Typography type="headline" component="h4">
          {name}
        </Typography>
        <Grid container spacing={24} style={{marginTop: '20px'}}>
          <div className={classes.root}>
            <br/>

            {_.map(podcastList, (show) => (
              <Link to={`/podcast/${show.podcast_id}`}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={show.image_url}
                    title={show.title}
                  />
                  <CardContent>
                    <Typography type="headline" component="h4">
                      {show.title}
                    </Typography>
                    {/*                  <Typography component="p">
                    {show.description}
                  </Typography>*/}
                  </CardContent>
                </Card>
              </Link>

            ))}

          </div>

        </Grid>

      </div>
    );
  }
}

CategoryList.propTypes = {
  name: PropTypes.string,
  podcastList: PropTypes.arrayOf(PropTypes.object)
};
CategoryList.defaultProps = {
  name: '',
  podcastList: [],
};

export default withStyles(styles)(CategoryList);
