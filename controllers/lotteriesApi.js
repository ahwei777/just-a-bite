// 直接引入完成 ORM 的 models
const db = require('../models');
const { Lottery } = db;

// 回傳 1 ~ x 之間的隨機數字
function getRandom(x) {
  return Math.floor(Math.random() * x) + 1;
}
// 根據傳入陣列物件內的機率屬性進行抽獎，抽出後刪除機率屬性回傳 { 名字, 圖片, 說明 }
function getPrize(prizeArray) {
  const array = prizeArray;
  let totalChance = 0;
  for (let i = 0; i < array.length; i += 1) {
    totalChance += array[i].chance;
  }
  const random = getRandom(totalChance);
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    count += array[i].chance;
    if (random <= count) {
      delete array[i].dataValues.chance;
      return array[i];
    }
  }
  return true;
}
// controller 負責串接 model 及 render
const lotteriesController = {
  get: async (req, res) => {
    try {
      const lotteries = await Lottery.findAll({
        attributes: ['name', 'content', 'imageURL', 'chance'],
        order: [['chance', 'DESC']],
      });
      // 無獎項時回傳值為 []
      if (lotteries.length === 0) {
        const json = {
          ok: 'false',
          message: '目前無任何獎項，請先至後台新增獎項',
        };
        return res.json(json);
      }
      return res.json(getPrize(lotteries));
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      console.log(error.toString());
      const json = {
        ok: 'false',
        message: '伺服器忙碌中, 請稍後再試',
      };
      return res.json(json);
    }
  },
  add: async (req, res) => {
    const {
      name, content, imageURL, chance,
    } = req.body;
    if (!name || !content || !imageURL || !chance) {
      const json = {
        ok: 'false',
        message: '缺少必要欄位',
      };
      return res.json(json);
    }
    try {
      const result = await Lottery.create({
        name,
        content,
        imageURL,
        chance,
      });
      //  新增成功後回傳訊息
      const json = {
        ok: 'true',
        message: 'add successfully',
      };
      return res.json(json);
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      console.log(error.toString());
      const json = {
        ok: 'false',
        message: '伺服器忙碌中, 請稍後再試',
      };
      return res.json(json);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await Lottery.destroy({
        where: {
          id: req.params.id,
        },
      });
      //  刪除成功回傳訊息 & status code
      const json = {
        ok: 'true',
        message: 'delete successfully',
      };
      return res.json(json);
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      console.log(error.toString());
      const json = {
        ok: 'false',
        message: '伺服器忙碌中, 請稍後再試',
      };
      return res.json(json);
    }
  },
  update: async (req, res) => {
    const {
      name, content, imageURL, chance,
    } = req.body;
    if (!name || !content || !imageURL || !chance) {
      const json = {
        ok: 'false',
        message: '缺少必要欄位',
      };
      return res.json(json);
    }
    try {
      const result = await Lottery.update(
        {
          name,
          content,
          imageURL,
          chance,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      //  更新成功
      const json = {
        ok: 'true',
        message: 'update successfully',
      };
      return res.json(json);
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      console.log(error.toString());
      const json = {
        ok: 'false',
        message: '伺服器忙碌中, 請稍後再試',
      };
      return res.json(json);
    }
  },
};

module.exports = lotteriesController;
