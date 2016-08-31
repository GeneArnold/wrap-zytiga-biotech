require('dotenv').config({silent: true});

var Postmark = require('postmark');
// var client = new Postmark.Client(process.env.POSTMARK_API);
var _ = require('lodash');

var PostmarkClient = function() {
};

PostmarkClient.prototype = _.create(PostmarkClient.prototype, {
  send: function(options, cb) {
    this.parseValues(options);

    var data = {
      'From': this.from,
      'To': this.recipient,
      'Subject': this.subject,
      'TextBody': this.textBody,
      'HtmlBody': this.htmlBody
    };

    client.sendEmail(data, cb);
  },
  sendTemplate: function(options, cb) {
    this.parseValues(options);

    var data = {
      'From': this.from,
      'To': this.recipient,
      'TemplateId': this.templateId,
      'TemplateModel': this.templateData
    };

    client.sendEmailWithTemplate(data, cb);
  },
  sendWithAttachment: function(options, cb) {
    this.parseValues(options);

    var data = {
      'From': this.from,
      'To': this.recipient,
      'Subject': this.subject,
      'TextBody': this.textBody,
      'HtmlBody': this.htmlBody,
      'Attachments': this.attachments
    };

    client.sendEmail(data, cb);
  },
  parseValues: function(options) {
    this.from = options.from || process.env.POSTMARK_FROM;
    this.recipient = options.recipient;
    this.subject = options.subject;
    this.textBody = options.body;
    this.htmlBody = options.htmlBody;
    this.templateId = options.templateId || process.env.POSTMARK_TEMPLATE_ID;
    this.templateData = options.templateData;
    this.attachments = options.attachments || [];
  }
});

module.exports = PostmarkClient;
