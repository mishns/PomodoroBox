# Welcome to PomodoroBox 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

## Technologies Used in Project
1. JavaScript
2. TypeScript
3. React
4. Webpack
4. Json server
5. ES Lint
6. React Dom
7. React Router Dom
8. React Hook Form
9. React Query
10. Local Storage
11. Zod

## Figma
https://www.figma.com/design/4gQfoY8SSFlhh8E8zWvkup/Pomodoro?node-id=16-440&t=2JuZPGSE3rvZV2T3-0

## Introduction
The Pomodoro Technique was invented in the late 1980s by Francesco Cirillo, a university student. Like many students overwhelmed with assignments and intense study schedules, Cirillo struggled to complete tasks without feeling burnout.

Believing that any progress is good progress, he challenged himself to just ten minutes of focus. To commit to this challenge, he used a tomato-shaped kitchen timer, and the Pomodoro Technique was born.


## Pomodoro Technique Steps
Here’s the basic step-by-step to start applying the Pomodoro Technique today:

1. Get your to-do list and a timer.

2. Set your timer for 25 minutes, and focus on a single task until the timer rings.

3. When your session ends, mark off one Pomodoro and record what you completed.

4. Then enjoy a five-minute break.

5. After four pomodoros, take a longer, more restorative 15-30 minute break.

6. Reset the timer and start the process again.

## Three Pomodoro Technique rules for maximum productivity

Three Pomodoro Technique rules for maximum productivity
The 25-minute work sprints are the core of the method, but a Pomodoro practice also includes three rules for getting the most out of each interval:

1. Break down complex projects. If a task requires more than four pomodoros, it needs to be divided into smaller, actionable steps. Sticking to this rule will help ensure you make clear progress on your projects.

2. Small tasks go together. Any tasks that will take less than one Pomodoro should be combined with other simple tasks. For example, "write rent check," "set vet appointment," and "read Pomodoro article" could go together in one session.

3. Once a Pomodoro is set, it must ring. The Pomodoro is an indivisible unit of time and can not be broken, especially not to check incoming emails, team chats, or text messages. Any ideas, tasks, or requests that come up should be noted to return to later.

## Application Description
The user can perform the following actions on the site:
1. Work with the list of tasks (add, edit, delete)
The user can schedule several tasks for his day and for each
set the approximate number of “pomodoros” needed to make it. The top task on the list is the current task.
2. Work with the timer (start, stop, pause, skip, add minute)
Once the user is ready, he starts the timer. If he is distracted, the user stops the timer; the “pomodoro” does not count. The user can pause the timer and skip the pomodoro or
break.
3. View timer usage statistics
This page displays app usage statistics and some useful metrics. The user can view the columnar
a chart showing the number of hours he worked with the timer. Can select the week for which he wants to view statistics. User can view some additional metrics such as:

   - Focus (ratio of working time with
    timer to the time spent on
    finished “tomatoes”)

    - Pause time

    - Stop count

## Pages Description
  ### Header
  - Settings page link

  - Dark mode button

  - Statistics page link

  ### Timer page
  - Brief instructions on working with
    application

  - Form for adding tasks

  - List of tasks

  - Timer with control buttons.
  
  ### Statistics page
  - Week statistics bar chart

  - Week selection list

  - Work minutes

  - Pomodoro count

  - Focus

  - Pause time

  - Number of pauses

  ### Settings Page
  - Work timer duration (min)

  - Break timer duration (min)

  - Long break timer duration (min)

  - Work timers until long break

  - Timer is up norifications

  - Reset defaults button

## Rules
1. Navigation from timer page results in pomodoro not counted.
2. Page reload on timer page results in pomodoro not counted.
3. Pause button click results in pomodoro not counted.

## Install

```sh
npm install
```

For prod build:
```sh
npm install -g serve
```

## Usage

Dev mode:
```sh
npm run dev
```
Prod mode:
```sh
npm run duild-prod
npm run start-json-server
npx serve dist
```

## Author
* Github: [@mishns](https://github.com/mishns)
