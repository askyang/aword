import Bmob from 'static/bmob/Bmob-1.4.4.min.js'
import { ApplicationID, RESTAPIKey } from 'static/bmob/bmobKey.js'
Bmob.initialize(ApplicationID, RESTAPIKey)


export function auth() {
  return new Promise((resolve, reject) => {
    Bmob.User.auth().then((res) => {
      console.log('bmob_auth====>', res)
      resolve('登录成功')
    }).catch((err) => {
      reject(err)
    })
  })
}

export function upInfo (userInfo) {
  return new Promise((resolve, reject) => {
    Bmob.User.upInfo(userInfo).then((result) => {
      console.log('bmob_upInfo===>', result)
      resolve('更新成功')
    }).catch((err) => {
      reject(err)
    })
  })
}


export function currentUser () {
  return new Promise((resolve, reject) => {
    let current = Bmob.User.current()
    if (current) {
      console.log('bmob_currentUser===>', current)
      resolve(current)
    } else {
      reject('获取信息失败')
    }
  })
}

export function uploadFile (item, nickName) {
  return new Promise((resolve, reject) => {
    let name = `${nickName}_${new Date().getTime()}_${String(Math.random()).slice(2, 10)}.jpg`
    let file = Bmob.File(name, item);
    file.save().then((res) => {
      console.log('bmob_uploadFile===>', res)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function create (params) {
  return new Promise((resolve, reject) => {
    currentUser().then((res) => {
      console.log('当前用户', res)
      const card = Bmob.Query('card')
      card.set('userId', res.objectId)
      card.set('imgUrl', params.imgUrl)
      card.set('content', params.content)
      card.set('author', params.author)
      card.set('picClass', params.picClass)
      card.set('fontClass', params.fontClass)
      card.save().then((res) => {
        console.log('bmob_create===>', res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}


export function findCards (currentPage = 1, size = 10) {
  return new Promise((resolve, reject) => {
    const query = Bmob.Query('card')
    query.limit(size)
    query.skip(size * (currentPage - 1))
    query.find().then((res) => {
      console.log('bmob_findCards===>', res)      
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}


export function findCollectCards(currentPage = 1, size = 10) {
  return new Promise((resolve, reject) => {
    currentUser().then((res) => {
      let userId = res.objectId
      const collect = Bmob.Query('collect')
      collect.equalTo('userId', '==', userId)
      collect.limit(size)
      collect.skip(size * (currentPage - 1))
      collect.find().then((res) => {
        let cardIdList = []
        res.forEach((item, index) => {
          cardIdList.push(item.cardId)
        })
        const card = Bmob.Query('card')
        card.containedIn('objectId', cardIdList)
        card.find().then((res) => {
          console.log('bmob_findCollectCards===>', res)
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  })
}
