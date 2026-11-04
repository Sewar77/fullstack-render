-- 
create table user(
    id, 
    fname, 
    lname, 
    email, 
    role, 
    createdat, 
    updatedat, 
    hashed_password, 
    avatar, 
    phone number, 
    status text NOT NULL DEFAULT 'pending'::text,
    CONSTRAINT sttaus_check CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]))
)

create table categories(
    id serial primary key, 
    name varchar(100) not null unique, 
    description varchar(200), 
    -- created_by integer not null references users(id), 
    created_by integer not null, 
    foreign key (created_by) references users(id),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by integer;
    foreign key (created_by) references users(id),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
)


create table prodcuts (
    id serial primary key, 
    name varchar(100) unique, 
    description varchar(200), 
    price integer, 
    stock integer, 
    image varchar(200), 
    catId integer not null, 
    foreign key (catId) references categories(id),
    created_by integer not null, 
    foreign key (created_by) references users(id),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by integer,
    foreign key (created_by) references users(id),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status text NOT NULL DEFAULT 'pending'::text,
    CONSTRAINT sttaus_check CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]))
)

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "price" numeric(10, 2) NOT NULL,
  "stock" numeric(10, 2) NOT NULL,
  "image" varchar(255),
  "catId" integer NOT NULL REFERENCES "categories" ONDELETE CASCADE,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "createdBy" integer NOT NULL REFERENCES "users" ON DELETE CASCADE,
  "updatedBy" integer REFERENCES "users" ON DELETE CASCADE,
  "status" varchar(20) DEFAULT $pga$pending$pga$ NOT NULL CHECK (status IN ('pending', 'paid', 'cancelled'))
);
INSERT INTO "public"."pgmigrations" (name, run_on) VALUES ('1790510103269_products-table-creation', NOW());





CREATE TABLE "carts" (
  "id" serial PRIMARY KEY,
  "user_id" integer UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "public"."pgmigrations" (name, run_on) VALUES ('1792322014656_cart-table-creation', NOW());


CREATE TABLE "cart_items" (
  "id" serial PRIMARY KEY,
  "cart_id" integer NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  "product_id" integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  "quantity" integer DEFAULT $pga$1$pga$ NOT NULL CHECK (quantity > 0)
);
ALTER TABLE "cart_items"
  ADD CONSTRAINT "unique_cart_product" UNIQUE ("cart_id", "product_id");
INSERT INTO "public"."pgmigrations" (name, run_on) VALUES ('1792322214737_cart-items-table-creation', NOW());



