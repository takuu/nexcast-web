'use strict';

import { NativeModules, DeviceEventEmitter } from 'react-native';
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
let ReactNativeAudioStreaming = {
  pause: () => {},
  stop: () => {},
  start: () => {},
  resume: () => {},
  play: () => {},
  getStatus: () => {},
  seekToTime: () => {},
  goForward: () => {},
  goBack: () => {},
  enableControl: () => {},

};


/**
 * High-level docs for the MusicControl iOS API can be written here.
 */
var handlers = { };
var subscription = null;

var MusicControl = {
  // enableBackgroundMode: function(enable){
  //   NativeMusicControl.enableBackgroundMode(enable)
  // },
  // setNowPlaying: function(info){
  //   NativeMusicControl.setNowPlaying(info)
  // },
  // resetNowPlaying: function(){
  //   NativeMusicControl.resetNowPlaying()
  // },
  enableControl: function(controlName, bool, options = {}) {
    ReactNativeAudioStreaming.enableControl(controlName, bool, options || {})
  },
  handleCommand: function(commandName) {
    if(handlers[commandName]){
      handlers[commandName]()
    }
  },
  on: function(actionName, cb) {
    if(subscription){
      subscription.remove();
    }
    subscription = DeviceEventEmitter.addListener(
      'RNMusicControlEvent',
      (event) => {
        MusicControl.handleCommand(event.name)
      }
    );
    handlers[actionName] = cb
  },
  off: function(actionName, cb) {
    delete(handlers[actionName])
    if(!Object.keys(handlers).length && subscription){
      subscription.remove()
      subscription = null;
    }
  }
};

module.exports = MusicControl;
