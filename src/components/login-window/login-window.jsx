import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Input, Button } from 'antd'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import md5 from 'js-md5'

React.Component.prototype.$md5 = md5
export default class LoginWindow extends Component {
  state = {
    phone: '',
    password: ''
  }
  login = () => {
    console.log(this.state)
    // this.props.login(this.state)
  }
  handleChange = (name, e) => {
    /* this.setState({
      [name]: e.target.value
    }) */
    name== 'password' ? 
    this.setState({
      password: this.$md5(e.target.value)
    }) : 
    this.setState({
      [name]: e.target.value
    })
  }
  hideLogin = () => {
    document.getElementById(`loginwrap`).style.cssText = "opacity: 0; height: 0;"
    this.props.falseShow()
  }
  largeLogin = () =>{
    document.getElementById(`loginwrap`).style.cssText = "height: 80vh;width: 80vw;opacity: 1;"
  }
  smallLogin = () =>{
    document.getElementById(`loginwrap`).style.cssText = "height: 520px;width: 400px;opacity: 1;"
  }
  render() {
    return (
      <div className="login-window" id="loginwrap">
        <div className="top-control">
          <span title="关闭窗口"
            className="fa fa-times"
            onClick={this.hideLogin} 
          ></span>
          <span title="缩小窗口" className="iconfont icon-sami-select" onClick={this.smallLogin} ></span>
          <span title="放大窗口" className="iconfont icon-full-screen" onClick={this.largeLogin}></span>
        </div>
        <div className="userinfo">
          <h2>请用手机号登录</h2>
          <Input size="large" 
            placeholder="请输入手机号" 
            prefix={<MobileOutlined />}
            style={{width: 260}}
            onChange={e => {this.handleChange('phone', e)}}
          />
          <Input.Password 
            size="large" 
            placeholder="请输入密码" 
            prefix={<LockOutlined />}
            style={{width: 260}}
            onChange={e => {this.handleChange('password', e)}}
          />
          <div className="loginbtn">
            <Button type="primary" onClick={this.login}>登录</Button>
            <Button title="暂不支持注册" type="primary" disabled>注册</Button>
          </div>
        </div>
      </div>
    )
  }
}