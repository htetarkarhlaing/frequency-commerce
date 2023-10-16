# Frequency-Commerce

This Inventory Management System is built with the NestJS framework, utilizing Prisma as its ORM and MongoDB as the database. It provides efficient inventory management, order tracking, and user authentication functionalities. With Apollo Server integrated, it enables GraphQL API endpoints for seamless communication between the client and server. The application's modular architecture offers scalability and flexibility while maintaining code clarity.
## Tech Stack

| Scope             | Library                                                               |
| ----------------- | --------------------------------------------------------------------- |
| Core framework    | [Nest Js](https://nestjs.com/) |
| Technology        | [GraphQL](https://docs.nestjs.com/graphql/quick-start)|
| Database  | [MongoDb](https://www.mongodb.com/)         |
| ORM   | [Prisma](https://www.prisma.io/) |


### Features

1. **Auth Service**:
   - User authentication and authorization.
   - User roles and permissions management.

2. **Inventory Service**:
   - Category management for organizing products.
   - Product management including name, image, description, price, and stock.
   - Purchase record management to track product purchases.
   - Stock adjustment record management to track changes in stock.

3. **Order Service**:
   - Order record management to track orders.
   - Order detail management including the product, quantity, and total price.
4. **Realtime Order Tracking Service**:
    - Order record can be track in realtime
    - Multiple Order shipping stage tracker

These are the main features described in the Prisma schema. The schema represents the structure and relationships between entities in the application's data model.
## DB diagram.io

https://dbdiagram.io/d/Frequency-Commerce-636078ce5170fb6441d3b133

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
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@htetarkarhlaing](https://www.github.com/htetarkarhlaing) Full-stack javascript developer

**TBH** 

*I am very new to GraphQL. This is my very first GraphQL project that I have learned and implemented within just three days.*