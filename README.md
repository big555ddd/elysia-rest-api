# elysia-project

To install dependencies:

```bash
bun install
```

To run:

```bash
bun index.ts
```

To migrate set:

```bash
npx prisma migrate dev --name init
```

To migrate up:

```bash
npx tsx database/migrations.ts up
```

To migrate down:

```bash
npx tsx database/migrations.ts down
```

To migrate refresh:

```bash
npx tsx database/migrations.ts refresh
```

To create a new set of permissions, please first update the permission list template. Once the template is updated, remove all existing permissions from the database. Afterward, use the permission/create function to reinitialize permissions based on the updated template. This process ensures that the permission data aligns with the predefined structure.

In the route configuration, there are three types of routes as examples. The first type is a standard route that does not utilize any middleware. This is a straightforward setup for routes that do not require additional processing or access control.

The second type consists of grouped routes, allowing for organized route management, though these routes still do not apply any middleware. Grouping routes in this manner can help with maintaining structure and readability, especially when dealing with multiple related endpoints.

Finally, the third type involves routes that apply both JWT middleware and permission middleware. This configuration adds layers of security by ensuring that only authenticated users, verified through JWT, can access these routes, and further restricts access based on specific permission levels defined in the middleware.

This project was created using `bun init` in bun v1.1.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
