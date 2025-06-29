const sendReminderEmail = async (email, name, userId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const unsubscribeUrl = `https://your-domain.com/unsubscribe/${userId}`;

  const mailOptions = {
    from: `"MindSpace" <${process.env.EMAIL}>`,
    to: email,
    subject: "We Missed You on MindSpace 💙",
    html: `
      <h2>Hi ${name || "there"},</h2>
      <p>We noticed you haven't journaled in the last week.</p>
      <p>Journaling just once can boost your mental wellness.</p>
      <p><strong>Take 2 minutes today</strong> to reflect on your week 😊</p>
      <hr/>
      <p style="font-size: 12px;">Don't want reminders? <a href="${unsubscribeUrl}">Unsubscribe here</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
