Problem Description 

Create a repository on GitHub and write a program in any programming language that will do the following: 

Input : User can input a link to any public GitHub repository

Output :

Your UI should display a table with the following information -

- Total number of open issues

- Number of open issues that were opened in the last 24 hours

- Number of open issues that were opened more than 24 hours ago but less than 7 days ago

- Number of open issues that were opened more than 7 days ago 


Solution Explanation:

1) The project has been implemented using Node.js programming language.
2) This is a Web Scraping application.
3) This is a Node.js application which will HTML scrape information from GitHub's repository page.
4) The technologies used are: NodeJS, ExpressJS, Request and Cheerio.

The file where the node.js code is written is 'main.js'. It contains all the back-end code of accepting user's request(in this case Github's repository link), processing it and sending the necessary information to the 'index.ejs' file. The 'index.ejs' file is in the views folder(EJS is Embedded JavaScript which combines data and a template to produce HTML). The input file where the Github's repository link is given in the index.html file. It is a basic HTMl file.

Instructions of running the application:

The application runs by first typing 'node server.js' in the cmd prompt(windows). Then go to the  the address 'http://127.0.0.1:8081' or 'localhost:8081' in your web browser. The page will direct you to 'http://127.0.0.1:8081/add' or 'localhost:8081/add' link and you will get the required results.

Improvement:
The code could have been improved by using another technology called Web Crawling for better validation of hyperlinks and HTML code.
The data could have been stored using MongoDB.
Other Node.js scraping libraries like: X-ray, yakuza, ineed, Osmosis or noodle could have been used.

Please Scrape responsibly!!