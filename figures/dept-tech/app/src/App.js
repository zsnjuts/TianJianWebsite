import React from 'luy'
const style = require("raw-loader!./style1.txt") //注意使用raw-loader解析字符串
const style2 = require("raw-loader!./style2.txt")
const introduction = require("raw-loader!./introduction.txt")
import showdown from 'showdown' //第三方的一个开源markdown库
import Prism from 'prismjs'//第三方的一个开源的代码染色库，非常好用
let interval

import './preStyle.css' //就是预先放置的一个css

const wirteChars = (that, nodeName, char) => new Promise((resolve) => {
    setTimeout(() => {
        if (nodeName == 'workArea') {
            const origin = that.state.DOMStyleText + char
            const html = Prism.highlight(origin, Prism.languages.css)
            that.setState({
                styleText: html,
                DOMStyleText: origin
            })
            
            that.contentNode.scrollTop = that.contentNode.scrollHeight
        } else if (nodeName == 'introduction') {
            const originResume = that.state.resumeText + char
            const converter = new showdown.Converter()
            const markdownResume = converter.makeHtml(originResume)
            that.setState({
                resumeText: originResume,
                DOMResumeText: markdownResume
            })
            that.resumeNode.scrollTop = that.resumeNode.scrollHeight
        }
        /* 这里是控制，当遇到中文符号的？，！。的时候就延长时间  */
        if (char == "？" || char == "，" || char == '！' || char == '。') {
            interval = 800
        } else {
            interval = 10
        }
        resolve()//一定要写的promise函数，不然你无法获得promise结果
    }, interval)
})

const writeTo = async (that, nodeName, index, text) => {
    /* 一个字一个字的读咯,这样会获得丝滑柔顺的打字效果... */
    let speed = 1
    let char = text.slice(index, index + speed)
    index += speed
    if (index > text.length) {
        return//如果字打完了，就返回了
    }
    await wirteChars(that, nodeName, char)
    await writeTo(that, nodeName, index, text)
}

export default class Content extends React.Component {
    constructor(...prop) {
        super(...prop)
        this.state = {
            styleText: ``,
            DOMStyleText: ``,
            resumeText: ``,
            DOMResumeText: ``
        }

    }
    componentDidMount() {
        (async (that) => {//这里的这个函数中文名叫做「定义即运行函数」，其实就是定义了马上运行。
            await writeTo(that, 'workArea', 0, style)
            await writeTo(that, 'introduction', 0, introduction)
            await writeTo(that, 'workArea', 0, style2)
        })(this)
    }
    render() {
        return (
            <div>
                <div
                    className='workArea'
                    ref={(node) => { this.contentNode = node }}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.state.styleText }}></div>
                    <style dangerouslySetInnerHTML={{ __html: this.state.DOMStyleText }}></style>
                </div>
                <div
                    className='introduction'
                    dangerouslySetInnerHTML={{ __html: this.state.DOMResumeText }}
                    ref={(node) => { this.resumeNode = node }}
                >
                </div>
                
            </div>
        )
    }
}

