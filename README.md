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

### 界面

`comic-book-browser`提供了两套主题、适配移动端、界面简洁

![view-1](./docs/view-1.png)
![view-2](./docs/view-2.png)
![view-3](./docs/view-3.png)
![view-4](./docs/view-4.png)
![view-5](./docs/view-5.png)

## 功能与建议

目前项目处于开发初期, 如果你对该项目有任何功能与建议，欢迎在 Issues 中提出
