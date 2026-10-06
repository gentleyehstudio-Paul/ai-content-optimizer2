async function sendLineNotify(message) {
  const token = process.env.LINE_NOTIFY_TOKEN;
  if (!token) {
    console.warn('LINE_NOTIFY_TOKEN not set, skipping Line notification');
    return null;
  }

  const res = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ message }),
  });

  if (!res.ok) {
    throw new Error(`Line Notify failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

module.exports = { sendLineNotify };
