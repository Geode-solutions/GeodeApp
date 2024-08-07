const { spawn } = require('node:child_process')

var child
if (process.platform === "win32"){
    child = spawn("powershell.exe", ["./electron-server/install_viewer.ps1"]);
} else if (process.platform === "linux"){
    child = spawn("./electron-server/install_viewer.sh", []);
}

child.stdout.on("data",function(data){
    console.log("" + data);
});
child.stderr.on("data",function(data){
    console.log("" + data);
});
child.on("exit",function(){
    console.log("Exit script");
});
child.stdin.end(); //end input