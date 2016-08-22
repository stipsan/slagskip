import DocumentTitle from 'react-document-title'

import cx from 'classnames'

const Forgot = () => <DocumentTitle title="Epic | Forgot your password?">
  <section className={cx('hero')}>
    <div className={cx('heroContent')}>
      <div className={cx('container')}>
        <h1 className={cx('title')}>{'Forgot your password?'}</h1>
        <p>{
          'This feature is not implemented yet. An evaluation wether to use SendGrid or MailGun' +
          ' is in progress and as soon that\'s decided work on this feature will begin.'
        }</p>
        <p>&nbsp;</p>
        <p>{
          'Meanwhile you can contact me directly on stipsan@gmail.com and I\'ll help you out.'
        }</p>
      </div>
    </div>
  </section>
</DocumentTitle>

export default Forgot
