Easy-Learning
=============

Easy-Learning is a simple but really interesting application for students and professors.
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


# Our landing page
Have a look at our landing page :)

http://mellymello.github.io/

# The app on Heroku

Our application is deployed on heroku !

You can find it at:

https://tweb-easy-learning.herokuapp.com/


#What Works and What does not work

| Features      | Implemented   | is Working ?  |
| ------------- |:-------------:| -------------:|
| uplaod local  | yes           | yes           |
| uplaod Remote | yes           | yes            |
| Create Lecture| yes           | yes           |
| Join Lecture  | yes           | yes          |
| Send chat messages  | yes           | yes           |
| Send feedbacks  | yes           | yes        |
| Follow Prof's Slide (toggle)  | yes           | yes           |
| Authentification  | yes           | yes        |
| Preview        | yes          | yes       |
| Note Save       | yes         | yes       |
| Statistice      | yes         | yes       |


#TODO
* modifiy and delete exisiting lecture
* block size of file
* BUG : When the teacher leaves a lesson the actual page is the last read... so if a student want to re-read the lecture he'll arrive on the last page visited
* BUG : With the current version of mozilla firefox it is not possible to upload a pdf



