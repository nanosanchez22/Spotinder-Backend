CREATE TABLE IF NOT EXISTS public.canciones
(
    id integer NOT NULL DEFAULT nextval('cancion_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    artista character varying COLLATE pg_catalog."default" NOT NULL,
    img character varying COLLATE pg_catalog."default" NOT NULL,
    duracion character varying COLLATE pg_catalog."default" NOT NULL,
    genero character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT cancion_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.canciones
    OWNER to postgres;

    


CREATE TABLE IF NOT EXISTS public.playlist_canciones
(
    id integer NOT NULL DEFAULT nextval('playlist_cancion_id_seq'::regclass),
    playlist_id integer NOT NULL,
    cancion_id integer NOT NULL,
    CONSTRAINT playlist_cancion_pkey PRIMARY KEY (id),
    CONSTRAINT cancion_id FOREIGN KEY (cancion_id)
        REFERENCES public.canciones (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT playlist_id FOREIGN KEY (playlist_id)
        REFERENCES public.playlists (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playlist_canciones
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.playlists
(
    id integer NOT NULL DEFAULT nextval('playlist_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying COLLATE pg_catalog."default" NOT NULL,
    usuario_id integer NOT NULL,
    CONSTRAINT playlist_pkey PRIMARY KEY (id),
    CONSTRAINT usuario_id FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playlists
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "contraseña" character varying COLLATE pg_catalog."default" NOT NULL,
    usuario character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;