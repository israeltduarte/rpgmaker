create table public.itcharacter
(
    type    smallint
        constraint itcharacter_type_check
            check ((type >= 0) AND (type <= 1)),
    created timestamp(6),
    reward  bigint,
    updated timestamp(6),
    goal    varchar(255),
    id      varchar(255) not null
        primary key,
    name    varchar(255)
);

alter table public.itcharacter
    owner to postgres;

create table public.character_notes
(
    it_character_id varchar(255) not null
        constraint fkt822hgnw14mul6wn9asuhaplx
            references public.itcharacter,
    notes           varchar(255)
);

alter table public.character_notes
    owner to postgres;

create table public.itpower
(
    category  smallint
        constraint itpower_category_check
            check ((category >= 0) AND (category <= 3)),
    created   timestamp(6),
    updated   timestamp(6),
    id        varchar(255) not null
        primary key,
    name      varchar(255),
    particles varchar(255)
);

alter table public.itpower
    owner to postgres;

create table public.itweapon
(
    type    smallint
        constraint itweapon_type_check
            check ((type >= 0) AND (type <= 12)),
    created timestamp(6),
    power   bigint,
    updated timestamp(6),
    id      varchar(255) not null
        primary key,
    name    varchar(255),
    owner   varchar(255)
);

alter table public.itweapon
    owner to postgres;

create table public.power_ideas
(
    ideas       varchar(255),
    it_power_id varchar(255) not null
        constraint fkllcimmpqxhikwq5d5ye1th2t6
            references public.itpower
);

alter table public.power_ideas
    owner to postgres;

create table public.weapon_notes
(
    it_weapon_id varchar(255) not null
        constraint fkb2py6palsbhciul7bua9kvrmy
            references public.itweapon,
    notes        varchar(255)
);

alter table public.weapon_notes
    owner to postgres;

create table public.weapon_titles
(
    it_weapon_id varchar(255) not null
        constraint fka5h5007hfve5dsloy5u6e3wwh
            references public.itweapon,
    titles       varchar(255)
);

alter table public.weapon_titles
    owner to postgres;
