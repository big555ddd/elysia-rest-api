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

This project was created using `bun init` in bun v1.1.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
