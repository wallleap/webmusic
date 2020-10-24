import React, { Component } from 'react'
import { Menu } from 'antd'
import {
  HashRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import NotFound from '../not-found/not-found'
import Discovery from '../discovery/discovery'
import Playlists from '../playlists/playlists'
import Playlist from '../playlist/playlist'
import Songs from '../songs/songs'
import Mvs from '../mvs/mvs'
import Mv from '../mv/mv'
import Search from '../search/search'
import Audio from '../audio/audio'

import bus from '../../utils/bus'
import { getSongUrl } from '../../api/discovery'

import '../../assets/css/content.css'
const { SubMenu } = Menu;
export default class Content extends Component {
  constructor() {
    super()

    this.state = {
      url: '',
      isLogin: false
    }

    this.audioRef = React.createRef()
  }

  componentDidMount() {
    // 播放音乐
    bus.on('playMusic', async (id) => {
      const res = await getSongUrl({ id })

      if (res.data.code === 200) {
        this.setState({
          url: res.data.data[0].url,
        })
      }
    })
    // 暂停音乐
    /* bus.on('pauseMusic', () => {
      this.audioRef.current.pause()
    }) */
  }

  render() {
    return (
      <Router>
        <div className="content-wrapper">
          <div className="menu">
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.Item key="1">
                <NavLink activeClassName="router-link-active" to="/discovery">
                  <i className="iconfont icon-find-music"></i>发现音乐
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink  activeClassName="router-link-active" to="/playlists">
                  <i className="iconfont icon-music-list"></i>推荐歌单
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink activeClassName="router-link-active" to="/songs">
                  <i className="iconfont icon-music"></i>最新音乐
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink activeClassName="router-link-active" to="/mvs">
                  <i className="iconfont icon-mv"></i>最新MV
                </NavLink>
              </Menu.Item>
              {this.state.isLogin ? (<SubMenu 
                key="sub1"
                title={<span><i className='fa fa-headphones'></i><span>我的歌单</span></span>}
              >
                <Menu.Item><img src={require('../../assets/images/avatar.png')} alt="music"/>我喜欢</Menu.Item>
                <Menu.Item><img src={require('../../assets/images/wallleap.png')} alt="music"/>kuaile</Menu.Item>
              </SubMenu>) : null}
            </Menu>
          </div>
          <div className="content">
            <Switch>
              <Route path="/discovery" component={Discovery} />
              <Route path="/playlists" component={Playlists} />
              <Route path="/songs" component={Songs} />
              <Route path="/mvs" component={Mvs} />
              <Route path="/playlist/:id" component={Playlist} />
              {<Route path="/mv/:id" component={Mv} />}
              <Route path="/search/:keyword" component={Search} />
              <Redirect exact from="/" to="/discovery" />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="play-music">
            <Audio
              ref={this.audioRef}
              src={this.state.url}
            />
          </div>
        </div>
      </Router>
    )
  }
}