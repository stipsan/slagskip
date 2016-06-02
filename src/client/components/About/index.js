import DocumentTitle from 'react-document-title'

import cx from './style.scss'

const About = () => <DocumentTitle title="Epic | What's Epic?">
  <section className={cx('hero')}>
    <div className={cx('heroContent')}>
      <div className={cx('container')}>
        <h1 className={cx('title')}>{'What\'s Epic?'}</h1>
        <p>{
          'It\'s a game built on the very best tools available today to serve as a reference ' +
          ' implementation of industry best practices.'
        }</p>
        <p>&nbsp;</p>
        <p>{
          'There are many tutorials available in the JavaScript community that teach you how to ' +
          ' get the ultimate workflow when coding. Few, however, showcase the best solutions to ' +
          ' real world problems you\'ll face taking it into production.'
        }</p>
        <p>&nbsp;</p>
        <p>{
          'Learning how to get the whole continueus integration cycle right is hard, ' +
          'and most examples out there focus on only a part of the whole picture.'
        }</p>
        <p>&nbsp;</p>
        <p>{
          'This project shows you how to setup automatic testing, automatic deployment and  ' +
          'everything else you need to know in order to ship a high quality product and ' +
          'continue iterating it after it\'s released.'
        }</p>
        <p>&nbsp;</p>
        <p>
          {'Everything is available on '}
          <a href="https://github.com/stipsan/epic" target="_blank">{'GitHub'}</a>
        </p>
      </div>
    </div>
  </section>
</DocumentTitle>

export default About
