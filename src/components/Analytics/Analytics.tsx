import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ErrorIcon from '@material-ui/icons/Error';
import { Icon } from '@iconify/react';
import BTC from '@iconify/icons-cryptocurrency/btc';
import LTC from '@iconify/icons-cryptocurrency/ltc';
import ETH from '@iconify/icons-cryptocurrency/eth';
import ETC from '@iconify/icons-cryptocurrency/etc';

import { getHistoricData } from '../../store/actions';
import { DateWiseRecord, ProfitRecord, AnalyticsProps } from './Analytics.types';
import { DateBarDiv, CustomGrid } from './Analytics.styles';
import { AppState } from '../../store/types';

export const Analytics = (props: AnalyticsProps) => {
    useEffect(() => {
        props.getHistoricData();
    }, []);

    const iconMapping = (currency: string) => {
        switch (currency) {
            case 'BTC': {
                return <Icon icon={BTC} width="2em" height="2em" />;
            }
            case 'ETH': {
                return <Icon icon={ETH} width="2em" height="2em" />;
            }
            case 'LTC': {
                return <Icon icon={LTC} width="2em" height="2em" />;
            }
            case 'ETC': {
                return <Icon icon={ETC} width="2em" height="2em" />;
            }
        }
    };

    const renderCurrencyList = (profitList: ProfitRecord[]) => {
        return profitList.map((eachProfitItem: ProfitRecord, index: number) => {
            return (
                <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={index}>
                    <Card key={index} style={{ height: '100%' }}>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Grid container spacing={1}>
                                <CustomGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {iconMapping(eachProfitItem.currency)}
                                    <span style={{ paddingLeft: '5px' }}>{eachProfitItem.currency}</span>
                                </CustomGrid>
                                {!eachProfitItem.profit && (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                        style={{ textAlign: 'left', display: 'flex', alignItems: 'end' }}
                                    >
                                        <ErrorIcon style={{ marginRight: '5px' }} />
                                        No profit can be booked due to continuously decreasing price for the given day
                                    </Grid>
                                )}
                                {!!eachProfitItem.profit && (
                                    <>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <strong>Buy</strong>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <strong>Sell</strong>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            ${eachProfitItem.buyDetails.price}
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            ${eachProfitItem.sellDetails.price}
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            {moment(eachProfitItem.buyDetails.time, 'HHmm').format('hh:mmA')}
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            {moment(eachProfitItem.sellDetails.time, 'HHmm').format('hh:mmA')}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <strong>Profit:&nbsp;</strong>
                                            <span style={{ color: 'green' }}>
                                                ${eachProfitItem.profit}
                                                <ArrowUpwardIcon style={{ fontSize: 'small' }} />
                                            </span>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    };

    const renderRecords = () => {
        return props.records.map((eachRecord: DateWiseRecord, index: number) => {
            return (
                <div key={index}>
                    <DateBarDiv>
                        <ChevronRight />
                        {moment(eachRecord.date, 'YYYY-MM-DD').format('LL')}
                    </DateBarDiv>
                    <Grid container spacing={2}>
                        {renderCurrencyList(eachRecord.profitList)}
                    </Grid>
                </div>
            );
        });
    };

    return (
        <>
            {props.apiSuccess && <div>{renderRecords()}</div>}
            {props.apiFailure && <div>{props.apiFailureMessage}</div>}
            {props.apiRequestInProgress && <div>Loading..</div>}
        </>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        apiSuccess: state.analyticsReducer.apiSuccess,
        apiFailure: state.analyticsReducer.apiFailure,
        apiRequestInProgress: state.analyticsReducer.apiRequestInProgress,
        apiFailureMessage: state.analyticsReducer.apiFailureMessage,
        records: state.analyticsReducer.records
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    getHistoricData: () => {
        dispatch(getHistoricData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
