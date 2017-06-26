import Document, { Head, Main, NextScript } from 'next/document'

import { properties as DOMProperties } from 'react-dom/lib/DOMProperty'
import { DOMProperty } from 'react-dom/lib/ReactInjection'
import { ServerStyleSheet } from 'styled-components'
import appConfig from '../conf/app-config.json'
import { get } from 'lodash'
import globalStyleSheet from '../styles/index.scss'

const _ = {
  get,
}

// By default React limit the set of valid DOM elements and attributes
// (https://github.com/facebook/react/issues/140) this config whitelist
// Amp elements/attributes
if (typeof DOMProperties.amp === 'undefined') {
  DOMProperty.injectDOMPropertyConfig({
    Properties: { amp: DOMProperty.MUST_USE_ATTRIBUTE },
    isCustomAttribute: attributeName => attributeName.startsWith('amp-'),
  })
}


// normal HTML renderer
const CanonicalHTML = (props) => {
  const { commonHeaders, styleTags, main, pathname } = props
  return (
    <html lang="zh-TW">
      <Head>
        {commonHeaders}
        <link rel="amphtml" href={`${appConfig.url}/amphtml${pathname}`} />
        <style dangerouslySetInnerHTML={{ __html: globalStyleSheet }} />
        <script dangerouslySetInnerHTML={{ __html: '(function(d) {var config = {kitId: \'lwr8ggq\',scriptTimeout: 3000,async: true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src=\'https://use.typekit.net/\'+config.kitId+\'.js\';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);' }} />
        {styleTags}
      </Head>
      <body>
        <div className="root">
          {main}
        </div>
        <NextScript />
      </body>
    </html>
  )
}

// Google AMP HTML renderer
const AmpHTML = (props) => {
  const { commonHeaders, styleTags, main, pathname } = props
  return (
    <html lang="zh-TW" amp="">
      <Head>
        {commonHeaders}
        <link rel="canonical" href={appConfig.url + pathname} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
        <style amp-boilerplate="">{'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}'}</style>
        <noscript><style amp-boilerplate="">{'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}'}</style></noscript>
        {styleTags}
        <script async src="https://cdn.ampproject.org/v0.js" />
      </Head>
      <body>
        <div className="root">
          {main}
        </div>
        <NextScript />
      </body>
    </html>
  )
}

export default class MyDocument extends Document {
  static async getInitialProps({ query, pathname }) {
    const isAmp = _.get(query, 'isAmp', false)
    return {
      isAmp,
      pathname,
    }
  }

  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    const { isAmp, pathname } = this.props
    const commonHeaders = [<meta charSet="utf-8" />,
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />,
      <link href="https://www.twreporter.org/asset/favicon.png" rel="shortcut icon" />,
      <title>Reporter</title>]
    const props = { main, styleTags, commonHeaders, pathname }

    if (isAmp) {
      return (<AmpHTML {...props} />)
    }
    return (<CanonicalHTML {...props} />)
  }
}
