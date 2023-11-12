# SoundTrack

This project was created as part of the [SmartHack 2023](https://smarthack.asmi.ro/) event. It's goal is to track music playing skills by comparing the user's note accuracy and rhythm to the actual music sheet.

## Page Structure
`Summary` - landing page displaying skill statistics based on the last week of playing and a list of recently played music

`My Music` - page containing list of available 
music sheets

`Song` - page where the user can start a new session
of playing a song and record data

`Stats` - page where the user can view skill 
statistics on a specific song 

## How it Works
The user lands on the /Summary page first, from which he can either go to the list of songs or on a
specific song from the recently played list.
Here, the user can see his improvement (or 
degrading) over time.

On the list of songs, the user can next select one
and start a new session of playing by clicking the 
start buttom. In order to record a correct note, the device needs to receive sound frequencies from 
the user at the right tempo. The received sound 
waves are then compared with the correct 
frequencies. 

At the end of the session, the data are analized 
and saved in the database, and finally displayed all
over the app.

## How to Run
First, clone our repo, then start the server and
try our app. Give the following commands to start the server:

```
cd nodeserver
npm install
npm start
cd ..
npm install
npm start
```
When playing, make sure the devide can hear the song clearly!

## What's Next?
We plan on improving this application by adding more
trackable parameters (such as nuances) and displaying separate statistics based on the parameter of choice.

Another step would be making the tempo customable.

Lastly, more instruments would largen the horizon for the users and help them improve even more.