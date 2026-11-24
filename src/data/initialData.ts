import type { Roadmap, Project, Achievement, ResourceItem, InterviewQA } from '../types';

export const INITIAL_ROADMAPS: Roadmap[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    slug: 'web-development',
    description: 'Zero to Job-Ready Software Engineer. Master HTML, CSS, JavaScript, Bootstrap, PHP, Laravel, React, Next.js, Node.js, MongoDB, TypeScript, and Vue.js.',
    icon: 'Code2',
    category: 'Web Development',
    color: 'from-cyan-500 to-blue-600',
    badge: 'Most Popular',
    targetRole: 'Full-Stack Developer',
    levels: [
      { levelNumber: 1, title: 'Module 1 — HTML', description: 'Elements, attributes, semantic structure, forms, accessibility, and SEO.', topicIds: ['mod-html'] },
      { levelNumber: 2, title: 'Module 2 — CSS', description: 'Selectors, Box Model, Flexbox, Grid, animations, and responsive design.', topicIds: ['mod-css'] },
      { levelNumber: 3, title: 'Module 3 — JavaScript', description: 'Variables, DOM manipulation, events, ES6+, async/await, and Fetch API.', topicIds: ['mod-javascript'] },
      { levelNumber: 4, title: 'Module 4 — Bootstrap', description: 'Grid system, components, utilities, responsive layouts, and themes.', topicIds: ['mod-bootstrap'] },
      { levelNumber: 5, title: 'Module 5 — PHP', description: 'Syntax, variables, functions, form handling, and MySQL integration.', topicIds: ['mod-php'] },
      { levelNumber: 6, title: 'Module 6 — Laravel', description: 'MVC architecture, routing, Eloquent ORM, Blade templates, and migrations.', topicIds: ['mod-laravel'] },
      { levelNumber: 7, title: 'Module 7 — React.js', description: 'Components, Props, State, Hooks, React Router, and API fetching.', topicIds: ['mod-react'] },
      { levelNumber: 8, title: 'Module 8 — Next.js', description: 'SSR, SSG, API routes, file-based routing, and deployment.', topicIds: ['mod-nextjs'] },
      { levelNumber: 9, title: 'Module 9 — Node.js', description: 'Runtime, Express.js, REST APIs, middleware, and authentication.', topicIds: ['mod-nodejs'] },
      { levelNumber: 10, title: 'Module 10 — MongoDB', description: 'NoSQL databases, CRUD operations, Mongoose ODM, aggregation, and indexing.', topicIds: ['mod-mongodb'] },
      { levelNumber: 11, title: 'Module 11 — TypeScript', description: 'Static types, interfaces, generics, type guards, and advanced patterns.', topicIds: ['mod-typescript'] },
      { levelNumber: 12, title: 'Module 12 — Vue.js', description: 'Composition API, reactivity, Pinia state management, and Vue Router.', topicIds: ['mod-vuejs'] },
    ],
    nodes: [
      /* ═══════════════════════════════════════════════════════════════
         MODULE 1 — HTML
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-html',
        roadmapId: 'web-dev',
        levelIndex: 0,
        title: 'HTML — Structure of the Web',
        category: 'Frontend',
        iconName: 'Layout',
        description: 'Learn HTML5 elements, attributes, semantic structure, forms, accessibility (ARIA), and SEO best practices.',
        difficulty: 'Beginner',
        estimatedHours: 6,
        prerequisites: [],
        position: { x: 250, y: 80 },
        lessons: [
          {
            id: 'les-html-1',
            topicId: 'mod-html',
            title: 'HTML Foundations & Semantic Structure',
            description: 'Learn document anatomy, semantic elements (<header>, <main>, <article>, <footer>) and forms.',
            durationMinutes: 30,
            objective: 'Build semantic accessible web page layouts using clean HTML tags.',
            contentMarkdown: `
# HTML5: HyperText Markup Language

HTML defines the structural skeleton of web applications.

### Semantic Elements:
- \`<header>\`: Introductory top navigation section.
- \`<main>\`: Dominant main content unique to the document.
- \`<section>\`: Standalone thematic grouping of content.
- \`<article>\`: Self-contained composition (blog post, product card).
- \`<footer>\`: Bottom document footer.
- \`<form>\`: Container for interactive form inputs and submission buttons.

\`\`\`html
<main>
  <h1>Welcome to CodePath</h1>
  <p>Learn web development from zero.</p>
  <button type="button">Start Learning</button>
</main>
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Clean HTML5 Skeleton',
                language: 'html',
                code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Website</title>
</head>
<body>
  <header>
    <h1>Web Developer Roadmap</h1>
  </header>
  <main>
    <p>HTML creates the skeleton of web pages!</p>
  </main>
</body>
</html>`,
                explanation: 'Always include doctype, lang attribute, and proper document structure.'
              }
            ],
            quizzes: [
              {
                id: 'q-html-1',
                type: 'multiple_choice',
                question: 'Which element represents the main unique content area of a document?',
                options: ['<div>', '<header>', '<main>', '<section>'],
                correctAnswer: 2,
                explanation: '<main> defines the primary content area, improving accessibility for screen readers.'
              }
            ],
            challenges: [
              {
                id: 'ch-html-1',
                title: 'Create an Accessible Heading & Paragraph',
                description: 'Write an HTML snippet containing an <h1> tag with text "Hello Developers" and a <p> tag with text "Learning HTML is awesome".',
                instructions: ['Create <h1>Hello Developers</h1>', 'Create <p>Learning HTML is awesome</p>'],
                starterCode: {
                  html: `<!-- Write your HTML here -->`
                },
                language: 'html',
                testCases: [
                  { expectedOutput: '<h1>Hello Developers</h1><p>Learning HTML is awesome</p>', description: 'Must contain correct h1 and p tags' }
                ],
                hints: ['Use <h1> tags for main title and <p> for paragraphs.'],
                xpReward: 50,
                solutionExplanation: '<h1>Hello Developers</h1>\n<p>Learning HTML is awesome</p>'
              }
            ],
            summary: 'HTML structural semantic tags provide accessibility, SEO context, and markup organization.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 2 — CSS
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-css',
        roadmapId: 'web-dev',
        levelIndex: 1,
        title: 'CSS — Styling & Layouts',
        category: 'Frontend',
        iconName: 'Palette',
        description: 'Master CSS selectors, Box Model, Flexbox, Grid, animations, media queries, and responsive design.',
        difficulty: 'Beginner',
        estimatedHours: 8,
        prerequisites: ['mod-html'],
        position: { x: 250, y: 200 },
        lessons: [
          {
            id: 'les-css-1',
            topicId: 'mod-css',
            title: 'CSS Box Model & Flexbox Layouts',
            description: 'Master margins, borders, padding, content box, flex-direction, justify-content, and align-items.',
            durationMinutes: 35,
            objective: 'Build responsive centered multi-column layouts with CSS Flexbox.',
            contentMarkdown: `
# CSS Flexbox Engine

Flexbox makes layout alignment straightforward along horizontal and vertical axes.

### The Box Model:
1. **Content**: The inner dimensions where text and images sit.
2. **Padding**: Transparent area clearing space around content inside border.
3. **Border**: Outer line surrounding padding and content.
4. **Margin**: Transparent area clearing space outside border between elements.

### Flex Container Essentials:
- \`display: flex;\` — Turns element into flex parent.
- \`justify-content: center;\` — Aligns items along main axis (horizontal by default).
- \`align-items: center;\` — Aligns items along cross axis (vertical by default).
- \`flex-direction: row | column;\` — Sets main axis direction.
            `,
            codeExamples: [
              {
                title: 'Centered Flexbox Card Container',
                language: 'css',
                code: `.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #0f172a;
  border-radius: 12px;
}`,
                explanation: 'Flexbox handles dynamic sizing and spatial distribution effortlessly.'
              }
            ],
            quizzes: [
              {
                id: 'q-css-1',
                type: 'multiple_choice',
                question: 'Which property aligns flex items along the main axis?',
                options: ['align-items', 'justify-content', 'text-align', 'float'],
                correctAnswer: 1,
                explanation: 'justify-content controls alignment along the main axis (flex direction).'
              }
            ],
            challenges: [],
            summary: 'Flexbox provides one-dimensional alignment for responsive user interfaces.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 3 — JavaScript
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-javascript',
        roadmapId: 'web-dev',
        levelIndex: 2,
        title: 'JavaScript — Logic & Interactivity',
        category: 'Logic',
        iconName: 'Code',
        description: 'Variables, data types, DOM manipulation, events, ES6+ features, async/await, Promises, and Fetch API.',
        difficulty: 'Intermediate',
        estimatedHours: 14,
        prerequisites: ['mod-css'],
        position: { x: 250, y: 320 },
        lessons: [
          {
            id: 'les-js-1',
            topicId: 'mod-javascript',
            title: 'Variables, Data Types & ES6+ Array Methods',
            description: 'Learn variables, const/let, map(), filter(), reduce(), destructuring, and spread operator.',
            durationMinutes: 40,
            objective: 'Declare variables and transform arrays using functional programming methods.',
            contentMarkdown: `
# JavaScript Fundamentals & Array Methods

Variables are labeled boxes in memory that store values for later use.

### Declaration Keywords:
- \`const\`: Constant variable whose reference cannot be reassigned (preferred default!).
- \`let\`: Variable whose value can change over time.

### Array Transformation Methods:
- \`map()\`: Transforms every item and returns a new array.
- \`filter()\`: Returns items that pass a conditional test.
- \`reduce()\`: Accumulates all elements into a single value.

\`\`\`javascript
const prices = [10, 25, 40, 50];
const discounted = prices.map(p => p * 0.9);
const expensive = prices.filter(p => p >= 30); // [40, 50]
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Filter & Map Chaining',
                language: 'javascript',
                code: `const users = [
  { name: "Alice", active: true, score: 90 },
  { name: "Bob", active: false, score: 40 },
  { name: "Charlie", active: true, score: 85 }
];

const topActiveNames = users
  .filter(user => user.active && user.score > 50)
  .map(user => user.name);

console.log(topActiveNames); // ["Alice", "Charlie"]`,
                explanation: 'Method chaining lets you clean and transform data succinctly.'
              }
            ],
            quizzes: [
              {
                id: 'q-js-1',
                type: 'multiple_choice',
                question: 'Which array method returns a brand new array with transformed elements of the same length?',
                options: ['filter()', 'forEach()', 'map()', 'reduce()'],
                correctAnswer: 2,
                explanation: 'map() invokes a callback function on every item and returns a new array of matching length.'
              }
            ],
            challenges: [
              {
                id: 'ch-js-1',
                title: 'Filter Even Numbers',
                description: 'Write a function `getEvenNumbers(arr)` that accepts an array of integers and returns a new array containing only even numbers.',
                instructions: ['Return arr.filter(n => n % 2 === 0)'],
                starterCode: {
                  js: `function getEvenNumbers(arr) {\n  // Write your code here\n  \n}`
                },
                language: 'javascript',
                testCases: [
                  { input: 'getEvenNumbers([1, 2, 3, 4, 5, 6])', expectedOutput: '[2,4,6]', description: 'Should extract even numbers' }
                ],
                hints: ['Use modulo operator % 2 === 0 inside arr.filter()'],
                xpReward: 75,
                solutionExplanation: 'function getEvenNumbers(arr) { return arr.filter(num => num % 2 === 0); }'
              }
            ],
            summary: 'JavaScript uses variables, functions, and higher-order array methods for data manipulation.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 4 — Bootstrap
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-bootstrap',
        roadmapId: 'web-dev',
        levelIndex: 3,
        title: 'Bootstrap — Rapid UI Development',
        category: 'Frontend',
        iconName: 'Globe',
        description: 'Bootstrap 5 grid system, responsive utilities, pre-built components, navigation bars, modals, and themes.',
        difficulty: 'Beginner',
        estimatedHours: 5,
        prerequisites: ['mod-javascript'],
        position: { x: 250, y: 440 },
        lessons: [
          {
            id: 'les-bootstrap-1',
            topicId: 'mod-bootstrap',
            title: 'Bootstrap Grid System & Components',
            description: 'Learn the 12-column responsive grid, breakpoints, cards, navbars, and modals.',
            durationMinutes: 30,
            objective: 'Build responsive layouts rapidly using Bootstrap classes and components.',
            contentMarkdown: `
# Bootstrap 5 Framework

Bootstrap is a CSS framework that provides pre-built responsive components and a 12-column grid system.

### Grid System:
- Uses \`.container\`, \`.row\`, and \`.col-*\` classes.
- Breakpoints: \`sm\` (576px), \`md\` (768px), \`lg\` (992px), \`xl\` (1200px), \`xxl\` (1400px).
- Columns automatically stack on smaller screens.

### Key Components:
- **Navbar**: Responsive navigation with hamburger toggle.
- **Cards**: Content containers with header, body, and footer.
- **Modals**: Pop-up dialog boxes.
- **Buttons**: Pre-styled with contextual colors (\`.btn-primary\`, \`.btn-danger\`).

\`\`\`html
<div class="container">
  <div class="row">
    <div class="col-md-6">Left Column</div>
    <div class="col-md-6">Right Column</div>
  </div>
</div>
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Responsive Bootstrap Card',
                language: 'html',
                code: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Bootstrap Module</h5>
    <p class="card-text">Learn rapid UI development with Bootstrap 5.</p>
    <a href="#" class="btn btn-primary">Start Learning</a>
  </div>
</div>`,
                explanation: 'Bootstrap cards are versatile content containers with consistent styling.'
              }
            ],
            quizzes: [
              {
                id: 'q-bootstrap-1',
                type: 'multiple_choice',
                question: 'How many columns does the Bootstrap grid system use?',
                options: ['6', '8', '12', '16'],
                correctAnswer: 2,
                explanation: 'Bootstrap uses a 12-column responsive grid that can be divided into various combinations.'
              }
            ],
            challenges: [],
            summary: 'Bootstrap provides pre-built responsive components and a 12-column grid for rapid UI development.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 5 — PHP
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-php',
        roadmapId: 'web-dev',
        levelIndex: 4,
        title: 'PHP — Server-Side Scripting',
        category: 'Backend',
        iconName: 'Terminal',
        description: 'PHP syntax, variables, functions, arrays, form handling, sessions, and MySQL database integration.',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        prerequisites: ['mod-bootstrap'],
        position: { x: 250, y: 560 },
        lessons: [
          {
            id: 'les-php-1',
            topicId: 'mod-php',
            title: 'PHP Fundamentals & Form Handling',
            description: 'Learn PHP syntax, variables, functions, arrays, and processing HTML form submissions.',
            durationMinutes: 35,
            objective: 'Write server-side PHP scripts that process form data and interact with databases.',
            contentMarkdown: `
# PHP: Hypertext Preprocessor

PHP is a server-side scripting language designed for web development. It runs on the server and generates dynamic HTML.

### Core Concepts:
- **Variables**: Prefixed with \`$\` (e.g., \`$name = "CodePath";\`).
- **Functions**: Reusable code blocks (\`function greet($name) { ... }\`).
- **Arrays**: Indexed and associative (\`$colors = ["red", "blue"];\`).
- **Superglobals**: \`$_GET\`, \`$_POST\`, \`$_SESSION\`, \`$_COOKIE\`.

### Form Processing:
\`\`\`php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);
    echo "Welcome, " . $username;
}
?>
\`\`\`
            `,
            codeExamples: [
              {
                title: 'PHP MySQL Database Query',
                language: 'javascript',
                code: `// PHP code for database connection:
// $conn = new mysqli("localhost", "root", "", "mydb");
// $result = $conn->query("SELECT * FROM users");
// while ($row = $result->fetch_assoc()) {
//     echo $row["name"];
// }`,
                explanation: 'PHP connects to MySQL databases using the mysqli extension for CRUD operations.'
              }
            ],
            quizzes: [
              {
                id: 'q-php-1',
                type: 'multiple_choice',
                question: 'Which superglobal is used to collect form data sent with the POST method?',
                options: ['$_GET', '$_POST', '$_REQUEST', '$_SERVER'],
                correctAnswer: 1,
                explanation: '$_POST collects form data from HTTP POST requests, keeping data out of the URL.'
              }
            ],
            challenges: [],
            summary: 'PHP is a server-side language for dynamic web pages, form processing, and database interaction.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 6 — Laravel
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-laravel',
        roadmapId: 'web-dev',
        levelIndex: 5,
        title: 'Laravel — PHP Framework',
        category: 'Backend',
        iconName: 'Server',
        description: 'MVC architecture, Artisan CLI, Eloquent ORM, Blade templates, routing, middleware, and migrations.',
        difficulty: 'Intermediate',
        estimatedHours: 12,
        prerequisites: ['mod-php'],
        position: { x: 250, y: 680 },
        lessons: [
          {
            id: 'les-laravel-1',
            topicId: 'mod-laravel',
            title: 'Laravel MVC Architecture & Eloquent ORM',
            description: 'Learn the MVC pattern, routing, controllers, Blade templates, and Eloquent database queries.',
            durationMinutes: 45,
            objective: 'Build structured Laravel applications using MVC pattern and Eloquent models.',
            contentMarkdown: `
# Laravel: The PHP Framework for Web Artisans

Laravel follows the **MVC (Model-View-Controller)** architectural pattern.

### MVC Components:
- **Model**: Represents database tables using Eloquent ORM.
- **View**: Blade template files that render HTML.
- **Controller**: Handles request logic and returns responses.

### Routing:
\`\`\`php
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
\`\`\`

### Eloquent ORM:
\`\`\`php
// Fetch all active users
$users = User::where('active', true)->orderBy('name')->get();

// Create a new user
User::create(['name' => 'Hanzala', 'email' => 'dev@example.com']);
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Laravel Blade Template',
                language: 'html',
                code: `{{-- resources/views/welcome.blade.php --}}
@extends('layouts.app')

@section('content')
  <h1>{{ $title }}</h1>
  @foreach($users as $user)
    <p>{{ $user->name }} — {{ $user->email }}</p>
  @endforeach
@endsection`,
                explanation: 'Blade templates use directives like @foreach and {{ }} for dynamic content rendering.'
              }
            ],
            quizzes: [
              {
                id: 'q-laravel-1',
                type: 'multiple_choice',
                question: 'What does the "M" in MVC stand for?',
                options: ['Module', 'Model', 'Middleware', 'Migration'],
                correctAnswer: 1,
                explanation: 'Model represents the data layer, typically mapping to database tables using Eloquent ORM.'
              }
            ],
            challenges: [],
            summary: 'Laravel provides MVC structure, Eloquent ORM, Blade templates, and Artisan CLI for PHP development.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 7 — React.js
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-react',
        roadmapId: 'web-dev',
        levelIndex: 6,
        title: 'React.js — Modern UI Library',
        category: 'Frontend',
        iconName: 'Atom',
        description: 'JSX syntax, Functional Components, Props, useState, useEffect, React Router, and API fetching.',
        difficulty: 'Intermediate',
        estimatedHours: 14,
        prerequisites: ['mod-laravel'],
        position: { x: 250, y: 800 },
        lessons: [
          {
            id: 'les-react-1',
            topicId: 'mod-react',
            title: 'React Fundamentals: JSX & useState Hook',
            description: 'Learn component breakdown, JSX syntax rules, state reactivity, and re-rendering.',
            durationMinutes: 45,
            objective: 'Build interactive reactive UI components using React useState.',
            contentMarkdown: `
# React Component Architecture

React allows developers to build user interfaces out of reusable, isolated pieces of UI called **components**.

### Core Concepts:
- **JSX**: JavaScript XML extension allowing HTML-like tags inside JavaScript.
- **Props**: Immutable properties passed down from parent components.
- **useState**: Hook enabling internal component state memory and automatic UI re-renders on change!

\`\`\`jsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Interactive React Component with useState',
                language: 'javascript',
                code: `function UserCard({ name, role }) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
      <button onClick={() => setIsFollowed(!isFollowed)}>
        {isFollowed ? "Following ✓" : "Follow +"}
      </button>
    </div>
  );
}`,
                explanation: 'State changes automatically update DOM without manual querySelectors!'
              }
            ],
            quizzes: [
              {
                id: 'q-react-1',
                type: 'multiple_choice',
                question: 'What happens when you call a state updater function returned by useState?',
                options: [
                  'The browser reloads the web page entirely',
                  'React updates component state memory and schedules a re-render of the component',
                  'The CSS styles are erased from disk',
                  'A backend HTTP request is sent to the server'
                ],
                correctAnswer: 1,
                explanation: 'useState updater function mutates internal memory state and triggers React re-render reconciliation.'
              }
            ],
            challenges: [],
            summary: 'React uses functional components, JSX, props, and hooks for reactive declarative UI.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 8 — Next.js
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-nextjs',
        roadmapId: 'web-dev',
        levelIndex: 7,
        title: 'Next.js — Full-Stack React Framework',
        category: 'Full-Stack',
        iconName: 'Globe',
        description: 'Server-Side Rendering (SSR), Static Site Generation (SSG), API routes, App Router, and deployment.',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        prerequisites: ['mod-react'],
        position: { x: 250, y: 920 },
        lessons: [
          {
            id: 'les-nextjs-1',
            topicId: 'mod-nextjs',
            title: 'Next.js App Router & Server Components',
            description: 'Learn file-based routing, server vs. client components, data fetching, and API routes.',
            durationMinutes: 40,
            objective: 'Build server-rendered React applications with Next.js App Router.',
            contentMarkdown: `
# Next.js: The React Framework for Production

Next.js extends React with server-side rendering, static generation, and full-stack capabilities.

### Key Concepts:
- **App Router**: File-based routing using the \`app/\` directory.
- **Server Components**: Render on the server by default (no client JS shipped).
- **Client Components**: Add \`'use client'\` directive for interactivity.
- **API Routes**: Create backend endpoints in \`app/api/\` directory.

### Rendering Strategies:
- **SSR (Server-Side Rendering)**: HTML generated on every request.
- **SSG (Static Site Generation)**: HTML pre-built at build time.
- **ISR (Incremental Static Regeneration)**: Static pages that revalidate.

\`\`\`jsx
// app/page.tsx (Server Component)
export default async function Home() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  return <PostList posts={posts} />;
}
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Next.js API Route',
                language: 'javascript',
                code: `// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = [{ id: 1, name: 'Hanzala' }];
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ created: body }, { status: 201 });
}`,
                explanation: 'API routes handle server-side logic directly inside your Next.js application.'
              }
            ],
            quizzes: [
              {
                id: 'q-nextjs-1',
                type: 'multiple_choice',
                question: 'Which directive marks a Next.js component as a Client Component?',
                options: ['"use server"', '"use client"', '"use browser"', '"use interactive"'],
                correctAnswer: 1,
                explanation: '"use client" tells Next.js this component needs client-side JavaScript for interactivity.'
              }
            ],
            challenges: [],
            summary: 'Next.js provides SSR, SSG, API routes, and the App Router for production React applications.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 9 — Node.js
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-nodejs',
        roadmapId: 'web-dev',
        levelIndex: 8,
        title: 'Node.js — Backend Runtime & APIs',
        category: 'Backend',
        iconName: 'Server',
        description: 'Node.js runtime, Express.js REST APIs, middleware, CORS, JWT authentication, and file handling.',
        difficulty: 'Intermediate',
        estimatedHours: 12,
        prerequisites: ['mod-nextjs'],
        position: { x: 250, y: 1040 },
        lessons: [
          {
            id: 'les-node-1',
            topicId: 'mod-nodejs',
            title: 'Building RESTful APIs with Express.js',
            description: 'Set up Express server, JSON body parsing, route handlers, status codes, and middleware.',
            durationMinutes: 40,
            objective: 'Build JSON API endpoints serving data for frontend consumption.',
            contentMarkdown: `
# Node.js & Express.js Server Architecture

Node.js runs JavaScript on the backend server outside browser environments.

### Express REST API Endpoint Structure:
- \`app.get('/api/users')\`: Retrieves data collection.
- \`app.post('/api/users')\`: Creates new record from request payload body.
- \`app.put('/api/users/:id')\`: Updates existing record.
- \`app.delete('/api/users/:id')\`: Removes specified record.

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(5000, () => console.log('Server running on port 5000'));
\`\`\`
            `,
            codeExamples: [
              {
                title: 'POST Route Handler with JSON Response',
                language: 'javascript',
                code: `app.post('/api/products', (req, res) => {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price required' });
  }
  const newProduct = { id: Date.now(), title, price };
  res.status(201).json(newProduct);
});`,
                explanation: 'Returns 400 Bad Request if validation fails, or 201 Created on success.'
              }
            ],
            quizzes: [
              {
                id: 'q-node-1',
                type: 'multiple_choice',
                question: 'Which HTTP status code signifies successful resource creation on server?',
                options: ['200 OK', '201 Created', '301 Moved', '404 Not Found'],
                correctAnswer: 1,
                explanation: 'HTTP 201 Created indicates successful processing resulting in a created server resource.'
              }
            ],
            challenges: [],
            summary: 'Express routes handle HTTP verbs to serve JSON APIs for frontend clients.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 10 — MongoDB
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-mongodb',
        roadmapId: 'web-dev',
        levelIndex: 9,
        title: 'MongoDB — NoSQL Database',
        category: 'Backend',
        iconName: 'Database',
        description: 'NoSQL document model, CRUD operations, Mongoose ODM, schema design, aggregation pipelines, and indexing.',
        difficulty: 'Intermediate',
        estimatedHours: 8,
        prerequisites: ['mod-nodejs'],
        position: { x: 250, y: 1160 },
        lessons: [
          {
            id: 'les-mongo-1',
            topicId: 'mod-mongodb',
            title: 'MongoDB CRUD & Mongoose ODM',
            description: 'Learn document-based data storage, CRUD operations, schema definition, and aggregation.',
            durationMinutes: 35,
            objective: 'Design MongoDB collections and perform CRUD operations with Mongoose.',
            contentMarkdown: `
# MongoDB: NoSQL Document Database

MongoDB stores data as flexible JSON-like documents instead of rigid rows and columns.

### CRUD Operations:
- **Create**: \`db.users.insertOne({ name: "Hanzala", role: "developer" })\`
- **Read**: \`db.users.find({ role: "developer" })\`
- **Update**: \`db.users.updateOne({ name: "Hanzala" }, { $set: { level: 5 } })\`
- **Delete**: \`db.users.deleteOne({ name: "Hanzala" })\`

### Mongoose ODM:
\`\`\`javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
\`\`\`
            `,
            codeExamples: [
              {
                title: 'Mongoose CRUD Operations',
                language: 'javascript',
                code: `// Create
const user = await User.create({ name: 'Hanzala', email: 'dev@example.com' });

// Read
const allUsers = await User.find({ role: 'student' }).sort({ name: 1 });

// Update
await User.findByIdAndUpdate(id, { $set: { level: 10 } });

// Delete
await User.findByIdAndDelete(id);`,
                explanation: 'Mongoose provides a clean API for MongoDB operations with schema validation.'
              }
            ],
            quizzes: [
              {
                id: 'q-mongo-1',
                type: 'multiple_choice',
                question: 'What type of database is MongoDB?',
                options: ['Relational (SQL)', 'Document-based (NoSQL)', 'Graph database', 'Key-Value store'],
                correctAnswer: 1,
                explanation: 'MongoDB is a document-based NoSQL database that stores data as JSON-like BSON documents.'
              }
            ],
            challenges: [],
            summary: 'MongoDB stores flexible documents. Mongoose provides schema validation and a clean query API.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 11 — TypeScript
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-typescript',
        roadmapId: 'web-dev',
        levelIndex: 10,
        title: 'TypeScript — Typed JavaScript',
        category: 'Logic',
        iconName: 'Code',
        description: 'Static types, interfaces, generics, type guards, utility types, enums, and advanced patterns.',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        prerequisites: ['mod-mongodb'],
        position: { x: 250, y: 1280 },
        lessons: [
          {
            id: 'les-ts-1',
            topicId: 'mod-typescript',
            title: 'TypeScript Types, Interfaces & Generics',
            description: 'Learn static typing, interfaces, type aliases, generics, and type narrowing.',
            durationMinutes: 40,
            objective: 'Write type-safe code with TypeScript interfaces and generic functions.',
            contentMarkdown: `
# TypeScript: JavaScript with Types

TypeScript adds static type checking to JavaScript, catching errors before runtime.

### Core Type Annotations:
\`\`\`typescript
const name: string = "Hanzala";
const age: number = 25;
const isActive: boolean = true;
const scores: number[] = [90, 85, 95];
\`\`\`

### Interfaces:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
}
\`\`\`

### Generics:
\`\`\`typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNum = getFirst([10, 20, 30]); // number
const firstName = getFirst(["Alice", "Bob"]); // string
\`\`\`
            `,
            codeExamples: [
              {
                title: 'TypeScript Interface with React Props',
                language: 'javascript',
                code: `interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;  // optional
  onClick: () => void;
}

function Card({ title, description, onClick }: CardProps) {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}`,
                explanation: 'TypeScript interfaces define component prop contracts for type safety.'
              }
            ],
            quizzes: [
              {
                id: 'q-ts-1',
                type: 'multiple_choice',
                question: 'What does TypeScript add to JavaScript?',
                options: ['Database queries', 'Static type checking', 'CSS styling', 'Server routing'],
                correctAnswer: 1,
                explanation: 'TypeScript adds static type checking, catching type errors at compile time before runtime.'
              }
            ],
            challenges: [],
            summary: 'TypeScript adds static types, interfaces, and generics for safer, more maintainable code.'
          }
        ]
      },

      /* ═══════════════════════════════════════════════════════════════
         MODULE 12 — Vue.js
         ═══════════════════════════════════════════════════════════════ */
      {
        id: 'mod-vuejs',
        roadmapId: 'web-dev',
        levelIndex: 11,
        title: 'Vue.js — Progressive Framework',
        category: 'Frontend',
        iconName: 'Atom',
        description: 'Composition API, reactivity system, Pinia state management, Vue Router, and component patterns.',
        difficulty: 'Intermediate',
        estimatedHours: 10,
        prerequisites: ['mod-typescript'],
        position: { x: 250, y: 1400 },
        lessons: [
          {
            id: 'les-vue-1',
            topicId: 'mod-vuejs',
            title: 'Vue.js Composition API & Reactivity',
            description: 'Learn ref(), reactive(), computed properties, watchers, and component lifecycle.',
            durationMinutes: 40,
            objective: 'Build reactive UI components using Vue 3 Composition API.',
            contentMarkdown: `
# Vue.js: The Progressive JavaScript Framework

Vue.js is a progressive framework for building user interfaces with a gentle learning curve.

### Composition API:
\`\`\`vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    Count: {{ count }} (Doubled: {{ doubled }})
  </button>
</template>
\`\`\`

### Key Differences from React:
- **Two-way binding**: \`v-model\` for form inputs.
- **Directives**: \`v-if\`, \`v-for\`, \`v-bind\`, \`v-on\`.
- **Single File Components**: Template, script, and style in one \`.vue\` file.
- **Pinia**: Official state management (replacement for Vuex).
            `,
            codeExamples: [
              {
                title: 'Vue Component with Pinia Store',
                language: 'javascript',
                code: `// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubled: (state) => state.count * 2,
  },
  actions: {
    increment() { this.count++; },
  },
});`,
                explanation: 'Pinia provides reactive state management with a simple, intuitive API.'
              }
            ],
            quizzes: [
              {
                id: 'q-vue-1',
                type: 'multiple_choice',
                question: 'Which Vue directive is used for two-way data binding on form inputs?',
                options: ['v-bind', 'v-on', 'v-model', 'v-for'],
                correctAnswer: 2,
                explanation: 'v-model provides two-way data binding, syncing form input values with component data.'
              }
            ],
            challenges: [],
            summary: 'Vue.js offers Composition API, directives, and Pinia for building progressive web applications.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-personal-site',
    title: 'Personal Developer Portfolio Site',
    difficulty: 'Beginner',
    category: 'Frontend',
    estimatedHours: 6,
    description: 'Build a responsive personal developer portfolio showcasing bio, skills, project cards, contact form, and dark mode.',
    technologies: ['HTML5', 'CSS Flexbox/Grid', 'JavaScript', 'Bootstrap'],
    milestones: [
      { id: 'm1', title: 'Navigation & Hero Section', description: 'Create responsive header with logo, nav links, and animated hero headline.', checklist: ['Build navbar with mobile drawer', 'Add headline & social links'] },
      { id: 'm2', title: 'Tech Stack & Projects Grid', description: 'Build grid showcasing project cards with tech tags and live demo/repo buttons.', checklist: ['Create card component with hover effects', 'Add technology badges'] },
      { id: 'm3', title: 'Contact Form & Dark Mode', description: 'Implement interactive contact form with validation and theme toggle.', checklist: ['Add form submit handler', 'Store theme preference in localStorage'] }
    ],
    xpReward: 200
  },
  {
    id: 'proj-weather-app',
    title: 'Interactive Weather Dashboard',
    difficulty: 'Intermediate',
    category: 'Frontend',
    estimatedHours: 8,
    description: 'Build a real-time weather web application fetching weather data from REST APIs with search autocomplete and 5-day forecast.',
    technologies: ['React', 'JavaScript ES6+', 'REST API Fetch', 'Tailwind CSS'],
    milestones: [
      { id: 'm1', title: 'City Search & API Integration', description: 'Fetch current weather metrics (temperature, humidity, wind) from OpenWeatherMap API.', checklist: ['Implement async search fetch', 'Display loading state and error toast'] },
      { id: 'm2', title: '5-Day Forecast & Charts', description: 'Display daily forecast cards and dynamic temperature charts.', checklist: ['Map forecast array to UI cards', 'Format timestamps and weather icons'] }
    ],
    xpReward: 350
  },
  {
    id: 'proj-fullstack-ecommerce',
    title: 'Full-Stack E-Commerce SaaS Platform',
    difficulty: 'Advanced',
    category: 'Full-Stack',
    estimatedHours: 25,
    description: 'Build a production full-stack e-commerce application with product filtering, shopping cart state, JWT user auth, Express backend, and MongoDB database.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
    milestones: [
      { id: 'm1', title: 'Backend REST API & Database Schema', description: 'Create MongoDB collections for users, products, categories, orders.', checklist: ['Design Mongoose schemas', 'Implement Express CRUD routes with JWT auth'] },
      { id: 'm2', title: 'Frontend Storefront & Shopping Cart', description: 'Build product catalog with price filter, cart drawer context, and checkout flow.', checklist: ['Build React cart context', 'Integrate Stripe test payment processing'] }
    ],
    xpReward: 750
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-first-lesson', title: 'First Steps', description: 'Completed your very first lesson!', icon: 'Sparkles', category: 'lesson', xpReward: 50 },
  { id: 'ach-first-challenge', title: 'Code Crusher', description: 'Solved your first automated coding challenge!', icon: 'Code', category: 'challenge', xpReward: 100 },
  { id: 'ach-streak-3', title: 'On Fire 🔥', description: 'Maintained a 3-day continuous learning streak!', icon: 'Flame', category: 'streak', xpReward: 150 },
  { id: 'ach-quiz-master', title: 'Quiz Master', description: 'Scored 100% on 3 consecutive quizzes!', icon: 'Award', category: 'lesson', xpReward: 200 },
  { id: 'ach-first-project', title: 'Creator', description: 'Successfully completed your first real-world project!', icon: 'Rocket', category: 'project', xpReward: 300 }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  { id: 'res-1', title: 'MDN Web Docs — HTML & CSS Reference', category: 'HTML/CSS', type: 'Documentation', description: 'Official authoritative documentation for HTML elements, CSS properties, and web standards.', url: 'https://developer.mozilla.org', tags: ['HTML', 'CSS', 'MDN', 'Web'] },
  { id: 'res-2', title: 'JavaScript.info — Modern JavaScript Tutorial', category: 'JavaScript', type: 'Article', description: 'Deep-dive detailed guide covering JavaScript from fundamentals to advanced object-oriented & async concepts.', url: 'https://javascript.info', tags: ['JavaScript', 'ES6', 'Promises'] },
  { id: 'res-3', title: 'React Official Documentation & Interactive Guide', category: 'React', type: 'Documentation', description: 'The official React docs with interactive code playgrounds and hooks references.', url: 'https://react.dev', tags: ['React', 'JSX', 'Hooks'] },
  { id: 'res-4', title: 'Git Cheat Sheet by GitHub', category: 'Git', type: 'Cheat Sheet', description: 'Quick visual printable cheat sheet of standard Git terminal commands.', url: 'https://education.github.com/git-cheat-sheet-data.pdf', tags: ['Git', 'GitHub', 'CLI'] }
];

export const INITIAL_INTERVIEW_QA: InterviewQA[] = [
  {
    id: 'int-1',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'What is the difference between `==` and `===` operators in JavaScript?',
    answer: '`==` performs abstract type coercion before comparing values (e.g. `5 == "5"` evaluates to true). `===` is strict equality without type coercion; both the type and value must match exactly (e.g. `5 === "5"` evaluates to false). Always use `===` to prevent subtle comparison bugs!',
    codeExample: `console.log(5 == "5");  // true (type coercion)
console.log(5 === "5"); // false (strict type check)`
  },
  {
    id: 'int-2',
    topic: 'React',
    difficulty: 'Intermediate',
    question: 'What is the Virtual DOM and how does React reconciliation work?',
    answer: 'The Virtual DOM is an in-memory lightweight JS object representation of the real browser DOM. When component state changes, React builds a new Virtual DOM tree, performs a diffing algorithm (Reconciliation) against the previous tree, and batch-updates ONLY the exact real DOM nodes that changed, avoiding expensive layout reflows.',
    codeExample: `// State change -> New Virtual DOM -> Diff algorithm -> Minimal Real DOM Update`
  },
  {
    id: 'int-3',
    topic: 'Backend',
    difficulty: 'Intermediate',
    question: 'What are the main HTTP request verbs used in RESTful APIs?',
    answer: 'GET (retrieve resources), POST (create a new resource), PUT/PATCH (update existing resource), and DELETE (remove resource). These map to standard CRUD database operations.',
    codeExample: `GET /api/users      -> Read list of users
POST /api/users     -> Create new user
DELETE /api/users/5 -> Delete user id 5`
  }
];

/* ── Module metadata for the ModulesPage and Home overview ── */
export interface ModuleMeta {
  moduleNumber: number;
  topicId: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  estimatedHours: number;
  difficulty: string;
  tags: string[];
}

export const MODULE_LIST: ModuleMeta[] = [
  { moduleNumber: 1,  topicId: 'mod-html',       title: 'HTML — Structure of the Web',        shortTitle: 'HTML',        description: 'Elements, attributes, semantic tags, forms, and accessibility.',                icon: 'Layout',   color: 'from-orange-500 to-red-500',    accent: 'orange', estimatedHours: 6,  difficulty: 'Beginner',       tags: ['HTML5', 'Semantic', 'Forms'] },
  { moduleNumber: 2,  topicId: 'mod-css',         title: 'CSS — Styling & Layouts',            shortTitle: 'CSS',         description: 'Box Model, Flexbox, Grid, animations, and responsive design.',                 icon: 'Palette',  color: 'from-blue-500 to-cyan-500',     accent: 'cyan',   estimatedHours: 8,  difficulty: 'Beginner',       tags: ['CSS3', 'Flexbox', 'Grid'] },
  { moduleNumber: 3,  topicId: 'mod-javascript',  title: 'JavaScript — Logic & Interactivity', shortTitle: 'JavaScript',  description: 'Variables, DOM, events, ES6+, async/await, and Fetch API.',                     icon: 'Code',     color: 'from-yellow-400 to-amber-500',  accent: 'amber',  estimatedHours: 14, difficulty: 'Intermediate',   tags: ['ES6+', 'DOM', 'Async'] },
  { moduleNumber: 4,  topicId: 'mod-bootstrap',   title: 'Bootstrap — Rapid UI Development',   shortTitle: 'Bootstrap',   description: 'Grid system, components, utilities, and responsive layouts.',                   icon: 'Globe',    color: 'from-purple-500 to-violet-600', accent: 'purple', estimatedHours: 5,  difficulty: 'Beginner',       tags: ['Bootstrap 5', 'Grid', 'Components'] },
  { moduleNumber: 5,  topicId: 'mod-php',         title: 'PHP — Server-Side Scripting',        shortTitle: 'PHP',         description: 'Syntax, functions, form handling, and MySQL integration.',                      icon: 'Terminal', color: 'from-indigo-500 to-blue-600',   accent: 'indigo', estimatedHours: 10, difficulty: 'Intermediate',   tags: ['PHP', 'MySQL', 'Forms'] },
  { moduleNumber: 6,  topicId: 'mod-laravel',     title: 'Laravel — PHP Framework',            shortTitle: 'Laravel',     description: 'MVC architecture, Eloquent ORM, Blade templates, and migrations.',              icon: 'Server',   color: 'from-rose-500 to-red-600',      accent: 'rose',   estimatedHours: 12, difficulty: 'Intermediate',   tags: ['MVC', 'Eloquent', 'Blade'] },
  { moduleNumber: 7,  topicId: 'mod-react',       title: 'React.js — Modern UI Library',       shortTitle: 'React.js',    description: 'Components, Props, State, Hooks, React Router, and API fetching.',              icon: 'Atom',     color: 'from-cyan-400 to-blue-500',     accent: 'cyan',   estimatedHours: 14, difficulty: 'Intermediate',   tags: ['JSX', 'Hooks', 'Router'] },
  { moduleNumber: 8,  topicId: 'mod-nextjs',      title: 'Next.js — Full-Stack React',         shortTitle: 'Next.js',     description: 'SSR, SSG, API routes, App Router, and deployment.',                              icon: 'Globe',    color: 'from-slate-500 to-zinc-700',    accent: 'slate',  estimatedHours: 10, difficulty: 'Intermediate',   tags: ['SSR', 'SSG', 'API Routes'] },
  { moduleNumber: 9,  topicId: 'mod-nodejs',      title: 'Node.js — Backend Runtime & APIs',   shortTitle: 'Node.js',     description: 'Express.js REST APIs, middleware, JWT authentication.',                          icon: 'Server',   color: 'from-green-500 to-emerald-600', accent: 'emerald',estimatedHours: 12, difficulty: 'Intermediate',   tags: ['Express', 'REST', 'JWT'] },
  { moduleNumber: 10, topicId: 'mod-mongodb',     title: 'MongoDB — NoSQL Database',           shortTitle: 'MongoDB',     description: 'Document model, CRUD, Mongoose ODM, and aggregation.',                           icon: 'Database', color: 'from-green-600 to-lime-500',    accent: 'green',  estimatedHours: 8,  difficulty: 'Intermediate',   tags: ['NoSQL', 'Mongoose', 'CRUD'] },
  { moduleNumber: 11, topicId: 'mod-typescript',  title: 'TypeScript — Typed JavaScript',      shortTitle: 'TypeScript',  description: 'Static types, interfaces, generics, and advanced patterns.',                     icon: 'Code',     color: 'from-blue-600 to-indigo-700',   accent: 'blue',   estimatedHours: 10, difficulty: 'Intermediate',   tags: ['Types', 'Interfaces', 'Generics'] },
  { moduleNumber: 12, topicId: 'mod-vuejs',       title: 'Vue.js — Progressive Framework',     shortTitle: 'Vue.js',      description: 'Composition API, reactivity, Pinia state, and Vue Router.',                      icon: 'Atom',     color: 'from-emerald-400 to-teal-500',  accent: 'teal',   estimatedHours: 10, difficulty: 'Intermediate',   tags: ['Composition API', 'Pinia', 'Router'] },
];
