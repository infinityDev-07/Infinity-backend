const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asifmohammed86154@gmail.com',
    pass: 'PASTE_YOUR_16_CHAR_APP_PASSWORD_HERE' // <-- PASTE HERE
  }
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: `"INFINITY Portfolio" <asifmohammed86154@gmail.com>`,
      to: 'asifmohammed86154@gmail.com',
      subject: `🎮 New Message from ${name}`,
      html: `<div style="font-family:Arial;background:#070a07;color:#fff;padding:20px;border-radius:12px;border:1px solid #22ff66"><h2 style="color:#22ff66">NEW LEAD - INFINITY GAMES</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p></div>`
    });
    await transporter.sendMail({
      from: `"Mohammed Asif" <asifmohammed86154@gmail.com>`,
      to: email,
      subject: 'Thanks for contacting INFINITY GAMES 🎮',
      html: `<p>Hi ${name}, got your message! Will reply soon - Asif</p>`
    });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});
app.get('/', (req,res)=> res.send('Backend Running ✅'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Running on '+PORT));
