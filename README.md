## Environment Variables

Use [.env.example](/Users/farzan/projects/movietime/.env.example) as the template for your local `.env` file, then add your TMDB bearer token:

```bash
VITE_TMDB_AUTH_KEY=your_tmdb_bearer_token
```

The `.env.example` file is safe to commit because it only contains the variable name and a placeholder value. Your real `.env` file should stay local and untracked.

This removes the token from the repository, but it does not truly hide it in a browser-only app. Any token used by frontend code can still be inspected in the network tab or bundled source. To actually keep the token secret, move TMDB calls behind a backend or serverless proxy you control.


## Dependencies Utilized

vite: A high speed development environment tailored for contemporary web projects. Used to bootstrap the application quickly.

ant design/icons: A collection of beautifully crafted icons from Ant Design, enhancing the visual appeal of the project. Used to quickly get icons wherever necessary.

axios: A promise based HTTP client for the browser and Node.js, simplifying data fetching and manipulation.

dayjs: A minimalist JavaScript library for handling dates and times, providing a straightforward and efficient API. Used sparingly for date manipulation

lodash: A utility library delivering functions for common programming tasks, promoting code readability and efficiency. Used primarily for convenience functions including debounce.

react:A JavaScript library for building user interfaces, forming the foundation of the project's front end structure.

react dom:The entry point to the React DOM library, facilitating interactions between React and the Document Object Model (DOM).

react modern drawer: A flexible and customizable modern drawer component for React, enhancing the user interface with modern design patterns. Used instead of implementing an entire drawer myself, which could have been done but was unecessarily time consuming.

styled components: A popular CSS in JS library enabling the creation of styled React components with dynamic styles based on JavaScript code. An experiment to see how other CSS in JS libraries stack up, mostly as a learning opportunity.