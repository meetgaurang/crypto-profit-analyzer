import React, { useEffect } from 'react';
import { Switch, Route, MemoryRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getHistoricData } from '../../store/actions';
import { IDateWiseRecord, IProfitRecord } from './Analytics.types';
import { StyledCard } from './Analytics.styles';


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
                <StyledCard key={index} >
                    <CardContent>
                        <div> {eachProfitItem.currency} </div>
                        <div> {eachProfitItem.profit} </div>
                    </CardContent>
                </StyledCard>
            );
        });
    } 

    public renderRecords = () => {
        return this.props.records.map((eachRecord: IDateWiseRecord, index: number) => {
            return (
                <div key={index}>
                    <div> {eachRecord.date} </div>
                    <div> {this.renderCurrencyList(eachRecord.profitList)} </div>
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