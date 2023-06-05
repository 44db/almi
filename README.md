## App Structure

Full Stack Web App build with [NextJS](https://nextjs.org/)

It uses [Prisma](https://www.prisma.io/) as an ORM for the model schema and the data manipulation.

### The service tier uses three layers:
- A Service Layer
- A Business Logic Layer
- And a data layer

Due to the nature of the app, service and business layer are combined and live under the path /services.

Data layer lies under the path /data.

### The client tier
- Is build using React (obviously)
- Uses [React Query](https://tanstack.com/query/latest/) for data fetching. In essence it is an asynchronous state management with many handy features.
- It uses (poorly) tailwind for CSS abstraction.


## instructions on how to run the app

-   install dependencies

```bash
npm i
```

-   run prisma scripts

```bash
npx prisma generate
```

-   run the development server

```bash
npm run dev
```

-   open browser
