# Speed Watch

## Description
SpeedWatch is an automatic speedtest app that users can schedule to run at specified intervals in the background. It then collects information about the user’s internet speed throughout the day and displays the information graphically. This allows users to identify periods of time where their service is slower, so they can determine when their internet is most reliable, while also seeing if there is any foul play from their ISP. 


This project was built in collaboration with:

Aaron Goldsmith [Github](https://github.com/AaronGoldsmith1)
Howard Nguyen [Github](https://github.com/howardnguyen714)
Luis Espinoza [Github](https://github.com/luisaespinoza)


## Technologies Used

* Electron 
* React
* NeDB
* Semantic-UI
* Moment
* React-vis

## Installation Instructions

- `npm install`
- `npm run dev`

## User Stories
* As a user I would like to be able to run a speed test whenever I want with the press of a button
* As a user I would like to be able to see my internet speeds based on the time of the day
* As a user I would like to be able to see data presented to me visually
* As a user I would like to be able to see whether or not my internet speeds are higher or lower than the average in my neighborhood
* As a user I would like to be able to have speed tests run automatically for me in the background
* As a user I would like to know if there is a regular time of day or day of week where my internet speeds are particularly slow
* As a user I would like to know if a particular location or community has weak internet speeds

## Unresolved Problems/Major Hurdles
* Scheduling tasks proved to be a problem for us due to issues related to IPC 
* Graph was not properly rendered with the right x-axes labels; Issues related to integrating React-Vis 

## Future Developments
* Allow users to send in data anonymously to a centralized database for analysis 
* Geospatial analysis of internet speed data; representation and visualization of said data 
* Allow users to schedule background speed tests
* Better visualization of data for users (graphs; overlay toggling of different metrics; data analysis by time, day, week, etc.)