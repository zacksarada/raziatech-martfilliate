const vscode = require('vscode');
const workspace = vscode.workspace;
workspace.getConfiguration('remote.forwardOnOpen').update('ports', [3000], true);
console.log('Port 3000 enabled for forwarding');
