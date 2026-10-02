const { sendLineNotify } = require('./line');
const { sendEmail } = require('./email');

const TABLE_LABELS = {
  venues: '場地',
  facilitators: '師資',
  herbals: '草本',
  ingredients: '食材',
};

async function notifyNewResource(table, resource) {
  const label = TABLE_LABELS[table] || table;
  const lineMsg = `\n🌿 有鬆島新增${label}：${resource.name}\n${resource.description || ''}`.slice(0, 1000);

  const promises = [];

  promises.push(
    sendLineNotify(lineMsg).catch(err => console.error('Line notify error:', err.message))
  );

  const adminEmail = process.env.SENDGRID_ADMIN_EMAIL;
  if (adminEmail) {
    promises.push(
      sendEmail({
        to: adminEmail,
        subject: `[有鬆島] 新增${label}：${resource.name}`,
        html: `<h2>新增${label}</h2><p><strong>${resource.name}</strong></p><p>${resource.description || ''}</p>`,
      }).catch(err => console.error('Email notify error:', err.message))
    );
  }

  await Promise.allSettled(promises);
}

module.exports = { notifyNewResource };
