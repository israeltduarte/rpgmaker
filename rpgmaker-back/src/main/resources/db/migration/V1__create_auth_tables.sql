CREATE TABLE public.itrole
(
    id   VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(30)  NOT NULL UNIQUE
        CONSTRAINT role_name_check CHECK ((name)::TEXT = ANY
                                          ((ARRAY ['ROLE_ADMIN'::CHARACTER VARYING, 'ROLE_USER'::CHARACTER VARYING])::TEXT[]))
);

ALTER TABLE public.itrole
    OWNER TO postgres;

CREATE TABLE public.ituser
(
    id        VARCHAR(255) NOT NULL PRIMARY KEY,
    name      VARCHAR(255),
    last_name VARCHAR(255),
    email     VARCHAR(255),
    username  VARCHAR(255) UNIQUE,
    password  VARCHAR(255),
    updated   TIMESTAMP(6),
    created   TIMESTAMP(6)
);

ALTER TABLE public.ituser
    OWNER TO postgres;

CREATE TABLE public.itusers_itroles
(
    ituser_id VARCHAR(255) NOT NULL
        CONSTRAINT fkluvr57lisdbxa7kxykag8bws9 REFERENCES public.ituser,
    itrole_id VARCHAR(255) NOT NULL
        CONSTRAINT fkt4v0rrweyk393bdgt107vdx0x REFERENCES public.itrole
);

ALTER TABLE public.itusers_itroles
    OWNER TO postgres;