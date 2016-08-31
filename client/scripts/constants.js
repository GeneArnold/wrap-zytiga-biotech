import _ from 'lodash';

let constants = {
  WRAP_BASE_URL: process.env.WRAP_BASE_URL,
  WRAP_APP_URL: process.env.WRAP_APP_URL,
  WRAP_API_KEY: process.env.WRAP_API_KEY,
  // collectionId: '3f235bd9-345c-4493-a341-2878b2e26222',
  draftWrapId: '4ea6d307-d506-4ab9-9532-6f0ca2e6d072'
};

// Customer rep data
constants = _.extend(constants, {
  repData: {
    customerRepName: 'Victoria',
    customerRepImage: 'http://www.resumeok.com/wp-content/uploads/2012/11/customer-service-representative-job-interview.jpg',
    customerRepNumber: '4155890053'
  }
});

// Add information for client's static cards inside the wrap
const getContent = (customerData) => {
  const customerName = customerData.fullName.split(' ')[0];
  const phoneNumber = `tel:${constants.repData.customerRepNumber.slice(0,3)}-${constants.repData.customerRepNumber.slice(3,6)}-${constants.repData.customerRepNumber.slice(-4)}`;

  const content = [
    { id: '6443c397-f546-4980-b7a7-fe6147d086ab', data: { name: customerName } },
    { id: '4993e407-ca3e-4c5b-94e7-38b60e8729d5', data: { '': '' } },
    { id: 'e1fd533d-44ae-4d1f-9604-918feaad70fe', data: { '': '' } },
    { id: 'c585370a-0055-46d7-85fd-b34859b3a713', data: { '': '' } },
    { id: '982c44a1-cce9-46b0-9a4b-29ecafeb9946', data: { '': '' } },
  ];

  return content;
};

constants = _.extend(constants, {
  getContent: getContent,
  startDynamicCard: 2 // the position where it will start inserting dynamic cards
});

// Add information for client's dynamic cards inside the wrap
const getTopics = (customerData) => {
  // const customerName = customerData.customerName.split(' ')[0];

  return [
    {
      id: 'b51f1440-5d6f-4dda-8afd-c61bc824be09',
      // data: {
      //   name: customerName
      // }
      title: 'High Security',
      image: 'Image1',
      icon: 'Icon1',
      description: 'Micro-segmentation, Secure User Environment, DMZ Anywhere'
    },
    {
      id: '7a135e69-a05a-445e-bdd5-e2fb0528f8d7',
      title: 'Automation',
      image: 'Image2',
      icon: 'Icon2',
      description: 'IT Automating IT, Developer Cloud, Multi-tenant infrastructure'
    },
    {
      id: 'c0c506a3-5bc5-456e-9963-c5f1a0d96841',
      cardIds: [{
        id: 'c0c506a3-5bc5-456e-9963-c5f1a0d96841',
      //   data: {
      //     name: name.customerName
      //   }
      }],
      title: 'Application Continuity',
      image: 'Image3',
      icon: 'Icon3',
      description: 'Disaster Recovery, Data Center Pooling, Cross-Cloud Networking'
    }
  ];
};

constants = _.extend(constants, {
  getTopics: getTopics
});

// Define custom format for forms
constants.formFields = [
  // {
  //   name: 'Hello',
  //   type: 'input', // input|textArea|tel|email
  //   useForText: true, // used to send texts
  //   useForEmail: true, // used to send emails
  //   required: true,
  //   placeholder: 'Placeholder text'
  // },
  {
    name: 'fullName',
    type: 'input', // input|textArea|phoneNumber|email
    required: true,
    placeholder: 'Full Name'
  },
  {
    name: 'mobileNumber',
    type: 'tel',
    useForText: true,
    required: true,
    placeholder: 'Mobile Number'
  },
  {
    name: 'company',
    type: 'input',
    required: false,
    placeholder: 'Company (optional)'
  },
  {
    name: 'email',
    type: 'email',
    useForEmail: true,
    required: false,
    placeholder: 'Email (optional)'
  },
  {
    name: 'title',
    type: 'input',
    required: false,
    placeholder: 'Title (optional)'
  },
  {
    name: 'notes',
    type: 'textArea',
    required: false,
    placeholder: 'Please provide a short description of issues, questions, concerns (optional)'
  }
];


// Custom sms message
constants.customTextMessage = "Here's the wrap information you requested: {{wrap}}";
constants.sendButtonText = "Text Me Information";
constants.mainHeader = "Get more insight on how Guided Selling is transforming networking and security.";
constants.mainSubheader = "Select areas that interest you to get a lightweight custom event wrap sent to your device complete with customer stories, user cases and event details.";

export default constants;
