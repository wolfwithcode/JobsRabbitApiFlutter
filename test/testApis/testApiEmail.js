"use strict";
const nodemailer = require("nodemailer");

async function main() {
  
let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'stbhcm', // generated ethereal user
          pass: 'hcm03062017', // generated ethereal password
        },
      });
    
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'stbhcm@gmail.com', // sender address
    to: "wolfwithcode@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

}

main().catch(console.error);
