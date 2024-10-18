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


This project was created using `bun init` in bun v1.1.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
