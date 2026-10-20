import type { Level, Question, Quiz } from "./types";

// Small helper so each question fits on a few lines
const q = (question: string, options: string[], answer: number, explanation: string): Question => ({
  question,
  options,
  answer,
  explanation,
});

export const quizzes: Quiz[] = [
  // ---------------------------------------------------------------- BEGINNER
  {
    id: "big-picture",
    level: "beginner",
    title: "Next.js: the big picture",
    blurb: "What it is, who makes it and why you'd bother.",
    questions: [
      q(
        "So what actually is Next.js?",
        ["A database for JavaScript apps", "A React framework for building full-stack web apps", "A CSS library", "A replacement for JavaScript"],
        1,
        "Next.js is a framework built on React. It adds routing, server rendering, data fetching, API routes and a load of optimisations on top."
      ),
      q(
        "Which company created and looks after Next.js?",
        ["Meta", "Google", "Vercel", "Microsoft"],
        2,
        "Vercel makes Next.js (and the hosting platform that deploys it in about two clicks). React itself comes from Meta."
      ),
      q(
        "Next.js is built on top of which UI library?",
        ["React", "Vue", "Angular", "jQuery"],
        0,
        "It's React all the way down - every Next.js page and layout is a React component."
      ),
      q(
        "Which of these do you get out of the box with Next.js but not with plain React?",
        ["A built-in SQL database", "Native iPhone apps", "Automatic translation into French", "File-based routing and server-side rendering"],
        3,
        "Plain React is just the UI layer. Next.js gives you routing based on your folders, plus rendering on the server."
      ),
    ],
  },
  {
    id: "pages-routing",
    level: "beginner",
    title: "Pages & routing",
    blurb: "Folders, files and how URLs get made.",
    questions: [
      q(
        "In the App Router, which file makes a route actually show up as a page?",
        ["page.tsx", "index.html", "route.html", "view.tsx"],
        0,
        "A folder only becomes a visitable URL once it has a page.tsx (or .js/.jsx) inside it."
      ),
      q(
        "You want a page at /about. Where does the file go?",
        ["app/page/about.tsx", "routes/about.tsx", "app/about/page.tsx", "app/about.html"],
        2,
        "Folders = URL segments, and page.tsx = the page. So app/about/page.tsx gives you /about."
      ),
      q(
        "What does a folder in brackets like app/(marketing) do?",
        ["Makes the pages private", "Groups routes together without changing the URL", "Creates a dynamic URL segment", "Makes the route optional"],
        1,
        "That's a route group. Handy for organising files or giving a bunch of pages their own layout - (marketing) never appears in the URL."
      ),
      q(
        "What happens with a folder that starts with an underscore, like app/_components?",
        ["It loads before everything else", "It becomes a dynamic route", "Nothing special at all", "It's a private folder and is left out of routing"],
        3,
        "Underscore folders are private - a safe place to keep components and helpers right next to your routes."
      ),
    ],
  },
  {
    id: "layouts-navigation",
    level: "beginner",
    title: "Layouts & navigation",
    blurb: "Shared UI, menus and getting from A to B.",
    questions: [
      q(
        "Which component should you use to link between your own pages?",
        ["<Route> from react-router", "<Link> from next/link", "<Navigate> from next/nav", "<a> from next/anchor"],
        1,
        "<Link> does client-side navigation and prefetches pages in the background, so moving around feels instant."
      ),
      q(
        "What's special about the root layout, app/layout.tsx?",
        ["It's required and must include the <html> and <body> tags", "It's optional and rarely used", "It only shows when there's an error", "It only runs in the browser"],
        0,
        "Every App Router project needs a root layout, and it's where your <html> and <body> live. The menu on this site sits in it."
      ),
      q(
        "You click between two pages that share a layout. What happens to the layout?",
        ["It completely reloads", "It re-downloads all the CSS", "It stays put and keeps its state - only the page swaps", "It gets removed"],
        2,
        "Layouts don't re-render on navigation, which keeps things fast and keeps state (like an open menu) intact."
      ),
      q(
        "Which hook tells a Client Component what the current URL path is?",
        ["useLocation", "useRoute", "window.path", "usePathname"],
        3,
        "usePathname from next/navigation. This site's menu uses it to highlight the page you're on."
      ),
    ],
  },
  {
    id: "styling",
    level: "beginner",
    title: "Styling",
    blurb: "Tailwind, CSS Modules and global styles.",
    questions: [
      q(
        "Which CSS framework does create-next-app offer to set up for you by default?",
        ["Bootstrap", "Tailwind CSS", "Bulma", "Foundation"],
        1,
        "create-next-app asks if you want Tailwind and the default answer is yes. You can still use plain CSS, CSS Modules, Sass and so on."
      ),
      q(
        "What should a CSS Module file be called?",
        ["Button.module.css", "Button.css.module", "module.Button.css", "Button.scss.js"],
        0,
        "The .module.css bit tells Next.js to scope the class names to that component, so they can't clash with others."
      ),
      q(
        "Where do you normally import your global stylesheet?",
        ["In every single component", "In next.config.ts", "In the public folder", "In the root layout (app/layout.tsx)"],
        3,
        "Import globals.css once in the root layout and it applies everywhere."
      ),
      q(
        "In Tailwind, what does className=\"p-4 text-center\" do?",
        ["Makes the text purple and 4px", "Adds padding and centres the text", "Prints the element 4 times", "Nothing - Tailwind needs a config file per class"],
        1,
        "p-4 is padding (1rem) on all sides and text-center... centres the text. Tailwind is lots of tiny classes like this."
      ),
    ],
  },
  {
    id: "images-fonts",
    level: "beginner",
    title: "Images, fonts & static files",
    blurb: "next/image, next/font and the public folder.",
    questions: [
      q(
        "Why use the <Image> component from next/image instead of a plain <img>?",
        ["It makes images black and white", "It's the only way to show a picture", "It automatically resizes, optimises and lazy-loads images", "It stops people downloading your images"],
        2,
        "<Image> serves the right size for each screen, uses modern formats and avoids layout jumps while loading."
      ),
      q(
        "You put logo.png in the public folder. What's its URL?",
        ["/logo.png", "/public/logo.png", "/static/logo.png", "It isn't served at all"],
        0,
        "Everything in public is served from the root of the site, so public/logo.png becomes /logo.png."
      ),
      q(
        "What's the big win with next/font?",
        ["It lets you draw your own fonts", "It self-hosts fonts so the browser never calls Google and the layout doesn't jump", "It translates fonts into other languages", "It makes all text bold"],
        1,
        "Fonts are downloaded at build time and served with your site. This site's Nunito font is loaded that way."
      ),
      q(
        "You want <Image> to show a picture from another website. What do you need to do?",
        ["Nothing, it just works", "Use an iframe instead", "Download it first, always", "Add the domain to images.remotePatterns in next.config"],
        3,
        "For safety, Next.js only optimises remote images from domains you've allowed in next.config."
      ),
    ],
  },
  {
    id: "cli-setup",
    level: "beginner",
    title: "Project setup & the CLI",
    blurb: "Creating, running and building your app.",
    questions: [
      q(
        "Which command creates a brand new Next.js app?",
        ["npm install nextjs-new", "next new my-app", "npx create-next-app@latest", "react-scripts create"],
        2,
        "npx create-next-app@latest (or pnpm create next-app) walks you through the setup questions."
      ),
      q(
        "Which command starts the local development server with hot reloading?",
        ["next dev", "next build", "next start", "next export"],
        0,
        "next dev (usually run as npm run dev / pnpm dev) - save a file and the browser updates straight away."
      ),
      q(
        "What's the usual way to run your app in production?",
        ["next dev then next start", "next build then next start", "next export then next dev", "Just open index.html"],
        1,
        "next build makes an optimised production build, then next start serves it."
      ),
      q(
        "Which folder does next build put its output in?",
        ["dist", "node_modules", "public", ".next"],
        3,
        "Build output goes in .next (and it's in .gitignore, so it never ends up on GitHub)."
      ),
    ],
  },

  // ------------------------------------------------------------ INTERMEDIATE
  {
    id: "server-client",
    level: "intermediate",
    title: "Server vs Client Components",
    blurb: "The bit that confuses everyone at first.",
    questions: [
      q(
        "In the App Router, what are components by default?",
        ["Client Components", "Server Components", "Static HTML files", "Web Workers"],
        1,
        "Everything is a Server Component unless you say otherwise. Less JavaScript gets sent to the browser that way."
      ),
      q(
        "How do you turn a file into a Client Component?",
        ["Put \"use client\" at the top of the file", "Name it something.client.tsx", "Wrap it in <Client>", "Export it as clientComponent"],
        0,
        "The \"use client\" directive marks the boundary - that file and everything it imports runs in the browser too."
      ),
      q(
        "Which of these needs a Client Component?",
        ["Reading from a database", "Using a secret API key", "Rendering some static text", "Using useState or an onClick handler"],
        3,
        "State, effects, event handlers and browser APIs all need the client. Data fetching and secrets are happier on the server."
      ),
      q(
        "Can you pass a Server Component into a Client Component as children?",
        ["No, never", "Only in the Pages Router", "Yes - passed as children or props, it still renders on the server", "Only if you add \"use server\""],
        2,
        "A Client Component can't import a Server Component, but it can receive one as children. Nice trick for wrapping server content in interactive UI."
      ),
    ],
  },
  {
    id: "data-fetching",
    level: "intermediate",
    title: "Data fetching",
    blurb: "Getting data into your pages.",
    questions: [
      q(
        "How do you fetch data in a Server Component?",
        ["Make the component async and await your fetch or database call", "You have to use useEffect", "With getInitialProps", "You can't - only Client Components fetch"],
        0,
        "Server Components can be async functions, so you just await the data. The Stats page on this site does exactly that."
      ),
      q(
        "In the older Pages Router, which function fetched data on every request?",
        ["getStaticProps", "useServerData", "getServerSideProps", "fetchProps"],
        2,
        "getServerSideProps ran on each request; getStaticProps ran at build time. The App Router replaced both with async components."
      ),
      q(
        "In Next.js 15, what happens to fetch() requests by default?",
        ["They're cached forever", "They're cached for 60 seconds", "They're blocked unless you allow them", "They're not cached - you opt in with cache: 'force-cache'"],
        3,
        "Next.js 15 flipped the default from cached to not cached, which surprised a lot of people coming from 14."
      ),
      q(
        "Is it OK to use a secret API key inside a Server Component?",
        ["Yes - server code isn't sent to the browser", "No, everything is visible in the browser", "Only if you base64 it", "Only on Tuesdays"],
        0,
        "Server Component code stays on the server. Just don't prefix the variable with NEXT_PUBLIC_ or it gets bundled for the browser."
      ),
    ],
  },
  {
    id: "dynamic-routes",
    level: "intermediate",
    title: "Dynamic routes",
    blurb: "One file, loads of URLs.",
    questions: [
      q(
        "Which folder structure handles URLs like /blog/hello-world and /blog/my-trip?",
        ["app/blog/*/page.tsx", "app/blog/[slug]/page.tsx", "app/blog/:slug/page.tsx", "app/blog/{slug}/page.tsx"],
        1,
        "Square brackets make a dynamic segment. This site's quizzes use app/test/[testId]/page.tsx."
      ),
      q(
        "What does a folder called [...slug] do?",
        ["Matches only one segment", "Makes the route private", "Catches all the segments after it, like /docs/a/b/c", "Deletes the route"],
        2,
        "That's a catch-all segment. Use [[...slug]] (double brackets) to make it optional too."
      ),
      q(
        "In Next.js 15, how do you read params in a page?",
        ["this.params.slug", "req.query.slug", "useParams() in a Server Component", "params is a Promise, so: const { slug } = await params"],
        3,
        "params became a Promise in Next.js 15, so you await it. Client Components can use the useParams hook instead."
      ),
      q(
        "What does generateStaticParams do?",
        ["Tells Next.js which dynamic paths to pre-render at build time", "Generates random URLs", "Validates form inputs", "Creates database tables"],
        0,
        "Return a list of params and Next.js builds those pages ahead of time. All 18 quizzes here are pre-built that way."
      ),
    ],
  },
  {
    id: "route-handlers",
    level: "intermediate",
    title: "Route handlers (APIs)",
    blurb: "Building your own little API.",
    questions: [
      q(
        "In the App Router, what's the file name for an API endpoint?",
        ["route.ts", "api.ts", "handler.ts", "page.ts"],
        0,
        "route.ts (or .js). This site saves quiz results through app/api/results/route.ts."
      ),
      q(
        "How do you handle a POST request in a route handler?",
        ["Use app.post() like Express", "Export a default function with a switch statement", "Export an async function called POST", "Add an onPost prop"],
        2,
        "You export a function named after the HTTP method: GET, POST, PUT, PATCH, DELETE and so on."
      ),
      q(
        "Can route.ts and page.tsx live in the same folder?",
        ["Yes, no problem", "No - they'd clash over the same URL", "Only if the page is a Client Component", "Only in production"],
        1,
        "A URL can be a page or an API endpoint, not both. That's why APIs usually live under app/api/."
      ),
      q(
        "How do you read a JSON body inside a route handler?",
        ["request.body.json", "JSON.parse(request)", "useBody()", "await request.json()"],
        3,
        "Route handlers use the standard web Request object, so await request.json() does the job."
      ),
    ],
  },
  {
    id: "loading-errors",
    level: "intermediate",
    title: "Loading, errors & not-found",
    blurb: "When things are slow or go wrong.",
    questions: [
      q(
        "What does a loading.tsx file do?",
        ["Shows instant loading UI while that route segment loads", "Preloads every image", "Makes the page load slower on purpose", "Logs loading times"],
        0,
        "Next.js wraps the page in a React Suspense boundary and shows loading.tsx until the content is ready."
      ),
      q(
        "What must an error.tsx file be?",
        ["A Server Component", "A route handler", "A Client Component (\"use client\")", "A JSON file"],
        2,
        "Error boundaries need to run in the browser so they can catch errors and offer a reset button."
      ),
      q(
        "What happens when you call notFound() from next/navigation?",
        ["The server crashes", "The nearest not-found.tsx is shown with a 404", "It redirects to the home page", "Nothing in production"],
        1,
        "Try visiting a made-up quiz URL on this site to see the custom 404 page."
      ),
      q(
        "Which function sends the user to another page from a Server Component?",
        ["window.location", "router.go()", "res.redirect()", "redirect() from next/navigation"],
        3,
        "redirect('/login') works in Server Components, Server Actions and route handlers."
      ),
    ],
  },
  {
    id: "metadata-seo",
    level: "intermediate",
    title: "Metadata & SEO",
    blurb: "Titles, descriptions and keeping Google happy.",
    questions: [
      q(
        "How do you set a fixed title for a page?",
        ["Put a <title> in every component", "export const metadata = { title: 'My page' }", "Edit next.config.ts", "Use document.title in useEffect"],
        1,
        "Export a metadata object from a page or layout and Next.js builds the <head> for you."
      ),
      q(
        "How do you make metadata that depends on dynamic data, like a blog post title?",
        ["export async function generateMetadata()", "export const dynamicMetadata", "useMetadata() hook", "You can't"],
        0,
        "generateMetadata gets the params and can fetch data. Each quiz page here uses it to set its own title."
      ),
      q(
        "Can you export metadata from a Client Component?",
        ["Yes, anywhere", "Only in development", "Only if it's a layout", "No - only from Server Components"],
        3,
        "Metadata is a server thing. Keep your page as a Server Component and push the interactive bits down into Client Components."
      ),
      q(
        "A layout sets title: { template: '%s | Will\\'s Site' }. What does that do?",
        ["Shows a literal %s in the tab", "Breaks the build", "Child page titles get dropped into the %s", "Only works for the home page"],
        2,
        "So a page with title 'Stats' shows up as 'Stats | Will's Site'. Look at your browser tab right now!"
      ),
    ],
  },

  // ---------------------------------------------------------------- ADVANCED
  {
    id: "caching",
    level: "advanced",
    title: "Caching & revalidation",
    blurb: "Fast pages that still stay fresh.",
    questions: [
      q(
        "What does revalidatePath('/blog') do?",
        ["Deletes the /blog page", "Clears the cached data for /blog so the next visit gets fresh content", "Checks /blog for broken links", "Redirects to /blog"],
        1,
        "Handy after a Server Action changes data - call revalidatePath and the page is regenerated on the next request."
      ),
      q(
        "What does fetch(url, { next: { revalidate: 3600 } }) mean?",
        ["Cache the response and refresh it at most once an hour", "Retry the request 3600 times", "Wait an hour before fetching", "Time out after 3600ms"],
        0,
        "Time-based revalidation: serve the cached copy, and refresh it in the background once it's over an hour old."
      ),
      q(
        "revalidateTag('posts') works together with what?",
        ["A <meta> tag", "An HTML data-tag attribute", "A git tag", "fetch(url, { next: { tags: ['posts'] } })"],
        3,
        "Tag your fetches, then invalidate everything with that tag in one go - perfect when one change affects several pages."
      ),
      q(
        "What does ISR stand for?",
        ["Internal Server Routing", "Isolated Script Rendering", "Incremental Static Regeneration", "Instant Style Reload"],
        2,
        "Static pages that can be rebuilt in the background after deploy, without rebuilding the whole site."
      ),
    ],
  },
  {
    id: "server-actions",
    level: "advanced",
    title: "Server Actions",
    blurb: "Calling server code straight from a form.",
    questions: [
      q(
        "What's a Server Action?",
        ["An async function marked \"use server\" that runs on the server and can be called from forms or client code", "A cron job", "A type of middleware", "A Vercel-only feature"],
        0,
        "Server Actions let you skip writing an API route for simple mutations like submitting a form."
      ),
      q(
        "How do you hook a Server Action up to a form?",
        ["<form onSubmit={myAction}>", "<form action={myAction}>", "<form server={myAction}>", "<form method=\"ACTION\">"],
        1,
        "Pass it to the action prop. It even works before the JavaScript has loaded (progressive enhancement)."
      ),
      q(
        "Which React hook lets a button inside a form know the form is submitting?",
        ["useState", "useEffect", "useFormStatus", "useSubmit"],
        2,
        "useFormStatus (from react-dom) gives you pending, so you can show 'Saving...' or disable the button. useActionState is its handy cousin."
      ),
      q(
        "Should you check auth and validate input inside a Server Action?",
        ["No, they're private", "Only in development", "No, Next.js does it for you", "Yes - they're public endpoints that anyone could call"],
        3,
        "Under the hood a Server Action is an HTTP endpoint. Treat its inputs like any other user input."
      ),
    ],
  },
  {
    id: "rendering",
    level: "advanced",
    title: "Rendering strategies",
    blurb: "Static, dynamic and streaming.",
    questions: [
      q(
        "What does static rendering mean?",
        ["The page is rendered at build time (or on revalidation) and served from cache", "The page never changes, ever", "The page has no JavaScript", "The page is rendered in the browser"],
        0,
        "Static pages are super fast because the HTML is already made. This site's About page is static."
      ),
      q(
        "What happens when a page uses cookies() or headers()?",
        ["The build fails", "It becomes dynamically rendered at request time", "Nothing", "It switches to client-side rendering"],
        1,
        "Those depend on the incoming request, so Next.js can't pre-build the page - it renders per request instead."
      ),
      q(
        "What does streaming with <Suspense> give you?",
        ["Video playback", "Smaller images", "Parts of the page are sent as they're ready, with a fallback for the slow bits", "Automatic retries"],
        2,
        "The fast parts of the page appear straight away and the slow data pops in when it lands."
      ),
      q(
        "What does export const dynamic = 'force-dynamic' do?",
        ["Makes animations dynamic", "Forces static rendering", "Enables Turbopack", "Forces the route to render on every request"],
        3,
        "The Stats page uses this so the charts always show the latest results."
      ),
    ],
  },
  {
    id: "middleware",
    level: "advanced",
    title: "Middleware",
    blurb: "Code that runs before your pages do.",
    questions: [
      q(
        "When does middleware run?",
        ["After the page has rendered", "Before a request completes, so it can redirect, rewrite or set headers", "Only at build time", "Only in the browser"],
        1,
        "It sits in front of your routes. Note: Next.js 16 renamed the file from middleware.ts to proxy.ts - same idea."
      ),
      q(
        "Where does the middleware file live?",
        ["At the project root (or in src/) - one per project", "In every route folder", "In the public folder", "Inside node_modules"],
        0,
        "Just one file at the top level. Use if-statements or the matcher to handle different paths."
      ),
      q(
        "What's export const config = { matcher: [...] } for?",
        ["Matching CSS classes", "Matching database rows", "Pairing up tests", "Limiting which paths the middleware runs on"],
        3,
        "Without a matcher it runs on every request - including images and static files, which you usually don't want."
      ),
      q(
        "Which is a good job for middleware?",
        ["Running heavy database queries", "Compressing images", "Redirecting logged-out users away from /dashboard", "Rendering the whole page"],
        2,
        "Middleware should be quick: auth checks, redirects, rewrites, headers and A/B testing."
      ),
    ],
  },
  {
    id: "advanced-routing",
    level: "advanced",
    title: "Parallel & intercepting routes",
    blurb: "The clever routing tricks.",
    questions: [
      q(
        "What's a folder starting with @, like app/@analytics?",
        ["A private folder", "A slot for parallel routes, rendered alongside other slots in the same layout", "An email route", "A dynamic segment"],
        1,
        "Slots get passed to the layout as props, so you can show several independent pages side by side, like a dashboard."
      ),
      q(
        "What does a folder called (.)photo do?",
        ["Intercepts a route at the same level - e.g. show the photo in a modal while the URL changes", "Hides the folder", "Groups routes", "Makes the photo route optional"],
        0,
        "Intercepting routes use (.), (..) and (...) a bit like relative file paths."
      ),
      q(
        "In parallel routes, what's default.tsx for?",
        ["The default page title", "The default CSS", "A fallback for a slot when Next.js can't work out what it should show on a full page load", "The home page"],
        2,
        "After a hard refresh Next.js may not know a slot's active state, so it falls back to default.tsx (or a 404 if there isn't one)."
      ),
      q(
        "What's the classic example of using parallel + intercepting routes together?",
        ["A login form", "A footer", "A 404 page", "Opening a photo in a modal that also has its own shareable URL"],
        3,
        "Click a photo: modal. Refresh or share the link: full photo page. Instagram-style."
      ),
    ],
  },
  {
    id: "deploy-performance",
    level: "advanced",
    title: "Deploying & performance",
    blurb: "Getting it live and keeping it quick.",
    questions: [
      q(
        "Environment variables you want available in the browser must start with...?",
        ["PUBLIC_", "REACT_APP_", "NEXT_PUBLIC_", "BROWSER_"],
        2,
        "Only NEXT_PUBLIC_ variables get bundled into client code. Everything else (like DATABASE_URL here) stays on the server."
      ),
      q(
        "What does output: 'standalone' in next.config do?",
        ["Builds a minimal self-contained server folder - great for Docker", "Removes all CSS", "Turns the site into a mobile app", "Disables the server"],
        0,
        "It copies only the files and node_modules you actually need, so container images stay small."
      ),
      q(
        "How do you lazy-load a heavy Client Component, like a big chart?",
        ["import heavy from 'lazy'", "next/dynamic: dynamic(() => import('./Chart'))", "Add loading=\"lazy\" to the component", "You can't"],
        1,
        "next/dynamic splits the component into its own chunk and only loads it when it's needed."
      ),
      q(
        "What is Turbopack?",
        ["A CSS framework", "A database", "A hosting company", "A Rust-based bundler that makes next dev (and builds) much faster"],
        3,
        "It's the successor to webpack in Next.js - written in Rust and very quick to refresh."
      ),
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export function quizzesByLevel(level: Level): Quiz[] {
  return quizzes.filter((quiz) => quiz.level === level);
}

export const levelInfo: Record<Level, { label: string; emoji: string; tagline: string; colour: string }> = {
  beginner: {
    label: "Beginner",
    emoji: "🌱",
    tagline: "Just getting going? Start here.",
    colour: "#16a34a",
  },
  intermediate: {
    label: "Intermediate",
    emoji: "🏃",
    tagline: "Got the basics? Let's pick up the pace.",
    colour: "#d97706",
  },
  advanced: {
    label: "Advanced",
    emoji: "🏔️",
    tagline: "The hilly route. Good luck!",
    colour: "#7c3aed",
  },
};
