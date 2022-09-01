### easy-terminal-printer
Simulate command line, typewriter output, dialogue output, easy to configure and easy to use!

#### Install

> npm i easy-terminal-printer --save

### Usages

#### 基本用法

```
<div id="root_container"></div>
```

```
<script type="module">
    import TerminalPrinter from './index.js';

    let tp = new TerminalPrinter({
        rootSelector:'#root_container',
        prefix:'[ iTerm2 ]',
        duration: 60
    });

    let words = [
        {
            word:'hello world.',
        },
        {
            prefix:'[ Cool Prefix ]',
            word:'这句话前面有签名',
        },
        {
            word:'hi 😄 😈 👨 👩 🧒 👴 👵',
            lineStyleObject:{
                fontSize: '20px',
                color:'orange'
            }
        },
        {
            word:'指定tagName为H3，全英文内容在微信中可能出现翻译字样',
            tagName: 'h3'
        },
        {
            prefix:'Rose: ',
            word:'Goodbye Jack...',
        },
        {
            prefix:'Jack: ',
            word:'You jump, i jump.',
        },
        {
            prefix:'Rose: ',
            word:'cool ~',
        },
        {
            prefix:'',
            word:'Amazing! 男女主殉情，全剧终！',
        },
        { 
            prefix:'[Loading]',
            word:'3',
            duration: 1000,
            lineSelector:'.loading',
            hasOnTypingStyle: false
        },
        { 
            prefix:'[Loading]',
            word:'2',
            duration: 1000,
            lineSelector:'.loading',
            hasOnTypingStyle: false
        },
        { 
            prefix:'[Loading]',
            word:'1',
            duration: 1000,
            lineSelector:'.loading',
            hasOnTypingStyle: false
        },
        { 
            prefix:'[Loading]',
            word:'💥💥',
            lineSelector:'.loading',
            hasOnTypingStyle: false
        },
        { 
            prefix:'[Title]',
            word:'1.我是指定rootSelecto[父元素]的一句话',
            rootSelector:'.title',
            hasOnTypingStyle: false
        },
        { 
            prefix:'[Title]',
            word:'2.我是指定rootSelecto[父元素]的一句话',
            rootSelector:'.title',
            hasOnTypingStyle: false
        },
        {
            word:'hello my terminal printer lines.',
            onLineStart: ()=>{
                console.log('on line Start')
            },
            onLinePrint: ()=>{
                console.log('on line Print')
            },
            onLineFinished: ()=>{
                console.log('on line Finished')
            }
        },
    ];

    tp.run(words).then(res=>{
        console.log('well done! do sth else')
    });
</script>

```

#### 构造函数说明
- `rootSelector` 所有行内容的父容器
- `prefix` 所有行内容的前缀签名内容
- `duration` 所有行内容，每个字符输出所需要的时间，越大越慢，默认 60（ms）
- `autoScroll` 自动将最新内容滚动到视野内，默认 `true`

```
let tp = new TerminalPrinter({
    rootSelector:'#root_container',
    prefix:'[ iTerm2 ]',
    duration: 60,
    autoScroll: false,
});
```

#### 参数说明

> `word` 行内容的所有配置如下

```
/**
   * 命令行输出效果
   * @param {*} param obj
   * @param obj.rootSelector 每一行输出后会被放在哪个html容器里
   * @param obj.lineSelector 当前行内容输出在哪个html容器里
   * @param obj.word 当前行要输出的内容
   * @param obj.hasOnTypingStyle 是否有打字效果，默认 true
   * @param obj.prefix 当前行要输出内容的前缀
   * @param obj.duration 单个字符输出所需时间，默认 null，越大越慢
   * @param obj.lineStyleObject 行样式，默认 {}
   * @param obj.tagName 行内容包裹标签，默认 code，可防止页面提示翻译
   * @param obj.onLineStart 行开始输出钩子
   * @param obj.onLinePrint 行输出中钩子
   * @param obj.onLineFinished 行完成输出钩子
   *
   * return Promise
   */
```

