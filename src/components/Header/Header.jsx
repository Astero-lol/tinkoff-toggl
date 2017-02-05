import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<header className="header">
				<div className="header__content">
                    {this.props.children}
				</div>
			</header>
		)
	}
}

export default Header