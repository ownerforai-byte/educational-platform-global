set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select auth.uid() as uid, public.is_content_manager() as is_cm, public.current_role() as current_role;
