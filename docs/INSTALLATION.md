### OS Installation

### Database
1. Install Postgresql  
   `$ sudo apt-get install postgresql`

2. Switch to psql client  
   `$ sudo su - postgres`  
   `$ psql`  
   You should get a postgres prompt after this:
   `postgres=#`

3. Create database role  
   `# CREATE ROLE tsdms LOGIN ENCRYPTED PASSWORD '<password>';`  
   *[Replace the password with the one that you want to use. Keep the
   password safe as it would be needed later during software setup]*

4. Create database  
   `# CREATE DATABASE tsdms OWNER tsdms;`

### Software
1. Install curl (needed for downloading node from node repo)  
  `$ sudo apt-get install curl`

2. Add nodejs repo
   `$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -`

3. Install node
   `$ sudo apt-get install -y nodejs`

4. Install build essentials needed for compiling and installing native addons
   `$ sudo apt-get install -y build-essential`

5. Install the software package
   `$ npm install tsdms`

6. 
