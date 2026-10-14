const articles = [
  {
    slug: 'morning-run-hotel-stay',
    url: '/journal/morning-run-hotel-stay',
    title: '入住的隔天，我先穿上跑鞋',
    rhythm: '晨動',
    categoryLabel: '有鬆一日・晨動',
    seoTitle: '入住隔天的晨跑：跟著引導員跑一條已探勘的路線｜有鬆島',
    seoDescription: '入住的隔天清晨，跟著晨跑員跑一條已探勘的路線，下坡顧膝、上坡加點強度，回飯店吃酸種與蔬食，再到露台做瑜伽。有鬆一日・晨動體驗文。',
    author: '',
    partnerHotel: '',
    guide: '',
    readingTime: '約 4 分鐘',
    featured: true,
    published: false,
    coverImage: '/assets/images/journal/morning-run-cover.jpg',
    coverImageAlt: '淡藍色清晨，旅客與晨跑引導員在山林旅宿外暖身',
    relatedTrip: '',
    relatedStories: [
      { slug: 'what-is-wellness-trip', title: '什麼是 Wellness Trip？台灣身心靈旅行入門指南', status: 'upcoming' },
      { slug: 'first-sound-bowl-reiki-mindfulness-class', title: '第一次上頌缽、靈氣、正念課，先知道這些', status: 'upcoming' },
      { slug: 'shell-ginger-and-taiwan-cinnamon', title: '月桃與台灣土肉桂：認識兩種在地草本', status: 'upcoming' },
    ],
    sections: [
      {
        type: 'lead',
        content: '入住的隔天清晨，我做的第一件事不是享用早餐，而是跟著飯店的晨跑員一起綁好鞋帶。',
      },
      {
        type: 'paragraph',
        content: '天色還是淡淡的藍。大廳外，晨跑員已經在暖身。這條路線，他在我們抵達之前就來回探勘過：哪一段車少、哪裡有樹蔭、哪個彎道視野會突然打開，他都記得。我只需要做一件事——跟上。',
      },
      {
        type: 'heading',
        content: '不用看配速的跑步',
      },
      {
        type: 'paragraph',
        content: '平常一個人跑，眼睛總盯著手錶，耳朵防著後方來車。這天不一樣。配速交給前方那個穩定的背影，路線避開主要車道，清晨的空氣裡只有樹和露水的味道。放下「要跑多快」之後，呼吸自己找到了節奏。',
      },
      {
        type: 'heading',
        content: '下坡，留意膝蓋',
      },
      {
        type: 'paragraph',
        content: '第一段下坡，晨跑員回頭提醒：步幅放小，腳落在身體正下方，膝蓋保持微彎、不要鎖死。下坡容易在不知不覺中累積膝蓋的負擔，這幾句話，後來的每一次下坡我都想起來。',
      },
      {
        type: 'heading',
        content: '上坡，給自己一點強度',
      },
      {
        type: 'paragraph',
        content: '到了上坡，他只說：照自己的能力就好。想挑戰的人可以在這段做幾趟短衝，喘到說不出話，再慢慢走回起點；想慢的人就穩穩地踩。我選了三趟。心跳衝上去的那幾十秒，腦袋是空的，只剩下腿和肺——那種乾淨的快感，很難在跑步機上找到。',
      },
      {
        type: 'heading',
        content: '讓風景接手',
      },
      {
        type: 'image',
        alt: '晨跑引導員與旅客停在山路轉彎處眺望晨霧山稜',
        caption: '轉過最後一個彎，山稜線出現',
        src: '/assets/images/journal/morning-run-ridgeline.jpg',
      },
      {
        type: 'paragraph',
        content: '真正留在記憶裡的，是沿途的風景。轉過最後一個彎，山稜線和早晨的光一起出現，身體的疲累好像被調低了音量。晨跑員放慢腳步，讓大家站一會兒。沒有人說話。',
      },
      {
        type: 'heading',
        content: '回到飯店：酸種、蔬食、一杯淺焙',
      },
      {
        type: 'image',
        alt: '晨跑後的酸種麵包、當季蔬食與淺焙手沖咖啡',
        caption: '跑完後的早餐，明亮的果酸接住身體',
        src: '/assets/images/journal/morning-run-breakfast.jpg',
      },
      {
        type: 'paragraph',
        content: '梳洗完，早餐剛好登場。一片烤得微焦的酸種麵包、幾樣當季蔬食，配一杯手沖淺焙，明亮的果酸正好接住剛跑完的身體。我沒有急著滑手機，只是慢慢吃。',
      },
      {
        type: 'heading',
        content: '半室外露台，開始瑜伽',
      },
      {
        type: 'image',
        alt: '旅客在半室外露台進行跑後腿部伸展與呼吸練習',
        caption: '風從欄杆間穿過，鳥叫聲比任何音樂都適合當背景',
        src: '/assets/images/journal/morning-run-yoga.jpg',
      },
      {
        type: 'paragraph',
        content: '上午的光移到半室外的露台。瑜伽老師請我們從呼吸開始，把剛才用力的大腿和小腿，一節一節地鬆開。風從欄杆間穿過，鳥叫聲比任何音樂都適合當背景。',
      },
      {
        type: 'closing',
        content: '這只是有鬆一日的早晨。接下來，還有午養、昏靜與夜眠。',
      },
    ],
    routeCard: {
      status: '審核中',
      distance: '待探勘',
      elevation: '待探勘',
      surface: '待探勘',
      traffic: '待探勘',
      supply: '待探勘',
      surveyDate: '待探勘',
      guide: '',
    },
    rhythmSchedule: [
      { period: '晨動', content: '引導員帶跑・露台瑜伽', highlight: true },
      { period: '午養', content: '酸種麵包・當季蔬食', highlight: false },
      { period: '昏靜', content: '', highlight: false },
      { period: '夜眠', content: '', highlight: false },
    ],
  },
];

function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug) || null;
}

function getPublishedArticles() {
  return articles.filter(a => a.published);
}

function getAllArticles() {
  return articles;
}

function getFeaturedArticles() {
  return articles.filter(a => a.featured);
}

module.exports = { articles, getArticleBySlug, getPublishedArticles, getAllArticles, getFeaturedArticles };
