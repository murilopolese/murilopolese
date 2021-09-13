---
title: "Banana Banana"
cover: "/bananabanana.png"
description: "BananaBanana is my home server and a journey on digital sovereignty ideas that both healed my relationship with internet."
path: "/blog/2020-12-bananabanana"
---

> Attention: This is old and not what's happening behind the scene anymore, but it was and it's still the sprit!

[![BananaBanana.me Home Page](./bananabanana.png)](http://bananabanana.me)

For a while I tried to switch to P2P protocols and host my projects on [dat](https://dat.foundation/), [hyperdrive](https://hypercore-protocol.org/#hyperdrive) and [ipfs](https://ipfs.io/) but the truth is I was hosting my projects because I wanted to share them and nobody really had access to those because well, P2P web is still a niche thing.

To make sure things were always seeding, I setup a fresh Ubuntu with docker on a 2013ish Samsung Series 9 ultrabook that I stopped using because the screen is unbearable bad.

I have not installed one of those terminal only versions of Ubuntu and I have done all the initial setup on the graphical interface (Gnome 3) which was sweet and smooth.

It turns out besides the P2P stuff I had enough resources to host regular web things as well. This computer has just become my home server!

It turns out it’s not that simple to get a *dynamic DNS thing* pointing a domain to a machine inside my wifi network. Unless I have a static IP. No way I wanted to pay the internet provider price for that. The cheapest and easiest static IP I found was an EC2 micro instance on Amazon Web Services.

So here is the deal: I have a public facing ip assigned to this EC2 machine (it could be any other provider). It has an nginx service running and I pointed bananabanana.me to it. Great success!

![BananaBanana functioning schematics](./bananabanana_map.png)

But this remote machine knows nothing about my home server, where it is, how to connect, nothing. My server knows everything, including how to ssh to it. Luckily enough there is something called “reverse ssh tunneling” that allows me to bind a port on a remote computer to another port on my local computer! Perfect! Except I cannot bind the port 80 on the EC2 machine. Oh well...

Using [autossh](https://linux.die.net/man/1/autossh) to keep the ssh tunnels alive:

```
autossh -f -nNT -i path/to/amazon/permission/file.pem -R :8008:localhost:8008 username@bananabanana.me
```

I setup a port forwarding on the EC2 to forward the port 80 to 8060 and that was it! I also added some “port to subdomain” nginx configurations and I was ready to run containers on my local server and make them accessible through a subdomain on bananabanana.me! Those containers are always available locally and I can share them outside my network too! Mission accomplished!

```
# Port forwarding
$ sudo iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
$ sudo iptables -A INPUT -i eth0 -p tcp --dport 8060 -j ACCEPT
$ sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8060
```

```
# Sample of “port to subdomain” NGINX configuration
server {
  listen 8060;
  server_name gallery.bananabanana.me;
  location / {
    proxy_pass http://127.0.0.1:3002;
  }
}
```

Most things can still be shared on P2P networks, in fact I run a Secure Scuttlebutt pub, a Subsonic server and sometimes I seed hyperdrives.

```
$ docker ps

IMAGE                            NAMES
umami_umami                      umami_umami_1
postgres:alpine                  umami_db_1
node:lts                         splatcode
node:lts                         colorcode
mongo                            panimation_db
node:lts                         microscope
nginx                            bananadrive
nginx                            gallery
dashultz/ezstream:latest         icecast_ezstream_1
infiniteproject/icecast:latest   icecast_icecast_1
nginx                            bookshelf
deluan/navidrome:latest          navidrome
ahdinosaur/ssb-pub               sbot
```

I really enjoy this setup and it’s been liberating to be able to publish things on the internet by just copying files from a folder to another or sharing a folder on my external hard drive/usb stick.

From my other Ubuntu computer I can even navigate and open files over sftp on Nautilus! It turns out I can do the same for the local and remote networks (like the machine on AWS), it’s just really sweet.

I left the http://bananabanana.me home page on the remote server because I still want people to access the domain when my local server is off or out of connection. For example when I was moving the site was down for 2 or 3 days with an [away](http://bananabanana.me/away.html) message!

![Banana Banana away message](./bananabanana_away.png)

This has been and still is a journey of learning and practice of important digital sovereignty ideas that both healed and inspired my relationship with internet.

*About the name:*

I think I was working on Kano Pixel Kit onboarding or prototyping one of the never delivered kickstarter when I found a video of someone serting up a local wifi network for configuring the ESP8266 internet connection. It was exactly what I was looking for and the person used a password that made me laugh out loud in the office: bananabanana. I started using it as both my username and password for test accounts and workshops. It’s a fun long 3 letter name that can be drawn and come on: Banana banana!
