set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select auth.uid(), public.is_content_manager();
