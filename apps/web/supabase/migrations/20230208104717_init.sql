CREATE TABLE IF NOT EXISTS public.leaderboard (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  wallet_address character varying not null,
  competition_id int not null,
  game_id int not null,
);


CREATE TABLE IF NOT EXISTS public.player_profile (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  wallet_address character varying not null,
  username character varying not null,
  fullname character varying,
  email character varying,
  avatar_url character varying
);



-- 1. Enable RLS
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 2. Create Policy for SELECT
CREATE POLICY select_all_policy ON public.leaderboard FOR
SELECT USING (TRUE);

-- 3. Create Policy for INSERT
CREATE POLICY insert_auth_policy ON public.leaderboard FOR
INSERT WITH CHECK (TRUE);

-- 4. Create Policy for UPDATE
CREATE POLICY update_auth_policy ON public.leaderboard FOR
UPDATE WITH CHECK (FALSE);




-- 1. Enable RLS
ALTER TABLE public.player_profile ENABLE ROW LEVEL SECURITY;

-- 2. Create Policy for SELECT
CREATE POLICY select_all_policy_player_profile ON public.player_profile FOR
SELECT USING (TRUE);

-- 3. Create Policy for INSERT
CREATE POLICY insert_auth_policy_player_profile ON public.player_profile FOR
INSERT WITH CHECK (TRUE);

-- 4. Create Policy for UPDATE
CREATE POLICY update_auth_policy_player_profile ON public.player_profile FOR
UPDATE WITH CHECK (FALSE);
