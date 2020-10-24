import React, { Component } from 'react';
import {Input} from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import '../../assets/css/top.css'
import SearchPreview from '../search-preview/search-preview'
import LoginWindow from '../login-window/login-window'

const { Search } = Input

export default class Top extends Component {
  constructor(){
    super()
    this.state = {
      isShow: false
    }
  }
  goToSearchPage = (value) => {
    window.open(`#/search/${value}`, '_self')
  }
  showLogin = () => {
    this.state.isShow = !this.state.isShow
    this.state.isShow ? document.getElementById(`loginwrap`).style.cssText = "opacity: 1; height: 520px;" : document.getElementById(`loginwrap`).style.cssText = "opacity: 0; height: 0;"
  }
  fShow = () => {
    this.state.isShow = false
  }
  render() {
    return (
      <div className="top-container">
        <div className="top-control">
          <span title="回到主页" className="iconfont icon-home" onClick={() => window.history.go('/')}></span>
          <span title="后退" className="iconfont icon-arrow-lift" onClick={() => window.history.go(-1)}></span>
          <span title="前进" className="iconfont icon-arrow-right" onClick={() => window.history.go(1)}></span>
        </div>
        <div className="top-info clearfix">
          <a href="/" className="title"><img src={require('../../assets/images/wallleap.png')} alt="wallleap" /><h1>wall悦听</h1></a>
          <div className="search-wrapper">
            <Search
              placeholder="搜索"
              onSearch={(value) => this.goToSearchPage(value)}
              style={{ width: 250 }}
              /* onPressEnter={this.goToSearchPage} */
            />
            <SearchPreview/>
          </div>
          <div className="login-wrapper"
            onClick={this.showLogin}
          >
            <Avatar size="large" icon={<UserOutlined />} />
            <span className="username">未登录</span>
          </div>
          <LoginWindow falseShow={this.fShow}/>
        </div>
      </div>
    )
  }
}