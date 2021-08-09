## Introduction

When viewing folders with images and videos, I was unhappy with the applications available on Windows. After searching for a few hours, I couldn't find any program that fullfilled my short list of requirements:

- Reads both images and videos
- Navigates between media with keyboard or mouse wheel
- Autoplays video, preferably in a loop
- Works locally (direct read from the disk, no upload to server)

So I thought I could just code my own application.

## Electron or not?

I'm a front-end developer, which limits my possiblities. Since I need read access to the disk. my first thought was to use Electron. I've never worked with Electron before and actually I've been avoiding it. My guess is that PWAs or another tech is going to replace it near-medium term. So I was not to eager to learn how to build apps with Electron.
While doing some research about Electron, I came across this application:

It was exactly what I needed, except that it couldn't read videos, albeit the pull request.

However, the same author also published a great npm package which had more capabilities, among other reading video files.

Remembering hearing about the File Access API, I told myself why not build a simple website?

## webkitdirectory vs File Access API

At first I thought that the File Access API was the only way to read the content of a folder. But actually the `webkitdirectory` attribute on the `<input type="file">` element allows entire directory with file contents to be selected. So a basic `input` tag with the `webkitdirectory` attribute is exactly what I needed.

I think that the File Access API is more for applications that let users save their changes locally.

## createObjectURL

Media files are to be read locally, directly from the disk. But I still need some sort of URL for the src attributes of img and video tags. First I thought about using the base64
