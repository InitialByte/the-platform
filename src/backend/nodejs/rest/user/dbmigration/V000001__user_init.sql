CREATE SCHEMA IF NOT EXISTS "user";

CREATE TABLE "user".user_list (
  id int4 NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  is_activated bool NOT NULL DEFAULT true,
  is_deleted bool NOT NULL DEFAULT false,
  is_blocked bool NOT NULL DEFAULT false,
  login varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  password_salt varchar(255) NOT NULL,
  CONSTRAINT user_list_pk PRIMARY KEY (id)
);

CREATE TABLE "user".user_info (
  user_id int4 NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(255) NULL,
  full_name varchar(255) NULL,
  CONSTRAINT user_info_pk PRIMARY KEY (email),
  CONSTRAINT user_info_un UNIQUE (phone)
);

ALTER TABLE "user".user_info ADD CONSTRAINT user_info_fk FOREIGN KEY (user_id) REFERENCES "user".user_list(id) ON DELETE CASCADE;

CREATE TABLE "user".user_blocking (
  id int4 NOT NULL,
  user_id int4 NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  blocked_due timestamptz NULL,
  is_permanent bool NOT NULL DEFAULT false,
  reason text NOT NULL,
  blocked_by_user_id int4 NOT NULL,
  CONSTRAINT user_blocking_pk PRIMARY KEY (id)
);

CREATE INDEX user_blocking_user_id_idx ON "user".user_blocking USING btree (user_id);

ALTER TABLE "user".user_blocking ADD CONSTRAINT user_blocking_fk FOREIGN KEY (user_id) REFERENCES "user".user_list(id) ON DELETE CASCADE;
