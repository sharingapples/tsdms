# wscada.net

a [Sails](http://sailsjs.org) application

### Installation
#### Development Mode
1. Create a folder named 'www' and create a soft link to the assets folder
```bash
$ mkdir www  
$ ln -s ../../wscada.net-ui/assets/ www/assets  
```
2. Create a soft link named 'wscada-ui' inside node_modules to link to the
   wscada-ui library available as node module
```bash
$ ln -s ../../wscada.net-ui/lib/ node_modules/wscada-ui
```

#### Production
