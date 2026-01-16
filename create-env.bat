@echo off
echo Creating .env.local file...
echo VITE_SUPABASE_URL=https://zkwwnztulyydgdplsgpy.supabase.co > .env.local
echo VITE_SUPABASE_ANON_KEY=COLE_SUA_ANON_KEY_AQUI >> .env.local
echo.
echo .env.local created successfully!
echo.
echo NEXT STEPS:
echo 1. Open the Supabase dashboard (already open in your browser)
echo 2. In the "Publishable key" section, click the copy icon to copy the anon key
echo 3. Open the .env.local file in this directory
echo 4. Replace "COLE_SUA_ANON_KEY_AQUI" with the key you copied
echo 5. Save the file
echo 6. Run: npm run dev
echo.
pause
