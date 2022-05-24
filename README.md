# CTA Tracker using React
### Jake Opie

---

### Overview
This project is going to be a web app that tracks a user's selected CTA trains and buses and provides real time data on when they will arrive. Hopefully, this app will be useful to someone, as I am not sure there is a browser-based CTA tracker out right now.

It currently supports the Red, Brown, Blue, and Orange Lines.

---
### Using for Yourself
Check it out at [CTA Train Tracker](https://cta-react-heroku.herokuapp.com/)

It was deployed via Heroku, which threw me for a loop initially, but should make CI/CD really easy. Currently, it just uses local storage to store your stops, so you won't have the same data displayed on different devices. I'll fix this at a later date, but didn't want to deal with database configuration on top of making my API work.

If you see an error message, it is because I ran out of free dyno hours on Heroku. I cannot pay for a server at this time, so the app is down towards the end of every month :(

---
### Technology
The technologies I am using React, Nodejs, the CTA Train Tracker API, Express, and Heroku. Right now, I'm just using Local Storage to store stops, but a login function and cross-platform data sharing could make the user experience more pleasurable. 

I might try out some no-code tools to see what they are like. No-code tools would speed up development, but might also take away from my learning, so I am a little split on this decision.

I am going to implement Express and Node.js to 1) gain expereince with these technologies and 2) to ensure I can hide my API key and clean up my client code. If I could start over, I'd restructure my project, but its not a major issue; just breaking away from what seems to be convention.

---
### Future Plans
First, I want to add support for all CTA Train Lines. Building in an optional notification system might also be valueable.

I might add the CTA Bus Tracker API once I get an MVP up and running. Again, this is subject to change, and I will probably begin working on a Native version before I expand the Web App too much. Making a Native version will help prepare me for my upcoming internship and will work around the notification issue I ran into using Django.

---

Feel free to reach out to me with any questions.
