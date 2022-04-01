**PGP KEYS DEMO**

> **END-TO-END ENCRYPTION**

**TECH STACKS**

1. **Backend**
   - Objection.js => For Query Builder & Relation Mapping.
   - Database => Postgresql
   - Server => Express.js
   - Language => Javascript
2. **Frontend**
   - React.js

**STEPS:**

1. Navigate to the **root folder** via **Terminal** if you are using **Linux** or **Mac**.

   - Run **make start** to run the project. After that open the brower and go to **http://localhost:9001/**.
   - Run **make test** to run all the test cases.
   - Run make migrateto migrate and seed the data to Postgres Database. All the tables and Data will go in the **Postgres > Public** Schema.

2. If you are on **Windows** then go to the frontend folder run **npm install && npm run build**.
   - Copy the build file and navigate to the backend folder, create folder with the name of **public** and paste the build folder there.
   - Open command prompt and navigate to the backend folder and run **npm run migrate && npm run seed && npm install && npm run start**. After a while message will be consoled saying **"Your application is running at http://localhost:9001/"**
   - Open the browser and go to **http://localhost:9001/**
