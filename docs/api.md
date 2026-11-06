# Local API contract

Owner: API maintainer. The public static website does not call this service.
Do not expose/deploy the scaffold as part of the current website release.

Start with `npm run dev:api`; it binds to `127.0.0.1:4000`.
`GET /health` returns HTTP 200 JSON:

```json
{"status":"ok","service":"dsai-conference-api"}
```

This is liveness only: no database readiness/authentication is implemented.
Other routes are not part of a supported application contract. No OpenAPI/Swagger endpoint is claimed.
Import `postman/local-health.postman_collection.json` for a read-only local check; it contains no credentials.
When introducing a real API, define OpenAPI, auth/roles, environment/CORS and request/response/error contracts,
then add integration tests before connecting the frontend or deploying the service.
