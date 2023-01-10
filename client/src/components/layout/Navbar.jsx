import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomNavLink from '../common/CustomNavLink';
import Languagebar from '../common/Languagebar';

import { useTranslation } from 'react-i18next';
import { logout } from '../../actions/auth';

const Navbar = ({logout, auth: {isAuthenticated, user}}) => {
    const { t } = useTranslation();
    return (
        <div className='border-box bg-white flex p-4 w-full border-b-1 border-slate-500 absolute shadow-lg shadow-[rgba(0,0,0,0.2)]'>
            <div className='grow'>
                <img className='logo' src={require('./logo.png')} />
            </div>
            <div className='border-r-2 border-slate-500 pr-2 flex items-center'>
                <CustomNavLink to="/search">{t('search')}</CustomNavLink>
                <Languagebar />
            </div>
            {isAuthenticated ?
                <div className='flex items-center'>
                    <CustomNavLink to="/delivery/overview">{user?.name}</CustomNavLink>
                    <CustomNavLink onClick={logout}>Logout</CustomNavLink>
                </div>
                :
                <div className='flex items-center'>
                    <CustomNavLink to='/login'>{t('log_in')}</CustomNavLink>
                    <CustomNavLink to='/signup'>{t('register')}</CustomNavLink>
                </div>
            }
        </div>
    );
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);