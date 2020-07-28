# THE PLATFORM. BACKEND

## Infrastructure

1. [Docker](https://www.docker.com/), [docker-compose](https://docs.docker.com/compose/)
2. [Kafka](https://kafka.apache.org/), [GUI](https://www.kafkatool.com/)
3. [Redis](https://redis.io/), [GUI](https://redisdesktop.com/)
4. [Postgres](https://www.postgresql.org/), [GUI](https://dbeaver.io/)
5. [DB migration (FlyWay)](https://flywaydb.org/)
6. [Tyk](https://tyk.io/)

## Micro Services

1. Auth
-- login, logout, restore password, OTP, JWT tokens;
2. RBAC (TODO)
--- control access;
3. User
-- CRUD;
4. Tracking (TODO)
-- real-time activity tracking. Page views, Searches, Errors etc;
5. Notification (TODO)
-- send to frontend via websocket data to notify about something.
