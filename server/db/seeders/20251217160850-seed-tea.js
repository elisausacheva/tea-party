"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Teas",
      [
        {
          sort: "Зеленый",
          name: "Лунцзин",
          location: "провинция Чжэцзян (Китай)",
          img: "https://coffee-static.storage.yandexcloud.net/files/shares/data/blog/chem_interesen_chaj_lun_czin/image7.png",
          desc: "Лунцзин («Колодец Дракона»):Лунцзин (Long Jing Cha, 龙井茶) — знаменитый китайский зелёный чай, входящий в «Десять знаменитых чаёв Китая». Его родина — провинция Чжэцзян, район озера Сиху (Западное озеро) близ Ханчжоу. Название связано с легендой о колодце, где во время дождя возникали оптические эффекты, напоминавшие движения дракона. В XVIII веке император Цяньлун присвоил статус «императорского чая» 18 кустам возле храма Хугун — они существуют до сих пор.",
          userID: "1",
        },
        {
          sort: "Белый",
          name: "Бай Хао Инь Чжень",
          location: "горы Цзюнь Шань у озера Дунтин (провинция Хунань).",
          img: "https://daochai.ru/optim/detailed/630/IMGP2581.jpg",
          desc: "Бай Хао Инь Чжень (Báiháo Yínzhēn, 白毫银针) — элитный сорт белого чая из Китая, считающийся самым ценным среди белых чаёв. Название буквально означает «серебряные иглы с белым ворсом» — оно отражает внешний вид чайных почек.",
          userID: "1",
        },
        {
          sort: "Желтый",
          name: "Цзюнь Шань Инь Чжень",
          location: "горы Цзюнь Шань у озера Дунтин (провинция Хунань)",
          img: "https://drakonchai.ru/upload/iblock/2ae/c0l21rr6e6ilv6istfhxd7bflnz10om0/Nastoy-TSzyun-SHan-In-CHzhen.jpg",
          desc: "Цзюнь Шань Инь Чжэнь (Jūn Shān Yín Zhēn, 君山银针) — элитный китайский жёлтый чай, входящий в список «Десяти знаменитых чаёв Китая». Отличается исключительной редкостью, кропотливой ручной обработкой и многогранным вкусовым профилем.",
          userID: "1",
        },
        {
          sort: "Улун",
          name: "Да Хун Пао",
          location: "горы Уи (Уишань), провинция Фуцзянь (Юго‑Восточный Китай)",
          img: "https://tea-coffee.info/upload/medialibrary/077/xhjthe2t4mxzhrwg6dp34hat8etgr29t.jpg",
          desc: "Да Хун Пао (Dàhóng páo, 大红袍) — знаменитый китайский улун средней ферментации, один из «десяти знаменитых чаёв Китая». Отличается насыщенным вкусом с нотами карамели, орехов и лёгкой дымностью, а также долгим послевкусием с минеральной глубиной («утёсной стойкостью»).",
          userID: "1",
        },
        {
          sort: "Черный",
          name: "Дянь Хун",
          location: "Юньнань (Юго‑Западный Китай)",
          img: "https://nicetea.ua/uploads/webpn/uploads/images/articles/20220218_znakomstvo-z-krasnym-chaem-dian-hun/01_znakomstvo-z-krasnym-chaem-dian-hun.webp?1645190558542",
          desc: "Дянь Хун (Diān Hóng Chá, 滇红茶) — китайский красный чай (в европейской традиции именуется «чёрным»). Название буквально означает «красный чай из Дяньси» — старинного наименования провинции Юньнань.",
          userID: "1",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Teas", null, {});
  },
};
