/* eslint no-undef: 1 */

const browsers = global.SUPPORTED_BROWSERS
const iconStyle = Object.freeze({height: '64px', width: '64px'})

function UnsupportedBrowser() {
  return <section className="section section--unsupported-browser">
      <h2>Your browser isn't supported</h2>
      {browsers && <p>Recommended browsers:</p>}
      {browsers && <p>{browsers.map(browser => <a 
        href={`http://lmgtfy.com/?q=${browser.name}`}
        title={`${browser.name} ${browser.y} or later`}
        target="_blank"
      >
          <img src={`/browser/${browser.name}.svg`} style={iconStyle} />
          <span>{browser.name}</span>
      </a>)}</p>}
  </section>
}

export default UnsupportedBrowser