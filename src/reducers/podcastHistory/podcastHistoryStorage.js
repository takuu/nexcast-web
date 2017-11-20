import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const HISTORY_KEY = 'HISTORY_STORAGE';

export async function getAllHistory() {
  let result;
  try {
    let historyHash = await AsyncStorage.getItem(HISTORY_KEY);
    result = JSON.parse(historyHash)  || {};
  } catch (error) {
    console.log('podcastHistoryStorage err: ', error);
  }
  return result;
}



export async function getNextHistory(currentEpisode={}) {
  let result;
  try {
    let historyHash = await AsyncStorage.getItem(HISTORY_KEY);
    historyHash = JSON.parse(historyHash);
    const orderedQueue = _.orderBy(historyHash, ['lastPlayed']);
    console.log('getNextHistory: ', orderedQueue, currentEpisode);

    if(orderedQueue.length) {
      result = orderedQueue[0];
      if (result.mediaUrl == currentEpisode.mediaUrl) {
        result = orderedQueue[1];
      }
    } else {
      // It's empty
    }
  } catch (error) {
    console.log('podcastHistoryStorage err: ', error);
  }
  return result;
}


export async function setHistory(episode) {
  let result;
  try {
    let historyHash = await AsyncStorage.getItem(HISTORY_KEY);
    historyHash = JSON.parse(historyHash)  || {};
    historyHash[episode.mediaUrl] = _.merge(historyHash[episode.mediaUrl], episode);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyHash));
    result = historyHash;
  } catch (error) {

  }
  return result;
}

export async function removeHistory(episode={}) {
  let result;
  try {
    let historyHash = await AsyncStorage.getItem(HISTORY_KEY);
    historyHash = JSON.parse(historyHash) || {};
    if (historyHash && historyHash[episode.mediaUrl]) delete historyHash[episode.mediaUrl];
    result = await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyHash))
  } catch (error) {
    console.log('podcastHistoryStorage err: ', error);
  }
  return result;
}
