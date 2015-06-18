---
layout: post
title: "Use Dropbox to sync your photos across all of your devices"
date: 2015-06-18 22:00:00
categories: blog
comments: true
---

I like to take lots of pictures. I also have multiple macs running, and I wanted some of the photos to appear on one mac, and some of them on the other. I also want to have these photos imported in [Apple Photos](http://www.apple.com/osx/photos/).

The thing is: how do you process media files on a smartphone (iPhone in my case, but the same thing could be said from any other smartphone) and create a unified photo library out of it, on multiple machines?

A great solution to sync stuff between devices is [Dropbox](https://www.dropbox.com). With their [Carousel](https://carousel.dropbox.com) app, it already integrates nicely into my phone, placing new photos into a `Camera Roll` folder. Dropbox is also available for almost every platform, making this process applicable on more than just an iPhone and a Mac.

<!-- more -->

This is roughly my process:

* Take photos, shoot videos.

* Carousel uploads all of my photos & videos to the `Camera Roll` folder.

* Process the `Camera Roll` folder, and moves them to a folder structure `Photos & Videos` \> `year` \> `month`, that also resides in Dropbox. I'm using [Hazel](http://www.noodlesoft.com/hazel.php) for this, and `exiftool ` to pass on the metadata from the photos to Hazel.

  [I have uploaded these Hazel rules here](https://www.dropbox.com/s/15xizha4o35earx/Camera%20Uploads.hazelrules.zip?dl=1). Note, you probably would want to review and modify these rules according to your taste. These rules require that you have `exiftool` installed. [Get a binary here](http://www.sno.phy.queensu.ca/~phil/exiftool/).

* Process the `Photos & Videos` folder, and create a photo library for them. I'm also using Hazel for this, and it imports every new image and video file into Apple Photos using AppleScript. If it is imported, it is marked with a certain tag. That tag get's synced back to Dropbox. This tag also prevents duplicate imports. [These Hazel rules are available here](https://www.dropbox.com/s/hqntuzwx7yu3d3u/Add%20to%20Photos.hazelrules.zip?dl=1).

This process is not perfect. Moving photos from camera roll to the photos & videos app only is set up on my main machine, making this process a bit brittle.

But apart from this, it works great for me so far. I do not rely on a specific photo management app, so I could switch later on if I wanted to. I could use multiple photo management apps, like Lightroom, if I wanted to. I also have a full photo backup stored in Dropbox. Using [the selective sync feature](https://www.dropbox.com/help/175) of Dropbox, I only download the most recent photos onto my machines.
