const createResourceRouter = require('./resource');

module.exports = createResourceRouter('venues', [
  'name', 'description', 'location', 'address', 'contact',
  'website', 'portaly_url', 'image_url', 'tags', 'featured',
  'region', 'price_info', 'line_at', 'portaly_category', 'booking_url',
  'has_mirror', 'has_wooden_floor', 'has_accessibility',
  'has_audio_equipment', 'has_parking', 'has_shower',
  'has_kitchen', 'has_wifi', 'capacity'
]);
