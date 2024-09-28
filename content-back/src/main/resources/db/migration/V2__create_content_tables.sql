CREATE TABLE public.itpower
(
    id        VARCHAR(255) NOT NULL PRIMARY KEY,
    name      VARCHAR(255),
    category  SMALLINT
        CONSTRAINT itpower_category_check CHECK ((category >= 0) AND (category <= 3)),
    particles VARCHAR(255),
    updated   TIMESTAMP(6),
    created   TIMESTAMP(6)
);

ALTER TABLE public.itpower
    OWNER TO postgres;

CREATE TABLE public.itpower_ideas
(
    itpower_id VARCHAR(255) NOT NULL
        CONSTRAINT fkllcimmpqxhikwq5d5ye1th2t6 REFERENCES public.itpower,
    ideas      VARCHAR(255)
);

ALTER TABLE public.itpower_ideas
    OWNER TO postgres;

CREATE TABLE public.itcharacter
(
    id         VARCHAR(255) NOT NULL PRIMARY KEY,
    name       VARCHAR(255),
    player     VARCHAR(255),
    type       SMALLINT
        CONSTRAINT itcharacter_type_check CHECK ((type >= 0) AND (type <= 1)),
    reward     BIGINT,
    goal       VARCHAR(255),
    itpower_id VARCHAR(255)
        CONSTRAINT fk_power REFERENCES public.itpower (id),
    updated    TIMESTAMP(6),
    created    TIMESTAMP(6)
);

ALTER TABLE public.itcharacter
    OWNER TO postgres;

CREATE TABLE public.itcharacter_notes
(
    itcharacter_id VARCHAR(255) NOT NULL
        CONSTRAINT fkt822hgnw14mul6wn9asuhaplx REFERENCES public.itcharacter,
    notes          VARCHAR(255)
);

ALTER TABLE public.itcharacter_notes
    OWNER TO postgres;

CREATE TABLE public.itweapon
(
    id      VARCHAR(255) NOT NULL PRIMARY KEY,
    name    VARCHAR(255),
    owner   VARCHAR(255),
    power   BIGINT UNIQUE,
    type    SMALLINT
        CONSTRAINT itweapon_type_check CHECK ((type >= 0) AND (type <= 12)),
    updated TIMESTAMP(6),
    created TIMESTAMP(6)
);

ALTER TABLE public.itweapon
    OWNER TO postgres;

CREATE TABLE public.itweapon_notes
(
    itweapon_id VARCHAR(255) NOT NULL
        CONSTRAINT fkb2py6palsbhciul7bua9kvrmy REFERENCES public.itweapon,
    notes       VARCHAR(255)
);

ALTER TABLE public.itweapon_notes
    OWNER TO postgres;

CREATE TABLE public.itweapon_titles
(
    itweapon_id VARCHAR(255) NOT NULL
        CONSTRAINT fka5h5007hfve5dsloy5u6e3wwh REFERENCES public.itweapon,
    titles      VARCHAR(255)
);

ALTER TABLE public.itweapon_titles
    OWNER TO postgres;

CREATE TABLE public.itgroup
(
    id          VARCHAR(255) NOT NULL PRIMARY KEY,
    name        VARCHAR(255),
    leader      VARCHAR(255),
    description VARCHAR(255),
    updated     TIMESTAMP(6),
    created     TIMESTAMP(6)
);

ALTER TABLE public.itgroup
    OWNER TO postgres;

CREATE TABLE public.itgroup_notes
(
    itgroup_id VARCHAR(255) NOT NULL
        CONSTRAINT fkb2py6palsbhciul7bua9lsvjei REFERENCES public.itgroup,
    notes      VARCHAR(255)
);

ALTER TABLE public.itgroup_notes
    OWNER TO postgres;