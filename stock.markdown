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

##第二题:用matlab或者R软件，使用上证指数一年日数据，计算对数收益率，均值，波动率
<pre>
用xlsread读取excel的第五列的第三行到第246行，存放到矩阵B中（使用收盘价）
</pre>
``` python
B=xlsread('F:\金融数学\111.xlsx',1,'E3:E246') 
```
* 对数收益率
``` python
%将日指数转化为日收益率
log_ret=price2ret(B)
%再生成图像
plot(log_ret)
```
####最终得到图片如下：
![对数收益率](https://raw.githubusercontent.com/mingshi/AboutMe/master/stock2.png)

<pre>
还有另外一种对数收益率的计算方式，循环将每日的对数收益率计算出来, 如下：
</pre>

``` python
%样本的天数一共为244天
n=244;
%循环从2开始，因为要拿第二天的对比第一天的数据
for i=2:244;
    Ds(i)=log(B(i)/B(i-1));
    i=i+1;
end;
%Ds便是对数收益率的矩阵
plot(Ds);
```
<pre>
经测试，这种方法画出来的图和上面一种一致
</pre>

* 均值

    * 样本均值
``` python
用mean函数直接计算均值
mean(B);
得出结果: 3.7216e+03 = 3721.6;
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    * 对数收益率均值
``` python
mean(Ds); %直接用mean函数对上面得到的对数收益率进行均值计算
```

* 波动率
``` python
avg=mean(log_ret); %利用上面得到的对数收益率log_ret(或者Ds)算出对数收益率均值
diff=log_ret-avg; %计算对数收益率差值
std=sqrt(sum(diff.^2)/(n-1)); %计算对数收益率标准差,n为上面定义的天数244，因为第一天没有对比天数，所以要减1
wave=std.*sqrt(n-1); %公式，标准差乘以天数－1的开根号
```
<pre>
最终得到波动率为：0.3839  即：38.39%
</pre>
