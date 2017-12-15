### Install Guide: What's for Dinner?

1. Clone the repo. Change directory into 'recipefinder' directory.
 
2. Run 'npm install' in the root directory.

3. Install postgreSQL if you do not already have it installed.

4. Run createdb in your command line. Name your db recipe_finder. Set db username and password to match username and password in the .env file provided

5. Save .env file provided in the directory 'server'

6. Change directory to 'server/db'

7. Run 'knex migrate:latest' in the command line.

### To run app:

1. From root directory 'recipefinder' run 'npm run both'

2. In browser go to http://localhost:3000 