> 参数 [`rootSelector`] 独立指定每行内容的根元素容器

```
let words = [
    {
        rootSelector:'.title',
        prefix:'[指定根元素容器]',
        word:'1.我是指定rootSelecto的一句话',
        duration: 50
    },
    ...
]

```

> 参数 [`prefix`] 指定行内容输出的前缀签名内容（无逐字输出效果），可用于普通输出或者模拟「对话模式」

```
let words = [
    {
        prefix:'Rose: ',
        word:'Goodbye Jack...',
        duration: 100
    },
    {
        prefix:'Jack: ',
        word:'You jump, i jump.',
        duration: 100
    },
    {
        prefix:'Rose: ',
        word:'cool ~',
        duration: 100
    },
    ...
]

```

> 参数 [`hasOnTypingStyle`] 开关打字效果，默认开启（等待输入后缀）

```
let words = [
    {
        hasOnTypingStyle: false,
        prefix:'[指定根元素容器]',
        word:'1.我是指定rootSelecto的一句话',
        duration: 50
    },
    ...
]
```

> 参数 [`lineStyleObject`] 【单行】设置行内容样式

```
let words = [
    {
        word:'hi 😄 😈 👨 👩 🧒 👴 👵',
        duration: 100,
        lineStyleObject:{
            fontSize: '20px',
            color:'orange',
            background: 'white'
        }
    },
    ...
]
```

> 参数 [`tagName`] 指定包裹行内容的`HTML`标签名称

```
let words = [
    {
        word:'指定tagName为H3，全英文内容在微信中可能出现翻译字样',
        duration: 100,
        tagName: 'h3'
    },
    ...
]
```

#### 事件钩子

> 事件 [`onLineStart`] 每行内容开始输出前触发
```
let words = [
    {
        word:'hello my terminal printer lines.',
        duration: 80,
        onLineStart: ()=>{
            console.log('on line Start: 播放敲键盘声音')
        },
    },
    ...
]
```

> 事件 [`onLinePrint`] 每行内容输出过程中持续触发
```
let words = [
    {
        word:'hello my terminal printer lines.',
        duration: 80,
        onLinePrint: ()=>{
            console.log('on line Print')
        },
    },
    ...
]
```

> 事件 [`onLineFinished`] 每行内容完成输出后触发
```
let words = [
    {
        word:'hello my terminal printer lines.',
        duration: 80,
        onLineFinished: ()=>{
            console.log('on line Finished：结束敲键盘声音')
        }
    },
    ...
]

```

> [`run`] 函数返回一个 `Promise`，在所有行内容输出完毕后执行resolve
```
tp.run(words).then(res=>{
    console.log('well done!')
});
```

#### 可重写的样式类

> 样式类名 [`.believer_terminalprinter_on_typing`] 指定打字过程样式

```
/* 重写输出中的行样式 */
#root_container .believer_terminalprinter_on_typing{
    background-color: white;
}
#root_container .believer_terminalprinter_on_typing::after{
    content: '✍️';
}

```

> 样式类名 [`.believer_terminalprinter_actor`] 【全局】指定行内容样式
```
#root_container .believer_terminalprinter_actor{
    position: relative;
    display: block;
    font-size: 14px;
    line-height: 30px;
    text-align: left;
    width: auto;
    font-family: Monaco, Menlo, 'Courier New', monospace, sans-serif, "Arial";
    color: aqua;
}
```

#### 附加说明
- 默认值为空的参数配置生效规则：优先采用`word`中的配置，其次考虑实例化时传给构造函数的配置。(目前只有`rootSelector`，`prefix`，`duration` 默认60ms)

- 如果`word`内容大多是英文，在微信中打开的H5页面，顶部会出现“翻译”字样，导致无法看到网页`title`。所以此库输出的每行内容默认采用`"code"`标签包裹，你也可以通过指定`tagName`配置参数，设置为其它HTML内容展示标签。

