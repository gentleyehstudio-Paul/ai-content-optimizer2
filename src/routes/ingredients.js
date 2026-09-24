const createResourceRouter = require('./resource');

module.exports = createResourceRouter('ingredients', [
  'name', 'description', 'origin', 'season', 'supplier',
  'website', 'portaly_url', 'image_url', 'tags', 'featured'
]);
