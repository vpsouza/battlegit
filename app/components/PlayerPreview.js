import PropTypes from 'prop-types';
import React, { Component } from 'react';

const PlayerPreview = ({avatar,userName,children}) => (
	<div>
		<div className='column'>
			<img 
				className='avatar'
				src={avatar}
				alt={'Avatar for ' + userName}/>
			<h2 className='username'>@{userName}</h2>
		</div>
		{children}
	</div>
);

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired
}

module.exports = PlayerPreview;