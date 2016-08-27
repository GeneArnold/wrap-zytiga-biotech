import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';
import _ from 'lodash';

const toUnderscore = function(key) {
  return key.replace(/(?:^|\.?)([A-Z])/g, (x,y) => { 
    return "_" + y.toLowerCase()
  }).replace(/^_/, "");
};

class WrapService extends AngularBaseClass {
  constructor($http, $rootScope, CustomerRepService, SubmissionService) {
    super(arguments);
    this.customerData = {};
    this.repData = CustomerRepService.getCustomerRepInfo();
    this.selectionData = {};
    this.getTopics();

    this.$rootScope.$on('inactive.state', () => {
      this.clearForm();
    });
  }

  getTopics() {
    this.topics = Constants.getTopics(this.customerData);
    return this.topics;    
  }

  updatePersonalForm(scope) {
    this.formCtrl = scope.formCtrl;
    this.scope = scope;
    let form = scope.personalInformation;

    if (form) {
      this.personalForm = form;
      this.customerData = {};

      _.forEach(Constants.formFields, (field) => {
        const selectedField = form[field.name];
        let value = null;

        if (selectedField) {
          if (field.type === 'tel') {
            value = selectedField.$modelValue;
          } else {
            value = selectedField.$viewValue;
          }

          this.customerData[field.name] = value;
        }
      });
    } else {
      this.customerData = {};
    }
  }

  clearForm() {
    if (this.formCtrl) {
      _.forEach(Constants.formFields, (field) => {
        if (this.personalForm[field.name]) {
          this.personalForm[field.name].$modelValue = null;
        }
      });
    }

    if (this.personalForm) {
      this.personalForm.$setPristine();
      this.personalForm.$setUntouched();
    }
    this.selectionData = {};
  }

  updateFormData(customerFormData) {
    this.customerData = customerFormData;
  }

  setFormDirty() {
    if (this.personalForm) {
      this.personalForm.$setDirty();
      this.personalForm.$setSubmitted();
    }
  }

  canSendSMS() {
    const field = _.find(Constants.formFields, (field) => {
      return field.useForEmail;
    });
    let name = null;

    if (field) {
      name = field.name;
    } else {
      return false;
    }

    return this.personalForm &&
           this.personalForm.$valid &&
           this.personalForm[name].$valid &&
           _.keys(this.selectionData).length > 0
  }

  get numberForTexting() {
    const textField = _.find(Constants.formFields, (field) => {
      return field.useForText;
    });

    if (textField) {
      return this.personalForm[textField.name].$modelValue;
    } else {
      return null;
    }
  }

  get emailForEmailing() {
    const textField = _.find(Constants.formFields, (field) => {
      return field.useForEmail;
    });

    if (textField) {
      return this.personalForm[textField.name].$viewValue;
    } else {
      return null;
    }
  }

  canSendEmail() {
    const field = _.find(Constants.formFields, (field) => {
      return field.useForEmail;
    });
    let name = null;

    if (field) {
      name = field.name;
    } else {
      return false;
    }

    return this.personalForm &&
           this.personalForm.$valid &&
           this.personalForm[name].$valid &&
           _.keys(this.selectionData).length > 0
  }

  errorForSMS() {
    if (!this.personalForm) {
      return ['Please fill out the missing', 'information highlighted below.'];
    } else {
      const textField = _.find(Constants.formFields, (field) => {
        return field.useForText;
      });
      const emailField = _.find(Constants.formFields, (field) => {
        return field.useForEmail;
      });

      if (!this.personalForm.$valid) {
        return ['Please fill out the missing', 'information highlighted below.'];
      } else if (!textField) {
        return ['Setup error', 'You didn\' specify phone number field for text.'];
      } else if (!textField || !this.personalForm[textField.name].$valid || this.personalForm[textName].$viewValue === '') {
        return ['Phone number', 'Phone number is missing or not valid.'];
      } else if (!emailField) {
        return ['Setup error', 'You didn\' specify email field for email.'];
      } else if (!emailField || !this.personalForm[emailName].$valid || this.personalForm[emailName].$viewValue === '') {
        return ['Email', 'Email is missing or not valid.'];
      }  else if (_.keys(this.selectionData).length == 0) {
        return ['Missing Areas of Interest.', 'You need to select at least one.'];
      }
    }
  }

