const createResourceRouter = require('./resource');

module.exports = createResourceRouter('herbals', [
  'name', 'description', 'origin', 'usage_notes', 'supplier',
  'website', 'portaly_url', 'image_url', 'tags', 'featured',
  'price_info', 'portaly_category', 'booking_url'
]);
