/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "TARUH APIKEY DISINI",
    },
  })
);

let sendMail = (toId, sub, text) => {
  return transporter.sendMail({
    to: toId,
    from: "TARUH EMAIL YG TERDAFTAR DI SENDGRID DISINI",
    subject: sub,
    html: `<h4>${text}</h4>`,
  });
};

module.exports = { sendMail };
