import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header(props: any): JSX.Element {

	const [visible, setVisible] = useState(false);
	function toggleMobileMenu(){
		setVisible(!visible);
	}
	const classMobileMenu = visible ? 'mobile-menu show' :  'mobile-menu hide';

	const title = props.location.pathname.substring(1) === ''
		? 'Home'
		: props.location.pathname.substring(1).slice(0,1).toUpperCase() + props.location.pathname.substring(1).slice(1);

	const listMenu = (
		<>
			<Helmet>
				<title>{title} | API STOCK</title>
			</Helmet>
			<li className={props.location.pathname.includes('/') ? 'active' : ''}>
				<Link to='/'>Home</Link>
			</li>
			<li className={props.location.pathname.includes('/barchart') ? 'active' : ''}>
				<Link to='/barchart'>Bar Chart</Link>
			</li>
			<li className={props.location.pathname.includes('/linechart') ? 'active' : ''}>
				<Link to='/linechart'>Line Chart</Link>
			</li>
		</>
	);

	return (
		<header>
			<nav className='navbar'>

				<div className='menu-container' >
					<div className='logo'>
						<Link to='/'>API STOCK SITE</Link>
					</div>

					<div className='large-menu-area'>
						<ul className='large-menu-list'>
							{listMenu}
						</ul>
					</div>

					<div className='btn-menubar' onClick={toggleMobileMenu}>
						<FontAwesomeIcon icon={faBars} width={20} height={20}/>
					</div>

				</div>

				<div className={classMobileMenu}>
					<ul className='mobile-menu-list'>
						{listMenu}
					</ul>
				</div>


			</nav>
		</header>
	);

}

export default withRouter(Header);
