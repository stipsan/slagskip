import DocumentTitle from 'react-document-title'

import cx from './style.scss'

const Loading = () => <DocumentTitle title="Epic | Loading...">
  <section className={cx('hero')}>
    <div className={cx('heroContent')}>
      <div className={cx('container')}>
        <h1 className={cx('title')}>{'Loading…'}</h1>
      </div>
    </div>
  </section>
</DocumentTitle>

export default Loading
