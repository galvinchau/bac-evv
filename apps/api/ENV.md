# API — ENV & GitHub Secrets

## Local `.env` (apps/api/.env)
~~~ini
DATABASE_URL=postgres://bac_admin:password@localhost:5432/bac_evv
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=bac_evv
DATABASE_USER=bac_admin
DATABASE_PASSWORD=password

NODE_ENV=development
API_PORT=4000

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
S3_BUCKET_EXPORTS=bac-exports-dev

COGNITO_POOL_ID=us-east-1_example
COGNITO_CLIENT_ID=exampleclientid
~~~

> `.env.example` phải được cập nhật song song khi thêm biến mới.

---

## GitHub Actions — Repository Secrets
- ✅ `DATABASE_URL` — set
- ✅ `COGNITO_POOL_ID` — set (placeholder)
- ✅ `COGNITO_CLIENT_ID` — set (placeholder)
- ⏳ `AWS_REGION` — add when enabling S3 (Week 3)
- ⏳ `AWS_ACCESS_KEY_ID` — add when enabling S3 (Week 3)
- ⏳ `AWS_SECRET_ACCESS_KEY` — add when enabling S3 (Week 3)
- ⏳ `S3_BUCKET_EXPORTS` — add when bucket is created (Week 3)

---

## Notes
- Local dev: `pnpm -C apps/api dev` → http://localhost:4000/health
- Migrations: `pnpm -C apps/api run migration:generate`, `migration:run`
- Keep secrets minimal until the feature requires them (avoid surprises on billing).
> CI test
