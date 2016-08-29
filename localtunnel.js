let localtunnel = require('localtunnel');

let port = 5000;

let opt = {
    // host: parsed.host,
    // port: 5000,
    subdomain: 'testmsgr001'
    // headers: {
    //     host: parsed.hostname
    // },
    // path: '/'
};

let tunnel = localtunnel(port, opt, (err, tunnel) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel);
    console.log(tunnel.url);
});

tunnel.on('close', () => {
    // tunnels are closed
    console.log('tunnels are closed');
    process.exit(0);
});
