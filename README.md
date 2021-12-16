# Hahow Interview
* [requirements](https://github.com/hahow/hahow-recruit/blob/master/frontend.md)

## How to Use It

#### Development Mode
1. `npm i`
2. `npm run dev`

#### Production Mode
1. `npm i`
2. `npm run build`
3. `npm run start`


## 專案架構
* webpack
    * 進行所有 code 的打包，壓縮等，最後輸出在 `dist` 的資料夾裡，依照不同的 mode，dist 會分別是在 memory 和 disk 裡面。
    * 分成 development 和 production mode 兩個，有不同的設定，在 `webpack` 這個資料夾裡面可以檢視

* express server
    * 用做 http server 服務

* render
    * client-side rendering

* state management
    * 由 react hook 來管理

* API
    * 仿 Apollo 做出三種資料存取 hooks
        1. useLazyQuery
        2. useMutation
        3. useQuery

* In Memory Cache
    * 仿 Apollo Cache 行為，cache API 回傳的 HeroProfile 資料

## 第三方 libraries
* babel
    * 是個 compiler，用來轉換不同時代的 JS，解決恐龍時代 browser 看不懂或是最新語法不支援等問題。
* eslint將
    * code style 標準，讓大家的 code 都長很像，跟雙胞胎一樣。
* express
    * 用來製作 http server 來服務網頁
* webpack
    * 打包工具，程式界萬能整理師。
* normalize.css
    * 重置 browser 的 default style， 讓 cross browser 有一致的基本樣式。
* react
    * 前端 framework，加快 UI 的開發。
* react-router
    * 幫助 client-side routing
* styled-components
    * css in js
        * 優點
            * 好測試
            * 切分 style 和 component 邏輯

## 註解的原則
* 我印象很深刻，在一份說明 clean code 的文件中有提到，寫註解，不是在寫註解，是在跟看的人道歉，我覺得很好笑，也滿有道理的。通常我只有會在有 ToDo 的情況下才會寫註解。或是 function 的 parameters type, return type 等等，但這可以被 typescript 解決，所以好像也不需要了。這一塊可能還需要你們給我一些建議。

## 小困難
* 困難：想要仿造 Apollo 的資料抓取行為，由於我使用它的經驗不多，所以寫的有點卡。
* 解決辦法：看它的 document 研究一下行為，造抄。
