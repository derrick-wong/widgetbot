import * as React from 'react'
import { connect } from 'react-redux'

import { toggle, toggleNotifications } from '../../store/actions'
import { State } from '../../types/store'
import { getAccent } from '../../util/parse'
import { Icons, Indicator, Root } from './elements'

interface DispatchProps {
  onToggleState: () => void
}

interface StateProps {
  color: string
  open: boolean
  unread: number
  indicator: boolean
}

class Button extends React.PureComponent<StateProps & DispatchProps> {
  render() {
    const { onToggleState, open, indicator, color, unread } = this.props

    const accent = getAccent(color)
    const showIndicator = indicator && !open

    return (
      <Root onClick={onToggleState} className="button">
        <Icons.Root className="icons">
          <Icons.Close className="close" />
          <Icons.Open className="open" color={accent} />
        </Icons.Root>
        {showIndicator && unread > 0 && <Indicator value={unread}>{unread > 50 ? `50+` : unread}</Indicator>}
      </Root>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  ({ open, unread, options }) => ({
    color: options.color,
    indicator: options.indicator,
    open,
    unread
  }),
  dispatch => ({
    onToggleState: () => dispatch(toggle(null))
  })
)(Button)
