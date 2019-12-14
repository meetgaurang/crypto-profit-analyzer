import React, { useEffect } from 'react';
import { Switch, Route, MemoryRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Icon, InlineIcon } from "@iconify/react";
import BTC from "@iconify/icons-cryptocurrency/btc";
import LTC from "@iconify/icons-cryptocurrency/ltc";
import ETH from "@iconify/icons-cryptocurrency/eth";
import ETC from "@iconify/icons-cryptocurrency/etc";

import { getHistoricData } from '../../store/actions';
import { IDateWiseRecord, IProfitRecord } from './Analytics.types';
import { DateBarDiv, CustomGrid } from './Analytics.styles';

export class Analytics extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getHistoricData();
    }

    public renderCurrencyList = (profitList: IProfitRecord[]) => {
        return profitList.map((eachProfitItem: IProfitRecord, index: number) => {
            return (
                <Grid item xs={12} sm={4} md={2} lg={1} xl={1}>
                    <Card key={index} >
                        <CardContent style={{textAlign: "center"}}>
                            <Grid container spacing={1}>
                                <CustomGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    {this.iconMapping(eachProfitItem.currency)}
                                    <span style={{paddingLeft: "5px"}}>
                                        {eachProfitItem.currency}
                                    </span>
                                </CustomGrid>
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
                                    Profit: ${eachProfitItem.profit}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    } 

    public renderRecords = () => {
        return this.props.records.map((eachRecord: IDateWiseRecord, index: number) => {
            return (
                <div key={index}>
                    <DateBarDiv> 
                        <ChevronRight />
                        {moment(eachRecord.date, 'YYYY-MM-DD').format('LL')}
                    </DateBarDiv>
                    <Grid container spacing={2}> 
                        {this.renderCurrencyList(eachRecord.profitList)}
                    </Grid>
                </div>
            );
        });
    }

    render () {
        return (
            <>
                {this.props.apiSuccess && <div>{this.renderRecords()}</div>}
                {this.props.apiFailure && <div>API call failed</div>}
                {this.props.apiReuestInProgress && <div>Loading..</div>}
            </>
        );
    }

    iconMapping(currency: string) {
        switch(currency) {
            case 'BTC': {
                return <Icon icon={BTC} width="2em" height="2em"/>
            }
            case 'ETH': {
                return <Icon icon={ETH} width="2em" height="2em"/>
            }
            case 'LTC': {
                return <Icon icon={LTC} width="2em" height="2em"/>
            }
            case 'ETC': {
                return <Icon icon={ETC} width="2em" height="2em"/>
            }
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        apiSuccess: state.analyticsReducer.apiSuccess,
        apiFailure: state.analyticsReducer.apiFailure,
        apiReuestInProgress: state.analyticsReducer.apiReuestInProgress,
        records: state.analyticsReducer.records
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getHistoricData: () => {
        dispatch(getHistoricData());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);