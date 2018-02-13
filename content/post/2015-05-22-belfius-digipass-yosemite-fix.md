---
categories: blog
comments: true
date: 2015-05-22T10:56:16Z
title: Get your Belfius DIGIPASS 870 working on Mac OS X Yosemite
url: /2015/05/22/belfius-digipass-yosemite-fix/
aliases:
- /blog/2015/05/22/belfius-digipass-yosemite-fix.html
---

> tl;dr You can get your new Belfius DIGIPASS working by following [these instructions](#fix)

Recently, my bank, [Belfius](https://www.belfius.be/), issued a [DIGIPASS 870 smartcard reader (Dutch link)](https://www.belfius.be/retail/nl/zelf-bankieren/diensten/kaartlezer/index.aspx?firstWA=no) that also can process a Belgian eID card. I liked it:

I only have one device to use Belfius Direct Net and access eID protected sites.
I can enter my eID PIN code on the DIGIPASS, making the process more secure.

It worked great on Mavericks. [Belfius made efforts to get it working on Mac OS X Yosemite](https://twitter.com/belfiuscontact/status/540120080450068481), but sadly, it never worked properly on my main machine.

I decided to perform a complete reinstall, and it still didn't work properly. The DIGIPASS worked very well on other macs in my family, so I decided to figure some stuff out. This is what I found.

<!--more-->

## What went wrong?

OS X ships with smartcard reader support out of the box:

It uses the open source [CCID driver](https://pcsclite.alioth.debian.org/ccid.html). This driver supports many smartcard readers. It's located at `/usr/libexec/SmartCardServices/drivers/ifd-ccid.bundle/`.
[The DIGIPASS 870 works out of the box](https://pcsclite.alioth.debian.org/ccid/shouldwork.html#0x1A440x0870) with this CCID driver.

To make the DIGIPASS actually work on OS X Yosemite, a small text entry has to be added to the configuration of this CCID driver, the `Info.plist` file inside the `ifd-ccid.bundle`. This is one of the things the Vasco DIGIPASS installer does.

However, this file is also being manipulated by [the eID installer issued by FedICT](http://eid.belgium.be/en/using_your_eid/installing_the_eid_software/).

Tampering with system files is dangerous, and this is exactly what went wrong:

When you install the DIGIPASS 870 driver, it updates the CCID plist.
When you install the beID middleware, it _overwrites_ the CCID plist with a custom one. It does contain an entry for the DIGIPASS 870, so it should still work from here on. However, if you would run the DIGIPASS 870 installer after the beID installer it corrupts the plist file, rendering both Belfius Direct Net and all eID applications useless.

To make matters more complicated, Vasco lists a knowledge base article that fixes DIGIPASS 870 issues [on Mac OS X Mavericks](https://retail.vasco.com/install/faq/20140326_120189.aspx). I had it installed, and it worked well at the time. It actually makes things worse on Yosemite.

<a name="fix"></a>

## So, how to fix it?

Luckily, you can fix all these errors by restoring the CCID config file to a working state. Of course, since you will be tampering with system files, use these instructions at your own risk.

Install the Belfius DIGIPASS 870 browser plugin. You get this file when you load Belfius Direct Net.
Install [beID middleware](http://eid.belgium.be/en/using_your_eid/installing_the_eid_software/mac/).
Open Finder, open the `Go`, `Go to folder...` menu and enter `/usr/libexec/SmartCardServices/drivers/ifd-ccid.bundle/Contents/`.
Rename the existing `Info.plist` file to `Info.plist.backup` (or something similar), in case you should need it later on.
I created [a gist](https://gist.github.com/benc/438193275f9720f1b509) from the stock Yosemite Info.plist file, with the entry that the Vasco DIGIPASS 870 driver created. [Download it](https://gist.github.com/benc/438193275f9720f1b509/download), and place the Info.plist file inside the folder you just opened.
If you installed [the package from the Vasco KB article]((https://retail.vasco.com/install/faq/20140326_120189.aspx)), _revert_ those changes. Open Terminal.app, and enter these commands:

    sudo rm -rf /Library/LaunchDaemons/org.opensc.pcscd.autostart.plist
    sudo /Library/OpenSC/bin/sc-securityd.py active

And reboot.

Test it:

Go to [https://test.eid.belgium.be/]().
Open Keychain, and check if the BELPIC keychain appears when you insert your eID.

That's it!
