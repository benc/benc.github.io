---
layout: post
title: "Create an OS X vagrant box for VMWare Fusion"
date: 2015-07-05 08:00:00
categories: blog
comments: true
---

I need a test OS X system to use in [Vagrant](https://www.vagrantup.com). I'm using [VMWare Fusion](http://www.vmware.com/products/fusion/), it supports OS X virtual machines and [Vagrant provides an official plugin to work with VMware](https://www.vagrantup.com/vmware). VMWare Fusion and the VMWare Vagrant plugin arent't free, but well worth the money.

Since you cannot download a prepackaged vagrant VMWare OS X box, we're going to build it ourselves.

<!-- more -->

This is how I did it:

* Install Vagrant, VMWare and the vagrant vmware plugin. Also, install [packer](https://www.packer.io), which we will need to build the box.
* Get the latest installer of Yosemite off the Mac App store.
* Grab a copy of the [osx-vm-templates](https://github.com/timsutton/osx-vm-templates) provided by Tim Sutton.

  	git clone https://github.com/timsutton/osx-vm-templates.git; cd osx-vm-templates
  	sudo prepare_iso/prepare_iso.sh /Applications/Install\ OS\ X\ Yosemite.app/ out

* Calculate the md5 checksum from the dmg you've just created.

      md5 out/OSX_InstallESD_10.10.3_14D136.dmg

* Run packer. Substitute the `MD5_CHECKSUM` with the one you just calculated. Also check the DMG filename.

  	cd packer; packer build \
  	 -var iso_checksum=43101c86c31406f72b9e45011e754aa3 \
  	 -var iso_url=../out/OSX_InstallESD_10.10.3_14D136.dmg \
  	 --only vmware-iso template.json

* Grab a cup of coffee. Many cups, actually. This will run for a while.

  When it's done, add the box to vagrant

      vagrant box add osx-yosemite packer_vmware-iso_vmware.box

* We don't need the box anymore (it sits right in vagrants cache),  so a little housekeeping can't hurt:

  	rm packer_vmware-iso_vmware.box
  	cd ../out; rm OSX_InstallESD_10.10.3_14D136.dmg

That's it! You can now use the `osx-yosemite` as a base box in any Vagrantfile on your system.
