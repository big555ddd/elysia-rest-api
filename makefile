api:
	bun index.ts

migrate-set:
	npx prisma migrate dev --name init

migrate-up:
	npx tsx database/migrations.ts up

migrate-down:
	npx tsx database/migrations.ts down

migrate-refresh:
	npx tsx database/migrations.ts refresh
