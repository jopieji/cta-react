# CTA Tracker using React
### Jake Opie

---

### Overview
This project is going to be a web app that tracks a user's selected CTA trains and buses, and provides browser notifications to let the user know when their train or bus is coming. This app will hopefully be useful to someone, as I am not sure there is a browser-based CTA tracker out right now. The browser notifications will be perfect for students, who so often have many many tabs open and might forget to keep an eye on when their bus/train might show up!

---
### Using for Yourself
The app is finally deployed! 

Check it out at [CTA Train Tracker]("https://cta-react-heroku.herokuapp.com/")

It was deployed via Heroku, which threw me for a loop initially, but should make CI/CD really easy. Currently, it just uses local storage to store your stops, so you can't have the same data displayed on different machines. I'll fix this at a later date, but didn't want to deal with database configuration on top of making my API work.



---
### Technology
The technologies I am using React, Nodejs, the CTA Train Tracker API, Express, and maybe MongoDB. I might just use local storage to prevent extra complication, but I will see what is most intuitive.

I might try out some no-code tools to see what they are like. No-code tools would speed up development, but might also take away from my learning, so I am a little split on this decision.

I am going to implement Express and Node.js to 1) gain expereince with these technologies and 2) to ensure I can hide my API key and clean up my client code. If I could start over, I'd restructure my project, but its not a major issue; just breaking away from what seems to be convention.

---
### Future Plans
I might add the CTA Bus Tracker API once I get an MVP up and running. Again, this is subject to change, and I will probably begin working on a Native version before I expand the Web App too much. Making a Native version will help prepare me for my upcoming internship and will work around the notification issue I ran into using Django.

I might use Jotform or Bravo Studio to help make a mobile version of this app. I want to nail down using React before I dive into React Native.

---

Feel free to reach out to me with any questions.
