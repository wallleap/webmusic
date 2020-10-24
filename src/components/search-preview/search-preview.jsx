import React, { Component } from 'react';

export default class SearchPreview extends Component {
  constructor(){
    super()
    this.state = {
      searching: false
    }
  }
  render() {
    
    return(
      <div className="search-preview">
        {!this.state.searching&&(
          <div >
            <div className="history-search">
              <h2>搜索历史<i className="fa fa-trash-o"></i></h2>
              <div className="hist-list">
                <span className="hist-item">海底</span>
                <span className="hist-item">世间美好与你环环相扣</span>
                <span className="hist-item">Lorem ipsum</span>
                <span className="hist-item">海底</span>
                <span className="hist-item">海底</span>
                <span className="hist-item">海底</span>
              </div>
            </div>
            <div className="hot-music">
              <h2>热搜榜</h2>
              <div className="hotlist">
                <div className="hotitem">
                  <div className="sortnum">01</div>
                  <div className="musicitem">
                    <h3 className="songname">舒克贝塔</h3>
                    <div className="songinfo">
                      <span className="hotnum">3879816</span>
                      <span className="hotnew">Hot</span>
                    </div>
                    <div className="songdesc">心情变好！</div>
                  </div>
                </div>
                <div className="hotitem">
                  <div className="sortnum">02</div>
                  <div className="musicitem">
                    <h3 className="songname">舒克贝塔</h3>
                    <div className="songinfo">
                      <span className="hotnum">3879816</span>
                      <span className="hotnew">Hot</span>
                    </div>
                    <div className="songdesc">心情变好！</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.searching&&(
          <div className="searchresult">
            <p>搜索&nbsp;"&nbsp;<span className="input-info">爱</span>&nbsp;"&nbsp;相关的结果</p>
            <div className="songresult">
              <h2><i className="fa fa-music"></i>单曲</h2>
              <ul>
                <li>爱存在</li>
                <li>爱的供养</li>
              </ul>
            </div>
            <div className="artresult">
              <h2><i className="fa fa-user-circle"></i>歌手</h2>
              <ul>
                <li>ai</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    )
    
  }
}