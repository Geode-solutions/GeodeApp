$microservice_name=$args[0]
echo "Installing $args requirements"

$microservice_path=".\electron-server\$microservice_name"
$venv_path="$microservice_path\venv"
echo "Removing old virtual environment $venv_path"
Remove-Item -Recurse -Force $venv_path -ErrorAction:SilentlyContinue
Remove-Item -Recurse -Force "$microservice_path\dist\" -ErrorAction:SilentlyContinue
Remove-Item -Recurse -Force "$microservice_path\build\" -ErrorAction:SilentlyContinue
echo "Activating virtual environment $venv_path\Scripts\Activate.ps1"
python -m venv $venv_path
"$venv_path\Scripts\Activate.ps1"
pip install -r "$microservice_path\requirements.txt"
