TWEB-Easy-Learning
=============

TWEB-Easy-Learning is a simple but really interesting application for students and professors.
The application provides a new way to follow and give classes. In a more friendly fashion way.

The main goal of the application is to let professors and students interact in an easier way during the class.

What the application offers?

* a professor side view that can be projected on a beamer to give the class
* a student view where students can follow the class and take note, answer questions, answer polls and send live feedback
* an archive side where all information are stored to let users retrieve past informations
* an administrative console to monitor the application

This is only a general description of the application.
To have more details please take a look on the /doc folder

# Install
* Install MongoDB
* Clone the repo (git clone https://github.com/mellymello/TWEB-Project1.git)
* Go in the dir (cd TWEB-Project1)
* Write "bower install"
* Write "npm install"
* Launch the script(.bat) for starting the db (Administrator rights are needed)
* Write "grunt serve" in the terminal and enjoy :D

# Authors : 
 * Calixte Melly
 * Simone Righitto


# The app on Heroku

Our application is deployed on heroku !

You can find it at:

https://tweb-easy-learning.herokuapp.com/

At the moment we have some problems uploading pdf on the herokuapp ! 

No pdf = no way to start follow a lesson / start giving a lesson, so if you want to see the /studentView or /profView that normally will be accessed by clicking on the buttons "follow lesson" / "give a lecture" you have to clone the repo and test locally.

#What Works and What does not work

| Features      | Implemented   | is Working ?  |
| ------------- |:-------------:| -------------:|
| uplaod local  | yes           | yes           |
| uplaod Remote | yes           | no            |
| Create Lecture| yes           | yes (locally)           |
| Join Lecture  | yes           | yes   (locally)          |
| Send chat messages  | yes           | yes (locally)           |
| Send feedbacks  | yes           | yes     (locally)        |
| Follow Prof's Slide (toggle)  | yes           | yes (locally)           |
| Authentification  | yes           | yes     (locally)        |


#TODO
* Auto refresh and remove alert when creating lecture
* Disabled bouton lostStudent to avoid spam
* Enable possibility to remove lost people (a student can go away from the lost students)
* Improve Design
* Implement Upload on S3
* Code review and comment

 



