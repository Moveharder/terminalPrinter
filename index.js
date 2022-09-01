export default class packageName {
  constructor({
    rootSelector = "",
    prefix = "",
    duration = 60,
    autoScroll = true,
  }) {
    this.globalRootSelector = rootSelector; //.tag or #tag
    this.globalAutoScroll = autoScroll; //若最新的内容不在视野内，自动滚动到视野内
    this.globalPrefix = prefix || "";
    this.globalDuration = duration;
    this.insertDefaultStyles();

    if (!rootSelector) {
      throw new Error("未指定的根结点[rootSelector] （.tagname or #tagname）");
    }
  }
  insertDefaultStyles() {
    // 打字动画
    document.styleSheets[0].insertRule(
      `@-webkit-keyframes believer_terminalprinter_typing_amt {
        0%,
        100% {
            color: rgba(255, 255, 255, 0.9);
        }

        50% {
            color: transparent;
        }
        }`,
      0
    );
    document.styleSheets[0].insertRule(
      `@keyframes believer_terminalprinter_typing_amt {
        0%,
        100% {
            color: rgba(255, 255, 255, 0.9);
        }

        50% {
            color: transparent;
        }
        }`,
      0
    );

    // 默认[已输出] 行样式
    document.styleSheets[0].insertRule(
      `
        .believer_terminalprinter_actor {
            position: relative;
            display: block;
            line-height: 100%;
            text-align: left;
            width: auto;
            padding: 10px 0;
            font-family: Monaco, Menlo, 'Courier New', monospace, sans-serif, "Arial";
            color: black;
            font-size: 14px;
        }
        `,
      0
    );

    // 默认[输出中] 行样式
    document.styleSheets[0].insertRule(
      `
        .believer_terminalprinter_on_typing {
            display: inline-block !important;
        }
        `
    );
    // 默认[输出中] 行样式
    document.styleSheets[0].insertRule(
      `
        .believer_terminalprinter_on_typing::after {
            content: "_";
            width: 10px;
            height: calc(100% - 20px);
            position: absolute;
            top: 10px;
            right: -14px;
            animation: believer_terminalprinter_typing_amt 0.3s steps(1) infinite;
        }
        `
    );
  }
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
  async linePrint({
    rootSelector,
    lineSelector,
    word,
    hasOnTypingStyle = true,
    prefix = "",
    duration,
    lineStyleObject = {},
    tagName = "code",
    onLineStart = null,
    onLinePrint = null,
    onLineFinished = null,
  }) {
    let rootDom = document.querySelector(rootSelector);
    if (!rootDom) {
      throw new Error("未找到指定的根结点[rootSelector]元素");
    }

    let lineDom = document.querySelector(lineSelector);
    if (!lineDom) {
      lineDom = document.createElement(tagName);
      lineDom.classList.add("believer_terminalprinter_actor");
      rootDom.appendChild(lineDom);
    }

    if (hasOnTypingStyle) {
      lineDom.classList.add("believer_terminalprinter_on_typing");
    }

    // 将不存在的domclass添加到lineDom
    if (lineSelector && lineSelector.startsWith(".")) {
      lineDom.classList.add(lineSelector.replace(/./, ""));
    }

    // 附加样式
    for (const key in lineStyleObject) {
      if (Object.hasOwnProperty.call(lineStyleObject, key)) {
        lineDom.style[key] = lineStyleObject[key];
      }
    }

    return new Promise(async (resolve) => {
      let start = 0;
      let len = word.length;
      let inputWord = "";

      // 触发：行开始输出钩子
      onLineStart && onLineStart();
      // 当前输出行自动进入视野
      this.globalAutoScroll && lineDom.scrollIntoView(true);

      for (let i = 0; i < len; i++) {
        inputWord = word.substring(start, i + 1);
        lineDom.innerHTML = `${prefix || this.globalPrefix} ${inputWord}`;

        // 触发：行输出中钩子
        onLinePrint && onLinePrint();
        await this.sleep(duration ?? this.globalDuration);
      }

      //remove ontyping style
      lineDom.classList.contains("believer_terminalprinter_on_typing") &&
        lineDom.classList.remove("believer_terminalprinter_on_typing");

      // 触发：行完成输出钩子
      onLineFinished && onLineFinished();

      resolve(word);
    });
  }

  run(words) {
    let printerRootEl = document.querySelector(this.globalRootSelector);
    if (!printerRootEl) {
      throw new Error("未找到指定的根结点[rootSelector]元素");
    }
    return new Promise(async (resolve) => {
      for (let i = 0; i < words.length; i++) {
        if (!words[i].rootSelector) {
          words[i].rootSelector = this.globalRootSelector;
        }
        await this.linePrint(words[i]);
        // this.globalAutoScroll && printerRootEl.scrollIntoView(true);
      }
      resolve("words print completed!");
    });
  }

  sleep(ms = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }
}
