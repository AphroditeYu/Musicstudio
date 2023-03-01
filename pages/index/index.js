Page({
  data:{
     tab:0,
     item:0,
     play:{
    currentTime:'00:00',
    duration:'00:00',
    percent:0,
    title:'',
    singer:'',
    coverImgUrl:''
     },
     playIndex:2,//当前音乐的索引
     state:'paused',
     playlist:[
       {id:1,title:'方圆几里',singer:'薛之谦',src:'http://localhost:3000/薛之谦 - 方圆几里.mp3',coverImgUrl:'/img/cover.jpg'},
       {id:2,title:'刚刚好',singer:'薛之谦',src:'http://localhost:3000/薛之谦 - 刚刚好.mp3',coverImgUrl:'/img/cover1.jpg'},
       {id:3,title:'怪咖',singer:'薛之谦',src:'http://localhost:3000/薛之谦 - 怪咖.mp3',coverImgUrl:'/img/cover2.jpg'},
       {id:4,title:'你还要我怎样',singer:'薛之谦',src:'http://localhost:3000/薛之谦 - 你还要我怎样.mp3',coverImgUrl:'/img/cover3.jpg'},
       {id:1,title:'绅士',singer:'薛之谦',src:'http://localhost:3000/薛之谦 - 绅士.mp3',coverImgUrl:'/img/cover4.jpg'},
     ]
  },
  //页面切换
  changetab:function(e){
    this.setData({tab:e.detail.current});
  },
  //tab切换
  changeitem:function(e){
    this.setData({item:e.target.dataset.item})
  },
  //播放
  play:function(){
    this.audioCtx.play()
    this.setData({state:'running'});
  },
  //暂停
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:'paused'})
  },
  setMusic:function (index) {
    var music=this.data.playlist[index]
    this.audioCtx.src=music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      // 'play.currentTime':'00:00',
      // 'play.duration':'00:00',
      // 'play.percent':0,
    })
  },
  nextmusic:function () {
    //index用于保存下一首的索引
   var index=this.data.playIndex>=this.data.playlist.length-1?0:this.data.playIndex+1
   this.setMusic(index)
   this.play()
  },
  previous:function(){
    // var index=this.data.playIndex<=0?this.data.playlist.length-1:this.data.playIndex-1
    var index=this.data.playIndex<=0
    if(index){
     index=this.data.playlist.length-1
    }else{
      index=this.data.playIndex-1
    }
    this.setMusic(index)
    this.play()
  },
  audioCtx:null,//定义一个属性，用于存放音乐上下文(即音频对象)
  onReady:function(){
      this.audioCtx= wx.createInnerAudioContext()
      this.setMusic(0)
      var that=this
      this.audioCtx.onTimeUpdate(function () {
        that.setData({
          'play.currentTime':formatTime(that.audioCtx.currentTime),
          'play.duration':formatTime(that.audioCtx.duration),
          'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100,
        })
      })
      function formatTime(time) {
        var minute=Math.floor(time/60)%60
        var second=Math.floor(time)%60
        return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
      }
  }

})