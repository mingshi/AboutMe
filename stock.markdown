#学号：16222010260 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 姓名：施明

##第一题:用matlab或者R软件生成股票的随机样本路径，100条，S＝1，mu＝0.05，sigma＝0.5，T＝1

####Code:
``` python
%AssetPath.m
function SPaths=AssetPath(S0,mu,sigma,T,NSteps,NRepl) %定义function
    dt=T/NSteps;
    nudt=(mu-0.5*sigma^2)*dt;
    sidt=sigma*sqrt(dt);
    Increments=nudt+sidt*randn(NRepl,NSteps);%dt步长的股价对数差分
    LogPaths=cumsum([log(S0)*ones(NRepl,1),Increments],2);%累加矩阵各行
    SPaths=exp(LogPaths);
```

``` python
%HtPath.m
    randn('seed',0);%获得随机种子
    paths=AssetPath(1,0.05,0.5,1,365,100); %调用方法
    plot(1:length(paths),paths) %画出100条线
    xlabel('时间')
    ylabel('股票价格')
```
####最终得到图片如下：
![股票随机样本路径](https://raw.githubusercontent.com/mingshi/AboutMe/master/stock1.png)

