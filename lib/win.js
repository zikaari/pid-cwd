const exec = require('child_process').exec;

function cwd(pid) {
    if (typeof pid !== 'number' || pid < 0) {
        throw new TypeError(`pid must be a positive number`);
    }
    return new Promise((resolve) => {
        exec(`.\\third_party\\tlist\\tlist.exe ${pid}`, {
            shell: 'cmd.exe'
        }, (err, stdout) => {
            if (err) {
                resolve(null);
            } else if (typeof stdout === 'string') {
                const token = 'CWD:';
                const idx = stdout.indexOf(token);
                resolve(idx === -1 ?
                    null :
                    stdout.slice((idx + token.length), stdout.indexOf('\n', idx)).trim())
            } else {
                resolve(null);
            }
        })
    });
}

module.exports = cwd;