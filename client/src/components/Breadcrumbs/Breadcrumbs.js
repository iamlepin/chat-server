import React, { Fragment } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const getBreadcrumbsItems = (links = []) => {
  return links.map((link, index, arr) => {
    const linkUrl = '/' + arr.slice(0, index + 1).join('/')
    return (
      <Breadcrumb.Item key={link}>
        <Link to={linkUrl}>
          { link }
        </Link>
      </Breadcrumb.Item>
    )
  })
}

const Breadcrumbs = ({ links }) => (
  <Breadcrumb separator=">" style={{ margin: '8px 34px' }}>
    {getBreadcrumbsItems(links)}
  </Breadcrumb>
)

export default Breadcrumbs
