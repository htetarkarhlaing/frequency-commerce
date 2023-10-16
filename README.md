
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

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@htetarkarhlaing](https://www.github.com/htetarkarhlaing) Full-stack javascript developer

**TBH** 

*I am very new to GraphQL. This is my very first GraphQL project that I have learned and implemented within just three days.*