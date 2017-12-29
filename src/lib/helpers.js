import moment from 'moment';


export function getEpisode(episode, show) {
  var div = document.createElement("div");
  div.innerHTML = episode.description;
  var parsedDescription = div.textContent || div.innerText || "";
  var episodeDate = new Date(episode.pubDate);

  var today = new Date();
  var dateDifference = (today - episodeDate) / (1000*60*60*24);

  var prettyDate = (dateDifference < 7) ? moment(episodeDate).format('dddd') : moment(episodeDate).format('MMM Do');

  var prettyDuration = _prettyDuration(episode.duration);
  /*
   {podcastTitle: show.title, imageUrl: show.imageurl, parsedDescription: episode.parsedDescription,
   media_location: episode.media_location, episodeTitle: episode.title, episodeDate: new Date(episode.pubDate), duration: episode.duration}
   */
  return {podcastTitle: show.title, imageUrl: show.imageurl, parsedDescription: parsedDescription, prettyDate: prettyDate, prettyDuration: prettyDuration,
    media_location: episode.media_location, episodeTitle: episode.title, episodeDate: episodeDate, duration: episode.duration, episode_key: episode.episode_key,
    seconds: hmsToSecondsOnly(episode.duration)
  }
}

export function hmsToSecondsOnly(str) {
  var p = str.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function secondsToHMS(seconds=0) {
  var start = 11;
  var length = 8;
  if(seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

export function isURL(str) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}


export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}


export function linkify(text) {
  var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, function(url) {
    return '<a class="green-link" href="#" onclick="window.open(\'' + url + '\', \'_blank\', \'location=yes\')">' + url + '</a>';
  });
}

export function prettyDuration (duration) {
  return _prettyDuration(duration);
}

export function prettyDate (date) {
  return _prettyDate(date);
}

function _prettyDuration (duration) {
  var hours = moment.duration(parseInt(duration)*1000).hours();
  var minutes = moment.duration(parseInt(duration)*1000).minutes();
  var prettyHours = (hours > 0) ? hours + ' hr' : '';
  var prettyMinutes = (minutes > 0) ? minutes + ' min' : '';
  return prettyHours + ' ' + prettyMinutes;
}

function _prettyDate (date) {
  //moment(date, 'DD MMM YYYY');
  var today = new Date();
  var dateDifference = (today - date) / (1000*60*60*24);

  // return (dateDifference < 7) ? moment(date).format('dddd') : moment(date).format('MMM Do');
  return (dateDifference < 7) ? moment(date, 'DD MMM YYYY').format('dddd') : moment(date, 'DD MMM YYYY').format('MMM Do');
}
