
## Deployment

To deploy this project follow the instruction below

**Step 1.**

```bash
  git clone https://github.com/htetarkarhlaing/frequency-commerce
```

**Step 2.**

```bash
  cd frequency-commerce
```

**Step 3.**

```bash
  npm install
```

**Step 4.**

create **.env** file at the root of the project and copy the required sample data from **.env.example**. Then change the necessary data with your credentials like **database URL** and **JWT Secrets**. After you create the **.env** please run the CMD below to sync the database schema.

```bash
  npx prisma migrate
```

**Step 5.**

Our system need based role and permissions to register the accounts, so please run the seeder to ensure that we have everything we need to start the service.

```bash
  npm run seed
```

**Step 6.**

```bash
  npm run build
```

**Step 6.**

```bash
  npm run start
```

After you start the server, try to open the graphQL playground that is already hosted below

[GraphQL Playground](http://localhost:3000/graphql)

Enjoy your testing.