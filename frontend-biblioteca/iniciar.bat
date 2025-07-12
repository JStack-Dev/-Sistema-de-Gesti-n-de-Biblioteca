@echo off
echo 📚 Iniciando Sistema de Biblioteca...

REM Iniciar backend
echo 🔄 Arrancando backend...
start cmd /k "cd backend-biblioteca && npm run dev"

REM Esperar unos segundos para que el backend arranque antes del frontend
timeout /t 3 >nul

REM Iniciar frontend
echo 🔄 Arrancando frontend...
start cmd /k "cd frontend-biblioteca && npm run dev"

REM Mensaje final
echo ✅ Todo listo. Puedes abrir http://localhost:5173 en tu navegador si no se abre solo.
pause
