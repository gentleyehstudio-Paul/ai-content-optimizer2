const createResourceRouter = require('./resource');

module.exports = createResourceRouter('venues', [
  'name', 'description', 'location', 'address', 'contact',
  'website', 'portaly_url', 'image_url', 'tags', 'featured'
]);
