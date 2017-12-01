import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import cards from '../../Database.json';
import _ from 'lodash';
import Tag from '../components/Tag/Tag';
import { getEpisodes } from '../reducers/showDetail/showDetailActions';
import { getPodcast } from '../reducers/podcast/podcastActions';


// var sound = "http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded";
var sound = "http://www.noiseaddicts.com/samples_1w72b820/2534.mp3";

console.log('cards: ', cards);

function onProgress(e) {
  console.log('progress: ', e)
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


@connect((state, router) => {
  const { showDetail, podcastInfo } = state;
  return { showDetail, podcastInfo };
}, {
  getPodcast, getEpisodes
})
class EpisodePage extends Component {
  render() {
    const { classes } = this.props;
    console.log('EpisodePage', );
    console.log('EpisodePage: ', cards.cards);

    const tagList = _.map(cards.cards.result, ({ title, description, mediaType, mediaUrl, buttonText1, buttonLink1, buttonText2, buttonLink2 }, index) => {
      return (
        <Tag key={index} title={title} description={description} mediaType={mediaType} mediaUrl={mediaUrl} buttonText1={buttonText1} buttonLink1={buttonLink1} buttonLink2={buttonLink2} buttonText2={buttonText2}></Tag>
      )
    });

    return (
      <div>
        <div style={{position: 'fixed', top: '44px', width: '100%', display: 'flex', left: 'auto', flexDirection: 'column'}}>
          <AudioPlayer mediaUrl={sound}  onProgress={onProgress} tags={[5,10,15,30,100, 157]} title="Nexcast" subTitle={"First Episode"} />
        </div>
        <div style={{marginTop: '300px'}}>
          <Grid container spacing={24}>
            <Grid item xs={0} sm={3}>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                {tagList}
              </Paper>
            </Grid>
            <Grid item xs={0} sm={3}>
            </Grid>
          </Grid>

        </div>
      </div>
    );
  }
}

EpisodePage.propTypes = {};
EpisodePage.defaultProps = {};

export default withStyles(styles)(EpisodePage);
