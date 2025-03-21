const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = 3000;

const schedule = [
  { name: 'Patryk', date: '2025-03-23', day: 'Niedziela', start: '16:30', end: '18:00' },
];

function getNextPerson() {
  const currentDate = moment().tz('Europe/Warsaw');

  let closestPerson = null;

  for (const person of schedule) {
    const startTime = moment.tz(`${person.date}T${person.start}:00`, 'Europe/Warsaw');
    const endTime = moment.tz(`${person.date}T${person.end}:00`, 'Europe/Warsaw');

    if (currentDate.isBetween(startTime, endTime, null, '[)')) {
      closestPerson = person;
      break;
    }
    if (!closestPerson && currentDate.isBefore(startTime)) {
      closestPerson = person;
    }
  }

  return closestPerson;
}

app.get('/harmonogram', (req, res) => {
  const person = getNextPerson();

  if (person) {
    const formattedResponse = `${person.day} (${moment(person.date).format('DD/MM')}) ${person.name} ${person.start} - ${person.end}`;
    res.send(formattedResponse);
  } else {
    res.send('ni ma :(');
  }
});

app.listen(port, () => {
});
