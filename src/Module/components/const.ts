export const HEADER = [
  { text: 'Log', align: 'start', value: 'minute', width: '20%' },
  { text: 'Team Member', align: 'start', value: 'person', width: '40%' },
  { text: 'Timestamp', align: 'start', value: 'timestamp', width: '35%' },
  { text: 'Delete', align: 'center', value: 'delete', sortable: false, width: '5%' }
];

export const items = [
  { minute: '30 minutes', person: 'Derick Lee', timestamp: 'Jul 12 at 8:10pm' },
  { minute: '20 minutes', person: 'Jerold Inocencio', timestamp: 'Jul 12 at 8:10pm' },
  { minute: '10 minutes', person: 'Prajit Saravanan', timestamp: 'Jul 12 at 8:10pm' },
  { minute: '5 minutes', person: 'Akheel Shaik', timestamp: 'Jul 12 at 8:10pm' },
  { minute: '7 minutes', person: 'Eric Reyes', timestamp: 'Jul 12 at 8:10pm' }
];

export const minimumHours = [
  '1 Hour',
  '2 Hours',
  '3 Hours',
  '4 Hours',
  '5 Hours',
  '6 Hours',
  '7 Hours',
  '8 Hours',
  '9 Hours',
  '10 Hours',
  '11 Hours',
  '12 Hours',
  '13 Hours',
  '14 Hours',
  '15 Hours',
  '16 Hours',
  '17 Hours',
  '18 Hours',
  '19 Hours',
  '20 Hours',
  '21 Hours'
];

export const group = ['Setup', 'Project', 'Screening', 'Internship'];
export const required = ['Creator requires this activity', 'Yes', 'No'];
export const lockOrder = ['Creator locked activity group and placement order', 'Yes', 'No'];
export const deliverable = ['Yes', 'No'];
export const notifications = ['Creator turned on by default', 'Turn on', 'Turn off'];
export const accessibility = [
  'Creator has turned off accessibility anytime',
  'Creator has turned on accessibility anytime',
  'Yes',
  'No'
];
export const endEarly = [
  'Creator has not allowed participants to end early after this activity',
  'Creator has allow end early option only at preset order placement',
  'Yes',
  'No'
];
