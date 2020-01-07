import React from 'react'
import { Link } from 'gatsby'
import { Grid, Box } from '@material-ui/core'

const Menu = function(props) {
	return (
			<Grid container direction="row" alignItems="center" justify="space-between">
				<Grid item>
					<div id="header">
						<h1><Link to="/">Murilo Polese</Link></h1>
					</div>
				</Grid>
				<Grid item>
					<div id="menu">
						<Box mx={1} component="span"><Link to="/workshops">WORKSHOPS</Link></Box>
						<Box mx={1} component="span"><Link to="/developer">DEV</Link></Box>
						<Box mx={1} component="span"><Link to="/buildlogs">LOGS</Link></Box>
					</div>
				</Grid>
			</Grid>
	)
}

export default Menu
