export const HEADER = [
  { text: '', align: 'center', value: 'avatar', width: '5%' },
  { text: 'Logged Minutes', align: 'start', value: 'minutes', width: '25%' },
  { text: 'Time', align: 'start', value: 'timestamp', width: '35%' },
  { text: 'Team Member', align: 'start', value: 'name', width: '40%' }
  // { text: 'Delete', align: 'center', value: 'delete', sortable: false, width: '5%' }
];

export const items = [
  { minutes: '30 minutes', firstName: 'Derick Lee', timestamp: 'Jul 12 at 8:10pm' },
  { minutes: '20 minutes', firstName: 'Jerold Inocencio', timestamp: 'Jul 12 at 8:10pm' },
  { minutes: '10 minutes', firstName: 'Prajit Saravanan', timestamp: 'Jul 12 at 8:10pm' },
  { minutes: '5 minutes', firstName: 'Akheel Shaik', timestamp: 'Jul 12 at 8:10pm' },
  { minutes: '7 minutes', firstName: 'Eric Reyes', timestamp: 'Jul 12 at 8:10pm' }
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
