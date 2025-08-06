# MTM6404 Task Manager – Iteration 5

This is a React single-page application for managing task lists and items. In this iteration, Firebase Firestore replaces localStorage for real-time cloud persistence.

## Features

- Add/delete task lists and tasks
- Tasks include priority and completion status
- Sort by priority, toggle completed items
- Navigation between pages using React Router
- Responsive design for mobile and desktop
- Firebase Firestore used for data persistence
- Context API used for global state

## Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Add your config to `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { /* your config here */ };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { /* your config here */ };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
src/
├── components/      # NavBar, Footer, Card, TaskItem, TaskList
├── context/         # TaskContext (Context API logic)
├── pages/           # Home and TaskListPage
├── firebase.js      # Firebase config
├── App.jsx, main.jsx, styles

Completed Requirements
5+ React components

children prop used

List + conditional rendering

React Router + 2 routes

Add/delete lists and tasks

Sort, toggle, and mark tasks

Persistent storage via Firestore

Responsive layout

Context API for state
