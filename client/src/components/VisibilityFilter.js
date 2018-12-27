import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { VISIBILITY_FILTERS } from '../constants'
import { setFilter } from '../redux/actions.js'

const VisibilityFilter = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filter">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey]
        return (
          <span
            key={filterKey}
            className={cx(currentFilter === activeFilter && "active")}
            onClick={() => setFilter(currentFilter)}
          >
            {currentFilter}
          </span>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter }
}

export default connect(mapStateToProps, { setFilter })(VisibilityFilter)