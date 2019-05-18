import React, { ReactNode, Component } from 'react'
import * as cx from 'classnames'
import { ExternalLink } from '../common/link'
import { Changelog } from './Changelog'
import { APP_WEBSITE } from 'constants/http'

import styles from './MenuTabs.css'
import { t } from 'locale'
import { Fetch } from '../common/Fetch'

interface IProps {
  className?: string
}

interface IState {
  value: number
}

export class MenuTabs extends Component<IProps, IState> {
  state: IState = { value: 0 }

  render() {
    const tabs = [
      { label: t('welcome'), render: () => <WelcomeMessage /> },
      { label: t('changelog'), render: () => <Changelog /> },
      { label: t('donators'), render: () => <Donators /> }
    ]
    const selected = tabs[this.state.value]

    return (
      <div className={styles.container}>
        <ul className={styles.tabList}>
          {tabs.map((t, idx) => (
            <li
              key={idx}
              className={cx(styles.tabItem, {
                [styles.selected]: selected === t
              })}
            >
              <button className={styles.tabButton} onClick={() => this.setState({ value: idx })}>
                <span className={styles.tabLabel}>{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.content}>{selected && selected.render()}</div>
      </div>
    )
  }
}

const WelcomeMessage: React.SFC = () => (
  // TODO: l10n?
  <>
    <p style={{ background: 'red', color: '#ffffff', padding: '0.3rem 0.5rem' }}>
      This software has been deprecated in favor of a new web application. Continued use of this
      software will put your computer at risk due to possible security vulnerabilities.
      <br />
      <br />
      Please check out{' '}
      <ExternalLink href="https://app.getmetastream.com">app.getmetastream.com</ExternalLink> for
      the new version of the application.
    </p>
  </>
)

const Donators: React.SFC = () => (
  <Fetch cacheKey="donators" href={`${APP_WEBSITE}app/donators.txt`}>
    {data => <p style={{ whiteSpace: 'pre-wrap' }}>{typeof data === 'string' ? data : ''}</p>}
  </Fetch>
)
