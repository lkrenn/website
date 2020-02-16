import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Layout from '../../components/Layout2'
import quantData from './../../data/quant'

class quantIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    return (
      <Layout>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`quant | ${siteTitle}`}
        />
        <h2>Quantitative Finance Notes</h2>
        <br />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Grid fluid>
            <Row>
              {quantData.map(p => (
                <Col xs={12} sm={12} md={6} lg={6} key={p.title}>
                  <Link to={p.location} state={p} key={p.title}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 250,
                          height: 250,
                          margin: 10,
                          background: `url(${p.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center center',
                        }}
                      />
                      <p>{p.title}</p>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
      </Layout>
    )
  }
}

export default quantIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
