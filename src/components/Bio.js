import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './../assets/images/avatar.png'
import { rhythm } from '../utils/typography'
import bioData from './../data/bio'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <p>{bioData}</p>
      </div>
    )
  }
}

export default Bio
