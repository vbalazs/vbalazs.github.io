---
title:  "Slow tty console in VirtualBox"
date:   2010-08-31 16:53:00
category: virtualization
tags: [clipboard, console, english, fluxbox, linux, terminal, ubuntu, virtualbox, windows]
---

**Host OS**: Windows 7 x86  
**VirtualBox**: v3.2.x  
**Guest OS**: Ubuntu 10.04 Server x86 (2.6.32.24-generic)  

If you type `$ ls -la /usr/bin`  in a tty/console (ctrl+alt+fX) of the guest os, you may find that scrolling is _very slow_ or/and laggy. I have tried [many](http://gddd.wordpress.com/2009/10/08/ad/) kernel parameters, but they didn’t help.
I installed X and [FluxBox](http://fluxbox.org/), then I reinstalled Guest Additions, that gave the video module of VirtualBox to the kernel. After that I installed the _rxvt-unicode_ terminal emulator, so if we launch this in FluxBox we get a faster console with a _custom resolution_.
Installing X server <u>may be</u> a security risk but it doesn’t really important in case of running dev machine in VirtualBox. In exchange for this disadvantage we get a <b>nice console with a useful clipboard</b>. :)

I am not able to figure out how could I copy from guest terminal to host. If somebody knows the solution please share with us! ;)

**Update (Jul 11 2011):** or you just set up an SSH server in the VM, set up port forwarding and start it without VirtualBox window (hint: *VBoxHeadless*) ;)
