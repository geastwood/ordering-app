import React = require('react')
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export default ({
  path,
  children,
}: {
  path: string
  children: React.ReactNode
}) => (
  <Link component={RouterLink} to={path}>
    {children}
  </Link>
)
