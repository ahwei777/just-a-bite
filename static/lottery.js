//  將固定網址及文字設為變數
const API_URL = '/lotteries';
const errorMessage = '系統不穩定，請再試一次';
//  設立一用來 call API 的函數，呼叫後會回傳 err(失敗)或經處理後的物件 json(成功)，後續再設定 callback function 處理回傳值
function getPrize(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', API_URL, true);
  //  有送出 request 時
  request.onload = () => {
    //  成功取得 response 時
    if (request.status >= 200 && request.status < 400) {
      let json;
      //  如 response 非 JSON 格式字串的預處理
      try {
        json = JSON.parse(request.response);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      //  response 是 JSON 格式字串，但沒有需要的資料索引
      if (!json.name) {
        cb(errorMessage);
        return;
      }
      //  成功取得帶有 prize 資料的 JSON 格式字串，作為第二個參數傳給 cb
      cb(null, json);
    } else {
      //  未取得 response 時
      cb(errorMessage);
    }
  };
  //  未送出 request 時
  request.onerror = () => {
    cb(errorMessage);
  };
  //  執行送出 request 的函數
  request.send();
}
//  設定按下後的監聽行為
document.querySelector('.lottery__btn').addEventListener('click', () => {
  getPrize((err, json) => {
    //  產生錯誤時跳出 alert
    if (err) {
      // eslint-disable-next-line
      alert(err);
      return;
    }
    console.log(json);
    //  解構語法
    const { name, content, imageURL } = json;
    //  依據 name 更換獎項名稱
    document.querySelector('.lottery__result__title').innerText = name;
    //  依據 content 更換獎項說明
    document.querySelector('.lottery__result__content').innerText = content;
    //  依據 imageURL 更換背景
    document.querySelector(
      '.section__lottery',
    ).style.backgroundImage = `url('${imageURL}')`;
    //  抽獎後隱藏抽獎說明資訊
    document.querySelector('.lottery__block').classList.add('hide');
    //  抽獎後顯示獲得獎項資訊
    document.querySelector('.lottery__result').classList.remove('hide');
  });
});
