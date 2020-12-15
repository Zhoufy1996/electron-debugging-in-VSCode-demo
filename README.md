## VS Code 断点调试 Electron 主进程与渲染进程

#### 目标

-   [ ] 断点调试主进程

-   [ ] 断点调试渲染进程

#### 问题

1. Electron 调试主进程
2. webpack 的`devtool`
3. Electron 的`remote-debugging-port`
4. vscode 调试
5. Electron 代码调用顺序
6. 如何判断本地文件已经映射到调试端口
7. chrome 远程调试端口

#### 记录

1. 如果要用 babel 等进行转换，主进程代码需要 sourcemap.

2. `remote-debugging-port`, 开启 chrome 远程调试端口，在主进程 loadUrl 后，会建立 WebSocket 连接，将 vscode 打开的项目源代码映射到渲染进程的 devtool.

3. 由主进程打开 远程调试端口，devServer 监听端口，vscode 需要将代码映射到远程调试端口，否则渲染进程 devtool 的 source 用到的是 devServer 内存中的代码，没有连接 vscode.

vscode -> chrome remote -> renderer process

devServer -> renderer process

#### 参考资料：

> https://github.com/Microsoft/vscode-recipes/tree/master/Electron
>
> https://code.visualstudio.com/docs/editor/debugging
>
> https://stackoverflow.com/questions/48091899/electron-main-and-renderer-process-debug-configuration
>
> https://kwonoj.github.io/en/post/multi-target-dbg-electron-vscode/
>
> https://juejin.cn/post/6844903922449006605
