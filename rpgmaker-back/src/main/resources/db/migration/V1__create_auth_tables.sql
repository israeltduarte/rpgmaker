create table public.ituser
(
    id        varchar(255) not null primary key,
    created   timestamp(6),
    updated   timestamp(6),
    email     varchar(255),
    last_name varchar(255),
    name      varchar(255),
    password  varchar(255),
    username  varchar(255) unique
);

alter table public.ituser
    owner to postgres;

create table public.role
(
    role_name varchar(30)  not null unique constraint role_role_name_check check ((role_name)::text = ANY ((ARRAY ['ROLE_ADMIN'::character varying, 'ROLE_USER'::character varying])::text[])),
    id        varchar(255) not null primary key
);

alter table public.role
    owner to postgres;

create table public.users_roles
(
    role_id varchar(255) not null constraint fkt4v0rrweyk393bdgt107vdx0x references public.role,
    user_id varchar(255) not null constraint fkluvr57lisdbxa7kxykag8bws9 references public.ituser
);

alter table public.users_roles
    owner to postgres;

create table public.item
(
    is_in_stock boolean      not null,
    created     timestamp(6),
    updated     timestamp(6),
    description varchar(255),
    id          varchar(255) not null primary key,
    measurement varchar(255),
    user_id     varchar(255) constraint fk3di31qu7fs2ql5l4fwp6rthpd references public.ituser
);

alter table public.item
    owner to postgres;