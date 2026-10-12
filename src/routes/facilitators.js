const createResourceRouter = require('./resource');

module.exports = createResourceRouter('facilitators', [
  'name', 'title', 'bio', 'specialties', 'contact',
  'website', 'portaly_url', 'image_url', 'tags', 'featured',
  'region', 'price_info', 'line_at', 'portaly_category', 'booking_url'
]);
