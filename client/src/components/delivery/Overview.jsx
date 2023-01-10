import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import Button from "../common/Button";

import { getOverview } from "../../actions/delivery";
import CustomNavLink from "../common/CustomNavLink";

const Overview = ({deliveryList, getOverview}) => {
    const { t } = useTranslation();
    useEffect(() => {
        getOverview();
    }, []);
    return (
        <div className='h-screen pt-20 bg-gradient-to-b from-sky-800 to-sky-600 flex flex-col items-center'>
            <div className='text-3xl w-1/2 text-center mx-auto my-5 text-white'>{t('trip_list')}</div>
            <CustomNavLink to="/delivery/new" className="text-white">Add new delivery</CustomNavLink>
            <div className="w-full px-2">
            {
                deliveryList.map(delivery => 
                    <div key={delivery._id} className="bg-slate-200 my-2 py-2 px-4 rounded-md w-2/3 mx-auto">
                        <div className="flex items-center">
                            <p className="grow text-xl font-bold">{delivery.trip_name}</p>
                            <CustomNavLink>Edit</CustomNavLink>
                        </div>
                        <div className="flex">
                            <div className="grow px-2">
                                <div>{delivery.route && delivery.route.map((r) => r.address).join("➡")}</div>
                                <div>{`Total count: ${0}`}</div>
                                <div>{`Total weight: ${0}`}</div>
                            </div>
                            <div className="px-2">
                                <div>{`Date: ${new Date(delivery.date).toLocaleDateString()}`}</div>
                                <div>{`Contact: ${delivery.contact}`}</div>
                                <div>{`Phone: ${delivery.phone}`}</div>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}

Overview.propTypes = {
    deliveryList: PropTypes.array.isRequired,
    getOverview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    deliveryList: state.delivery.deliveries
});

export default connect(mapStateToProps, { getOverview })(Overview);