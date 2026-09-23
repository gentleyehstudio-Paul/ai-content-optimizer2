const createResourceRouter = require('./resource');

module.exports = createResourceRouter('facilitators', [
  'name', 'title', 'bio', 'specialties', 'contact',
  'website', 'portaly_url', 'image_url', 'tags', 'featured'
]);