  errorForEmail() {
    if (!this.personalForm) {
      return ['Please fill out the missing', 'information highlighted below.'];
    } else {
      const textField = _.find(Constants.formFields, (field) => {
        return field.useForText;
      });
      const emailField = _.find(Constants.formFields, (field) => {
        return field.useForEmail;
      });

      if (!this.personalForm.$valid) {
        return ['Please fill out the missing', 'information highlighted below.'];
      } else if (!textField) {
        return ['Setup error', 'You didn\' specify phone number field for text.'];
      } else if (!textField || !this.personalForm[textField.name].$valid || this.personalForm[textName].$viewValue === '') {
        return ['Phone number', 'Phone number is missing or not valid.'];
      } else if (!emailField) {
        return ['Setup error', 'You didn\' specify email field for email.'];
      } else if (!emailField || !this.personalForm[emailName].$valid || this.personalForm[emailName].$viewValue === '') {
        return ['Email', 'Email is missing or not valid.'];
      }  else if (_.keys(this.selectionData).length == 0) {
        return ['Missing Areas of Interest.', 'You need to select at least one.'];
      }
    }
  }

  toggleTopicSelection(topicSelection) {
    if (this.selectionData[topicSelection.id]) {
      delete this.selectionData[topicSelection.id];
    } else {
      this.selectionData[topicSelection.id] = topicSelection;
    }
  }

  isActiveTopic(topic) {
    return typeof this.selectionData[topic.id] == 'undefined'
  }

  getPersonalizedCards() {
    const values = [];

    _.forEach(this.updateSelectionTopics(), (topic) => {
      if (topic.cardIds) {
        _.forEach(topic.cardIds, (card) => {
          values.push({
            id: card.id,
            data: card.data || {'': ''}
          });        
        });
      } else {
        values.push({
          id: topic.id,
          data: topic.data || {'': ''}
        });        
      }
    });

    return values;
  }

  updateSelectionTopics() {
    this.getTopics();

    _.forEach(this.selectionData, (topic, id) => {
      this.selectionData[id] = _.find(this.topics, {id: id});
    });

    return this.selectionData;
  }

  createPersonalizedWrap() {
    const draftWrapId = Constants.draftWrapId;

    if (Object.keys(this.customerData).length) {
      const content = Constants.getContent(this.customerData);
      const values = this.getPersonalizedCards();
      content.splice.apply(content, [Constants.startDynamicCard, 0].concat(values));

      const createOptions = {
        method: 'POST',
        url: `https://api.wrap.co/api/wraps/${draftWrapId}/personalize/v2`,
        headers: {
          Authorization: `Bearer ${Constants.WRAP_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: { 
          personalized_json: content,
          metadata: {
            submissionData: this.getSubmissionData()
          } 
        }
      };

      return this.$http(createOptions)
        .then(wrap => wrap.data)
        .catch(err => err.message);
    }
  }

  shareWrapViaSMS(wrap) {
    const phoneNumber = this.numberForTexting;  
    const url = `https://api.wrap.co/api/wraps/${wrap.id}/share?type=sms&phone_number=${phoneNumber}`;
    const body = Constants.customTextMessage;
    const shareOptions = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `Bearer ${Constants.WRAP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        body: body
      }
    }

    return this.$http(shareOptions);
  }

  //TODO
  shareWrapViaEmail(wrapId) {

  }

  getSubmissionData() {
    const data = {};
    const temp = _.extend({}, this.customerData, {
      topics: _.map(this.selectionData, "name").join(', ')
    });

    _.forEach(temp, (value, key) => {
      data[toUnderscore(key)] = value;
    });

    return data;
  }

  sendEntry() {
    this.SubmissionService.sendEntry(this.getSubmissionData(), response => {
    });
  }
}

WrapService.$inject = ['$http', '$rootScope', 'CustomerRepService', 'SubmissionService'];
export default WrapService;
