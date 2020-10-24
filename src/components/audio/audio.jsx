import React, { Component } from 'react';

import '../../assets/css/audio.css'

export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateList: [1.0, 1.25, 1.5, 2.0],
      playRate: 1.0,
      isPlay: false,
      isMuted: false,
      volume: 100,
      allTime: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {
    
  }

  formatSecond(time) {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

  // 该音频已准备好开始播放
  onCanPlay = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      allTime: audio.duration,
    });
  };

  // TODO: 播放音频
  playAudio = () => {
    const { id } = this.props;
    const a = document.querySelector('#audio-wrap audio')
    const audio = document.getElementById(`audio${id}`);
    if(!a.src){
      console.log('请选择音乐')
      return
    }
    if(a.src){
      audio.play();
      this.setState({
        isPlay: true,
      });
    }
  };

  // TODO:暂停播放
  pauseAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.pause();
    this.setState({
      isPlay: false,
    });
  };

  onMuteAudio = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      isMuted: !audio.muted,
    });
    audio.muted = !audio.muted;
    audio.muted ? document.getElementById('isvoloff').setAttribute("class", "fa fa-volume-off") : document.getElementById('isvoloff').setAttribute("class", "fa fa-volume-up")
  };

  changeTime = (e) => {
    const { value } = e.target;
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    this.setState({
      currentTime: value,
    });
    audio.currentTime = value;
    if (value === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };

  // 当前播放位置改变时执行
  onTimeUpdate = () => {
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);

    this.setState({
      currentTime: audio.currentTime,
    });
    if (audio.currentTime === audio.duration) {
      this.setState({
        isPlay: false,
      });
    }
  };

  changeVolume = (e) => {
    const { value } = e.target;
    const { id } = this.props;
    const audio = document.getElementById(`audio${id}`);
    audio.volume = value / 100;

    this.setState({
      volume: value,
      isMuted: !value,
    });
  };

  // 倍速播放
  changePlayRate = (num) => {
    this.audioDom.playbackRate = num;
    this.setState({
      playRate: num,
    });
  };

  render() {
    const { src, id } = this.props;

    const {
      isPlay,
      isMuted,
      volume,
      allTime,
      currentTime,
      rateList,
      playRate,
    } = this.state;

    return (
      <div id="audio-wrap">
        <audio
          id={`audio${id}`}
          src={src}
          autoPlay
          loop
          ref={(audio) => {
            this.audioDom = audio;
          }}
          preload={"auto"}
          onCanPlay={this.onCanPlay}
          onTimeUpdate={this.onTimeUpdate}
        >
          <track src={src} kind="captions" />
        </audio>

        {isPlay ? (
          <div className="pauseAudio" onClick={this.pauseAudio}><span className="fa fa-pause"></span></div>
        ) : (
          <div className="playAudio" onClick={this.playAudio}><span className="fa fa-play"></span></div>
        )}

        <div className="audioprogress">
          <span>
            {this.formatSecond(currentTime) + "/" + this.formatSecond(allTime)}
          </span>
          <input
            type="range"
            step="0.01"
            max={allTime}
            value={currentTime}
            className="progress"
            onChange={this.changeTime}
          />
        </div>

        {/* <div onClick={this.onMuteAudio}><span className="fa fa-volume-off"></span></div> */}

        <div className="volume">
          <span id="isvoloff" onClick={this.onMuteAudio} 
            className="fa fa-volume-up"
          ></span>
          <input
            type="range"
            className="volume-control"
            onChange={this.changeVolume}
            value={isMuted ? 0 : volume}
          />
        </div>

        <div className="speed">
          <span>倍速<i className="fa fa-angle-up"></i></span>
          <div className="btns">
          {rateList &&
            rateList.length > 0 &&
            rateList.map((item) => (
              <button
                key={item}
                style={
                  playRate === item
                    ? {
                        border: "1px solid #188eff",
                        color: "#188eff",
                      }
                    : null
                }
                onClick={() => this.changePlayRate(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}