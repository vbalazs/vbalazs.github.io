---
layout: post
title:  "Slow tty console in VirtualBox"
date:   2010-08-31 16:53:00
category: virtualization
tags: clipboard, console, english, fluxbox, linux, terminal, ubuntu, virtualbox, windows
---

<b>Host OS</b>: Windows 7 x86<br />
<b>VirtualBox</b>: v3.2.x<br />
<b>Guest OS</b>: Ubuntu 10.04 Server x86 (2.6.32.24-generic)<br />
<br />
If you type `$ ls -la /usr/bin`  in a tty/console (ctrl+alt+fX) of the guest os, you may find that scrolling is <i>very slow</i> or/and laggy. I have tried <a href="http://gddd.wordpress.com/2009/10/08/ad/">many</a> kernel parameters, but they didn’t help.<br />
I installed X and <a href="http://fluxbox.org/">FluxBox</a>, then I reinstalled Guest Additions, that gave the video module of VirtualBox to the kernel. After that I installed the <i>rxvt-unicode</i> terminal emulator, so if we launch this in FluxBox we get a faster console with a <i>custom resolution</i>.<br />
Installing X server <u>may be</u> a security risk but it doesn’t really important in case of running dev machine in VirtualBox. In exchange for this disadvantage we get a <b>nice console with a useful clipboard</b>. :)<br />
<br />
I am not able to figure out how could I copy from guest terminal to host. If somebody knows the solution please share with us! ;)<br />
<br />
<b>Update (Jul 11 2011):</b>&nbsp;or you just set up an SSH server in the VM, set up port forwarding and start it without VirtualBox window <span class="Apple-style-span" style="font-size: x-small;">(hint: <i>VBoxHeadless</i>)</span> ;)
