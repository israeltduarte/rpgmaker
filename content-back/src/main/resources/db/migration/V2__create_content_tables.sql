create table public.itcity
(
    id      varchar(255) not null primary key,
    name    varchar(255),
    title   varchar(255),
    leader  varchar(255),
    size    smallint
        constraint itcity_size_check check ((size >= 0) AND (size <= 8)),
    updated timestamp(6),
    created timestamp(6)
);

alter table public.itcity owner to postgres;

create table public.itcity_curiosities
(
    itcity_id   varchar(255) not null
        constraint fkbvkm78toxg1upn6odspo5o12n references public.itcity,
    curiosities varchar(255)
);

alter table public.itcity_curiosities owner to postgres;

create table public.itcity_groups
(
    itcity_id varchar(255) not null
        constraint fkh9wh3qybcksjvjnrrdwlydrn3 references public.itcity,
    groups    varchar(255)
);

alter table public.itcity_groups owner to postgres;

create table public.itcity_notes
(
    itcity_id varchar(255) not null
        constraint fk3iswjuqn4352w4xyjqyiencyc references public.itcity,
    notes     varchar(255)
);

alter table public.itcity_notes owner to postgres;

create table public.itcity_people
(
    itcity_id varchar(255) not null
        constraint fkqfgtest3x9aj3hdg8pnticydm references public.itcity,
    people    varchar(255)
);

alter table public.itcity_people owner to postgres;

create table public.itcity_places
(
    itcity_id varchar(255) not null
        constraint fk4ckuxjujkl2ecptfse2dwb27v references public.itcity,
    places    varchar(255)
);

alter table public.itcity_places owner to postgres;

create table public.itgroup
(
    id          varchar(255) not null primary key,
    name        varchar(255),
    description varchar(255),
    leader      varchar(255),
    updated     timestamp(6),
    created     timestamp(6)
);

alter table public.itgroup owner to postgres;

create table public.itgroup_notes
(
    itgroup_id varchar(255) not null
        constraint fkb4esmkl8nkbn68j2q4jrn7jcu references public.itgroup,
    notes      varchar(255)
);

alter table public.itgroup_notes owner to postgres;

create table public.itopponent
(
    id      varchar(255) not null primary key,
    name    varchar(255),
    power   varchar(255),
    hp      integer,
    tac0    integer,
    ca      integer,
    updated timestamp(6),
    created timestamp(6)
);

alter table public.itopponent owner to postgres;

create table public.itopponent_abilities
(
    itopponent_id varchar(255) not null
        constraint fkjjnym0k847octojl7lqxf4k87 references public.itopponent,
    abilities     varchar(255)
);

alter table public.itopponent_abilities owner to postgres;

create table public.itopponent_weapons
(
    itopponent_id varchar(255) not null
        constraint fksjmxw2xq7sioks756cm5rs7id references public.itopponent,
    weapons       varchar(255)
);

alter table public.itopponent_weapons owner to postgres;

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

alter table public.itpower owner to postgres;

create table public.itcharacter
(
    id          varchar(255) not null primary key,
    name        varchar(255),
    type        smallint
        constraint itcharacter_type_check check ((type >= 0) AND (type <= 1)),
    is_rival    boolean,
    player_name varchar(255),
    reward      bigint,
    goal        varchar(255),
    itpower_id  varchar(255)
        constraint fkmhdy6d2wyy53y06qi48xenoj1 references public.itpower,
    tendency    varchar(255),
    updated     timestamp(6),
    created     timestamp(6)
);

alter table public.itcharacter owner to postgres;

create table public.itcharacter_notes
(
    itcharacter_id varchar(255) not null
        constraint fkk1om12tqojepqnkev5y4tc1u1 references public.itcharacter,
    notes          varchar(255)
);

alter table public.itcharacter_notes owner to postgres;

create table public.itpower_ideas
(
    itpower_id varchar(255) not null
        constraint fktm5yx6ibm0dfl3na2o2p2nis9 references public.itpower,
    ideas      varchar(255)
);

alter table public.itpower_ideas owner to postgres;

create table public.itweapon
(
    id      varchar(255) not null primary key,
    power   bigint unique,
    name    varchar(255),
    type    smallint
        constraint itweapon_type_check check ((type >= 0) AND (type <= 12)),
    owner   varchar(255),
    updated timestamp(6),
    created timestamp(6)
);

alter table public.itweapon owner to postgres;

create table public.itweapon_notes
(
    itweapon_id varchar(255) not null
        constraint fk1cqqlqp5y0edx7t53pldoh1r1 references public.itweapon,
    notes       varchar(255)
);

alter table public.itweapon_notes owner to postgres;

create table public.itweapon_titles
(
    itweapon_id varchar(255) not null
        constraint fkt6dpy40c3l5jsko33wswllm8r references public.itweapon,
    titles      varchar(255)
);

alter table public.itweapon_titles owner to postgres;

create table public.ittask
(
    id      varchar(255) not null primary key,
    name    varchar(255),
    description    varchar(255),
    updated timestamp(6),
    created timestamp(6)
);

alter table public.ittask owner to postgres;
