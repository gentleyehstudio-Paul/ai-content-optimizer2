INSERT INTO venues (name, description, location, address, tags, featured, image_url) VALUES
  ('霧嶺茶室', '隱身於海拔 1200 公尺的霧林帶，一間以台灣老茶為核心的靜心空間。適合小型冥想課程與茶席體驗。', '南投縣鹿谷鄉', '南投縣鹿谷鄉內湖村溪頭路 12 號', '{retreat,tea,meditation}', true, '/assets/images/venue-teahouse.jpg'),
  ('潮間帶療癒基地', '位於東海岸潮間帶旁的開放式空間，結合海風、岩石與聲音療癒，是夏季最受歡迎的場域。', '花蓮縣豐濱鄉', '花蓮縣豐濱鄉石梯坪 8 號', '{ocean,sound-healing,outdoor}', true, '/assets/images/venue-teahouse.jpg'),
  ('老穀倉藝術村', '日治時期穀倉改建的多功能藝術空間，提供瑜伽、繪畫療癒與小型展覽場地。', '台南市後壁區', '台南市後壁區菁寮里 56 號', '{art,yoga,heritage}', false, '/assets/images/venue-teahouse.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO facilitators (name, title, bio, specialties, tags, featured, image_url) VALUES
  ('林靜心', '聲音療癒師', '師承西藏頌缽傳統，結合台灣山林聲景，創作在地化的聲音療癒旅程。十年經驗，服務超過 2000 位個案。', '{sound-healing,singing-bowl,meditation}', '{sound,meditation}', true, '/assets/images/facilitator-sound.jpg'),
  ('陳芳草', '芳療與草本導師', '深耕台灣原生香草研究，開發以本土植物為基底的芳療課程。著有《島嶼的香氣》。', '{aromatherapy,herbal,workshop}', '{herbal,aromatherapy}', true, '/assets/images/facilitator-sound.jpg'),
  ('張柔水', '瑜伽與正念引導師', '融合阿斯坦加與陰瑜伽，在自然場域中帶領身心整合課程。', '{yoga,mindfulness,bodywork}', '{yoga,mindfulness}', false, '/assets/images/facilitator-sound.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO herbals (name, description, origin, usage_notes, tags, featured, image_url) VALUES
  ('台灣土肉桂', '原生於中低海拔闊葉林的珍貴香料植物，葉片具有獨特的肉桂醛香氣，可製茶、入菜、蒸餾精油。', '南投縣信義鄉', '葉片可直接沖泡為茶飲，亦可風乾後研磨為粉末入甜點。精油適合擴香與按摩調配。', '{tea,essential-oil,spice}', true, '/assets/images/herbal-still.jpg'),
  ('月桃', '全株皆可利用的台灣原生薑科植物。葉片包粽、花可入茶、種子為仁丹原料。', '屏東縣牡丹鄉', '鮮葉包裹米飯蒸煮，花苞曬乾沖茶，種子研磨後可製成香料。', '{leaf,flower,seed}', true, '/assets/images/herbal-still.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (name, description, origin, season, tags, featured, image_url) VALUES
  ('日曬友善米', '不使用農藥與化肥，以日曬古法乾燥的台東池上米，口感Q彈帶有陽光香氣。', '台東縣池上鄉', '秋季收成（10-11月）', '{rice,organic,sun-dried}', true, '/assets/images/ingredient-table.jpg'),
  ('野生段木香菇', '以相思木段木栽培的冬菇，肉厚味濃，是養生湯品的靈魂食材。', '新竹縣尖石鄉', '冬季採收（12-2月）', '{mushroom,wild,winter}', true, '/assets/images/ingredient-table.jpg'),
  ('手工柴燒黑糖', '以傳統柴燒大鍋熬煮甘蔗汁，保留完整礦物質與焦糖香氣。', '台南市善化區', '冬季製糖（1-3月）', '{sugar,handmade,traditional}', false, '/assets/images/ingredient-table.jpg')
ON CONFLICT DO NOTHING;
