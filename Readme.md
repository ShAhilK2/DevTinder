<!-- Dev Tinder App -->

Developer Community

Waterfall Model (SDLC) Software Development Life Cycle

Requirements => (P M ) Project Manager
1.Design => Senior Engineer or (EM) Engineer Manager
2.Development => SDE1,SDE2
3.Testing => SDET Software Development Engineer Testing
4.Deployment => Developer,DevOps
5.Maintainance => Build More Features

<!-- Monolith vs Microservices -->

Monolith means One Big Single Project
Backend
DB Connections
Frontend
Auth
Emails
Analytics

MicroServices means Small Projects Separated by Individual
Example Fare in Uber Detection ,Fraud Detection,Mananging Only Invoices and Biling,etc

Development Speed is more in Microservice than monolith.
Code Repository : Single in Monolith and Multiple in Micro-Service.
Scalaibilty : Monolith is Difficult than Microservice scability is easily by individual service.
deployment : Tuff in Monolith but microservice is easy : Mismatched is Problematic in microservice. Small Changes easily doable.
Tech Stack : In Monolith Fixed Tech stack. Not in MicroService
Infrastructure Cost : Lower in Monolith and Higher in MicroService
Complexity : Complexity Increase in Monolith than MicroService
Faulty Isolation : Crash More in Monolith than Microservice
Test Case : In Monolith End end is hard in MicroService than Monolith.
Ownership : Different take teams
Maintainance : easy in microservice
Rewamps :  
Debugging : Blame Game ,
DEv Experiences :

Two Microservices in Dev Tinder :
Backend
Frontend
Communicate via API

<!-- Gathering the Information /Requirements -->

1.Create an account
2.Login
3.Update Your Profile
4.Feed Page - Explore
5.Send Connection Requests
6.See our Matches
7.See the Request we have sent /received
8.Update Your Profile

<!-- Tech Planing -->

Two Microservices
1.Frontend
2.Backend - NodeJs, MongoDb

<!-- LLD : Low Level Design  -->

<!-- Collections in Databases  -->

1.Users  
firstName,lastName,emailId,password,age,gender

2.ConnectionRequest
fromUserId
toUserId
status = pending

There is 4 state
after pending then accepted or rejected
ignored

<!-- Api Design  -->

RestApi

GET : TO GET DATA
POST : TO SEND THE DATA
PUT : UPDATE THE DATA
PATCH : partially Update the Data
DELETE : DELETE THE DATA

<!-- Api we need -->

CRUD : CREATE READ UPDATE AND DELETE
POST : /signup
POST : /login
GET : /profile
POST : /profile
PATCH : /profile
POST : /sendRequest => ignore || interested
POST : /reviewRequest => accept || reject
GET : /requests
GET : /connections

Order of the Routes Matter a Lot

get("/ab?c") // b is optional
get("/a(bd)?c") //bd is optional
get("/ab+c") //abc abbc abbbbbbc match the pattern
get("/ab \* cd") / / abcd abdbkjdfjfkcd start with ab and end with cd

get("/a/")
get("/.*fly/")
