create table public.role
(
    id        varchar(255) not null primary key,
    role_name varchar(30)  not null unique
        constraint role_role_name_check check ((role_name)::text = ANY
                                               ((ARRAY ['ROLE_ADMIN'::character varying, 'ROLE_USER'::character varying])::text[]))
);

alter table public.role
    owner to postgres;

create table public.ituser
(
    id        varchar(255) not null primary key,
    name      varchar(255),
    last_name varchar(255),
    email     varchar(255),
    username  varchar(255) unique,
    password  varchar(255),
    updated   timestamp(6),
    created   timestamp(6)
);

alter table public.ituser
    owner to postgres;

create table public.users_roles
(
    user_id varchar(255) not null
        constraint fkluvr57lisdbxa7kxykag8bws9 references public.ituser,
    role_id varchar(255) not null
        constraint fkt4v0rrweyk393bdgt107vdx0x references public.role
);

alter table public.users_roles
    owner to postgres;