# Dev guide
let's get started lol
### Setting up your local
Things that you need to have installed:
- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- [redis](https://redis.io/topics/quickstart)
- [postgres](https://www.postgresql.org/download/)

## Installing dependencies
you need to `yarn install` in the client & server directories.
```
cd client/
yarn install
```
```
cd server/
yarn install
```
## DB setup
### Create postgres db
You will need to set up a database on your local. Call it whatever you like, but you will need to know access details:
- host
- post
- username
- password
- database name

You can follow this [guide](https://www.guru99.com/postgresql-create-database.html).\

### Ormconfig file
Now you want to create a file `ormconfig.json` in the server directory.\
Fill it with your details.
```
{
  "type": "postgres", 
  "host": "localhost", 
  "port": 5432, 
  "username": "peterphanouvong", // CHANGE!
  "password": "", // CHANGE!
  "database": "sprt2", // CHANGE!
  "entities": ["dist/entities/*.js"],
  "migrations": ["dist/migrations/*.js"]
}

```

### Environment variables
Create a `.env` file in the server directory:
```
DATABASE_URL=postgresql://{username}:{password}@localhost:5432/{dbname}
REDIS_URL=127.0.0.1:6379
PORT=4000
SESSION_SECRET=secret
CORS_ORIGIN=http://localhost:3000
TEST_CORS_ORIGIN=https://sprt-test.vercel.app/
```

Create a `.env.local` file in the client directory:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql 
NEXT_PUBLIC_DOMAIN=.localhost:3000
```

### tsconfig file
Create a file called `tsconfig.json` with this stuff
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "experimentalDecorators": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "downlevelIteration": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
  ],
  "exclude": ["node_modules"]
}

```
## Getting things running
### Run frontend
Run all these commands in the client folder.\
To run the Next.js server
```
yarn dev
```

### Run backend
Run all these commands in the client folder.\
To start redis server
```
redis-server start
```
To run the server
```
yarn dev
```
To run the watcher, which recompiles when backend changes are made
```
yarn watch
```

## Troubleshooting common errors
### Backend errors
Probably has to do with:
- redis server not running
- missing orm config files
- missing environment variables 

### Frontend errors
Probably has to do with:
- missing environment variables
