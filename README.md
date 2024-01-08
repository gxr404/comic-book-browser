# Comic Book Browser

![logo](https://socialify.git.ci/gxr404/comic-book-browser/image?font=Source%20Code%20Pro&logo=https%3A%2F%2Fgithub.com%2Fgxr404%2Fcomic-book-browser%2Fraw%2Fmain%2Fdocs%2Flogo.png&name=1&pattern=Circuit%20Board&theme=Dark)

<!-- markdownlint-disable MD033 -->

<p align="center">
  <b>一款漫画浏览器(搭配<a href="https://github.com/gxr404/comic-book-dl">comic-book-dl</a>使用)</b><br/>
  <b>开源 | 高效 | 易用</b><br/><br/>
  <img src="https://img.shields.io/npm/v/comic-book-browser" alt="npm">
  <img src="https://img.shields.io/badge/PR-welcome-blue" alt="Static Badge">
  <img src="https://img.shields.io/github/license/gxr404/comic-book-browser" alt="GitHub License">
  <br>
</p>

## 动机

平常喜欢看漫画的人肯定有体验过在网页看漫画，看着看着就突然弹出各种跳花里胡哨的小广告, 不小心点到还跳转到广告网站，体验非常差。

因此我就想开发一套离线本地存储的漫画书架，可以轻松管理平时关注的漫画，且无广告界面简洁，一些经典完结的漫画也可以当收藏存到自己的硬盘里，由此诞生了该项目🤔。

## 安装

```bash
npm i -g comic-book-browser
```

## 用法

```bash
$ comic-book-browser --help

  Usage:
    $ comic-book-browser <command> [options]

  Options:
    -d, --bookPath <dir>  漫画目录(comic-book所在的目录) eg: -d . (default: .)
    -p, --port <port>     服务启动的端口号 eg: -p 3000 (default: 3000)
    -h, --help            Display this message
    -v, --version         Display version number
```

### Start

使用 [comic-book-dl](https://github.com/gxr404/comic-book-dl) 下载完漫画后在当前含有`comic-book`目录
执行:

```bash
# 当前目录需含有 comic-book文件夹
$ comic-book-browser

> comic-book-browser [INFO]:  \(^o^)/ 服务已启动 请用浏览器打开 http://127.0.0.1:3000
```

> PS: 当然也可以不使用`comic-book-dl` 只要当前目录符合结构即可正常启动，注意的是 `bookInfo.json`里的字段得有且符合对应结构

```bash
.
└── comic-book
    ├── <漫画名>
    │   ├── bookInfo.json
    │   ├── cover.jpg
    │   └── chapters
    │       ├── 第01话
    │       │       └── xxx.jpg
    │       ....
```

### 界面

`comic-book-browser`提供了两套主题、适配移动端、界面简洁

<img width="500" src="./docs/view-1.png" alt="view-1">
<img width="500" src="./docs/view-2.png" alt="view-2">
<img width="500" src="./docs/view-3.png" alt="view-3">
<img width="370" src="./docs/view-4.png" alt="view-4">
<img width="370" src="./docs/view-5.png" alt="view-5">

## 功能与建议

目前项目处于开发初期, 如果你对该项目有任何功能与建议，欢迎在 Issues 中提出
