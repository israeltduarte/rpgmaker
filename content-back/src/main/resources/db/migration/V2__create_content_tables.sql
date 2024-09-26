create table public.itcharacter
(
    id      varchar(255) not null primary key,
    name    varchar(255),
    player  varchar(255),
    type    smallint
        constraint itcharacter_type_check check ((type >= 0) AND (type <= 1)),
    reward  bigint,
    goal    varchar(255),
    updated timestamp(6),
    created timestamp(6)
);

alter table public.itcharacter
    owner to postgres;

create table public.itcharacter_notes
(
    itcharacter_id varchar(255) not null
        constraint fkt822hgnw14mul6wn9asuhaplx references public.itcharacter,
    notes           varchar(255)
);

alter table public.itcharacter_notes
    owner to postgres;

create table public.itpower
(
    id        varchar(255) not null primary key,
    name      varchar(255),
    category  smallint
        constraint itpower_category_check check ((category >= 0) AND (category <= 3)),
    particles varchar(255),
    updated   timestamp(6),
    created   timestamp(6)
);

alter table public.itpower
    owner to postgres;

create table public.itweapon
(
    id      varchar(255) not null primary key,
    name    varchar(255),
    owner   varchar(255),
    power   bigint,
    type    smallint
        constraint itweapon_type_check check ((type >= 0) AND (type <= 12)),
    updated timestamp(6),
    created timestamp(6)
);

alter table public.itweapon
    owner to postgres;

create table public.itpower_ideas
(
    itpower_id varchar(255) not null
        constraint fkllcimmpqxhikwq5d5ye1th2t6 references public.itpower,
    ideas       varchar(255)
);

alter table public.itpower_ideas
    owner to postgres;

create table public.weapon_notes
(
    itweapon_id varchar(255) not null
        constraint fkb2py6palsbhciul7bua9kvrmy references public.itweapon,
    notes        varchar(255)
);

alter table public.weapon_notes
    owner to postgres;

create table public.weapon_titles
(
    itweapon_id varchar(255) not null
        constraint fka5h5007hfve5dsloy5u6e3wwh references public.itweapon,
    titles       varchar(255)
);

alter table public.weapon_titles
    owner to postgres;