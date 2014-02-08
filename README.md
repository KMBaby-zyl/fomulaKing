fomulaKing
==========

show latex math fomulas both in html5-canvas and node-canvas


#node版的fomulaKing

>node版latex公式解析依赖node-canvas。 node-canvas的安装比较繁琐，可以参考网上教程。
>
>node app.js即可访问 127.0.0.1:80 试试demo。 
>
>注意：现在解析版本还不是最新版，有的公式不能解析。

Windows 下成功安装node-canvas
======
最近项目需要用到 node-canvas 这个图形模块, 但是在Windows下其安装颇费周折, 经过一天试探,终于搞定了, 下面分享给大家:

1.先安装 Python;  通过Python 官网 http://www.python.org/getit/ 下载并安装最新版本.  然后将Python 的安装目录(如: C:\Program Files\Python) 添加到PATH环境变量中;

2.安装node-gyp 或将 npm 升级到内含 node-gyp 的版本  (nodejs v0.6.13以上的 npm 已内置了node-gyp, 则此步可以略过);

3.再安装 Visual C++ 2010 Express; 因为需要用到其中的MSBuild 用以编译 cairo 类库到本地代码; 微软官方获取: http://www.microsoft.com/visualstudio/en-us/products/2010-editions/visual-cpp-express  (VC++下载和安装的过程很漫长,需要耐心等待);

4.还要下载包含 cairo 图形处理库的GTK包:
 http://cairographics.org/download/  , 选gtk+-bundle_2.24.10-20120208_win32 或最新版,

5.将下载的GTK包解压到 C:\GTK\ 目录(必须是这个目录名,否则接下来的MSBuild编译可能通不过), 

6.在Windows环境变量PATH  后添加 C:\GTK\bin 目录 (需要注销Windows重新登录才能全局生效),    以供 canvas 运行时调用cairo的动态链接库 libcairo-2.dll 等;

7.最后 npm install canvas , 期间将自动运行MsBuild 编译生成 canvas.node 本地目标库,
   生成的目标库位于 path\to\node_modules\canvas\build\Release\canvas.node;

8.DOS命令行下: CD 进入 canvas\build\Release\ 这个目录, 运行 node 测试canvas是否安装成功:
C:\path\to\node\node_modules\canvas\build\Release> node.exe

 var  canvas = require('./canvas'); 
若显示 undefined , 而不是错误信息 ,应该就安装成功了.
若显示Unable to load shared library 则可能是 GTK\bin 目录未在PATH路径中,添加上即可.

参考说明:
https://github.com/LearnBoost/node-canvas/wiki/Installation---Windows

原版其实是html5 canvas版本，用excanvas兼容了ie
如果有人需要的话请留言，我会放到git上。
