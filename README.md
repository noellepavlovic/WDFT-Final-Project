### Before you begin
1. Install postgreSQL, if you do not already have it installed.
2. Create a postgreSQL database named 'recipe_finder'
3. Set db username and password to match username and password in the .env file provided.


### Install Guide: What's for Dinner?

1. Clone the repository. Change directory into 'recipefinder' directory.
2. Run `npm install` in the root directory.
3. Save .env file provided in the directory 'server'
4. Change directory to 'server/db'
5. Run `knex migrate:latest` in the command line.

### To run app:

1. From the 'recipefinder' directory run `npm run both`
2. In your browser go to: [http://localhost:3000](http://localhost:3000)


