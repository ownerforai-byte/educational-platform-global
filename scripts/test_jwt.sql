set request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","email":"owner@test.local","role":"authenticated"}';
select auth.uid();
