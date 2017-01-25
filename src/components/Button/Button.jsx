import React from 'react';

function Buttom(props) {
	return(
		<button {...props} className={`button ${props.className !== undefined ? props.className : ''}`} >
			{props.children}
		</button>
	)
}

export default Buttom;