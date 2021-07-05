import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header(props: any): JSX.Element {
	console.log(props);

	const [visible, setVisible] = useState(false);
	function toggleMobileMenu(){
		setVisible(!visible);
	}
	const classMobileMenu = visible ? 'mobile-menu show' :  'mobile-menu hide';

	return (
		<header>
			<nav className='navbar'>

				<div className='menu-container' >
					<div className='logo'>
						<Link to='/'>API STOCK SITE</Link>
					</div>

					<div className='large-menu-area'>
						<ul className='large-menu-list'>
							{
							//	<li className={props.match.path.includes('/barchart') ? 'active' : ''}>
							}
							<li>
								<Link to='/barchart'>Bar Chart</Link>
							</li>
							{
								//<li className={props.match.pathname.includes('/linechart') ? 'active' : ''}>
							}
							<li>
								<Link to='/linechart'>Line Chart</Link>
							</li>
						</ul>
					</div>

					<div className='btn-menubar' onClick={toggleMobileMenu}>
						<FontAwesomeIcon icon={faBars} width={20} height={20}/>
					</div>

				</div>

				<div className={classMobileMenu}>
					<ul className='mobile-menu-list'>
						{
							//	<li className={props.match.path.includes('/barchart') ? 'active' : ''}>
						}
						<li>
							<Link to='/barchart'>Bar Chart</Link>
						</li>
						{
						//<li className={props.match.pathname.includes('/linechart') ? 'active' : ''}>
						}
						<li>
							<Link to='/linechart'>Line Chart</Link>
						</li>
					</ul>
				</div>


			</nav>
		</header>
	);

}
//
// const router = useRouter();
// const [visible, setVisible] = useState(false);
// function toggleMobileMenu(){
// 	setVisible(!visible);
// }
// const classMobileMenu = visible ? `${styles.mobile_menu} ${styles.show}` : `${styles.mobile_menu} ${styles.hide}`;
//

// 		<nav className={styles.navbar}>
//
// 			<div className={styles.menu_container} >
//
// 				<div className={styles.logo_n_searchbar}>
// 					<Link href='/'>
// 						<a className={styles.logo}>
// 							<Image
// 								src='/nft-tracker-transp.png'
// 								alt="icon image"
// 								width={36}
// 								height={36}
// 							/>
// 						</a>
// 					</Link>
//
// 					<SearchBar/>
// 				</div>
//
// 				<div className={styles.large_menu_area}>
// 					<ul className={styles.large_menu_list}>
// 						<li className={router.pathname.includes('/collections') ? styles.active : ''}>
// 							<Link href='/collections'>
// 								<a>Collections</a>
// 							</Link>
// 						</li>
// 						<li className={router.pathname.includes('/mynfts') ? styles.active : ''}>
// 							<Link href='/mynfts'>
// 								<a>My NFTs</a>
// 							</Link>
// 						</li>
// 					</ul>
// 					<div className='separator_vertical' ></div>
// 					<div className={`${styles.select} ${router.pathname.includes('/contact') ? styles.active : ''}`} ref={communityBoxRef} onClick={toggleCommunityBox}>
// 						<div>Community</div>
// 						<span className='icon_right'>
// 							{ activeCommunityBox ?  (
// 								<FontAwesomeIcon icon={faAngleUp} width={16} height={16}/>
// 							) : (
// 								<FontAwesomeIcon icon={faAngleDown} width={16} height={16}/>
// 							) }
// 						</span>
// 					</div>
// 					{
// 						!isAuthenticated ? (
// 							<ConnectToWalletButton />
// 						) : (
// 							<div className={`${styles.select} ${router.pathname.includes('/account') ? styles.active : ''}`} ref={accountBoxRef} onClick={toggleAccountBox}>
// 								<div>Account</div>
// 								<span className='icon_right'>
// 									{ activeAccountBox ?  (
// 										<FontAwesomeIcon icon={faAngleUp} width={16} height={16}/>
// 									) : (
// 										<FontAwesomeIcon icon={faAngleDown} width={16} height={16}/>
// 									) }
// 								</span>
// 							</div>
// 						)
// 					}
//
// 				</div>
//
// 				<div className={styles.btn_menubar} onClick={toggleMobileMenu}>
// 					<FontAwesomeIcon icon={faBars} width={20} height={20}/>
// 				</div>
//
// 			</div>
//
// 			<div className={classMobileMenu}>
// 				<ul className={styles.mobile_menu_list}>
// 					<li className={router.pathname.includes('/collections') ? styles.active : ''}>
// 						<Link href='/collections'>
// 							<a>Collections</a>
// 						</Link>
// 					</li>
// 					<li className={router.pathname.includes('/mynfts') ? styles.active : ''}>
// 						<Link href='/mynfts'>
// 							<a>My NFTs</a>
// 						</Link>
// 					</li>
// 					<li>
// 						<div onClick={() => openModal()}>Donation</div>
// 					</li>
// 					<li className={router.pathname.includes('/contact') ? styles.active : ''}>
// 						<Link href='/contact'>
// 							<a>Contact</a>
// 						</Link>
// 					</li>
// 					<li>
// 						<a href='https://twitter.com/nfttrackernet' target='_blank' rel="noreferrer">Twitter</a>
// 					</li>
// 					{
// 						!isAuthenticated ? (
// 							<li style={{margin: 'auto'}}>
// 								<ConnectToWalletButton />
// 							</li>
// 						) : (
// 							<>
// 								<li className={router.pathname.includes('/account') ? styles.active : ''}>
// 									<Link href='/account'>
// 										<a className={styles.flex}>
// 											<div>My Profile</div>
// 											<span className='icon_right'>
// 												<FontAwesomeIcon icon={faUser} width={16} height={16}/>
// 											</span>
// 										</a>
// 									</Link>
// 								</li>
// 								<li>
// 									<div className={styles.flex} onClick={() => logout()}>
// 										<div>Logout</div>
// 										<span className='icon_right'>
// 											<FontAwesomeIcon icon={faSignOutAlt} width={16} height={16}/>
// 										</span>
// 									</div>
// 								</li>
// 							</>
// 						)
// 					}
// 				</ul>
// 			</div>
//
//
// 		</nav>
// 	</>
// );
// }
