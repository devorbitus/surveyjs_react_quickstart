import React from "react";
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/defaultV2.css";

import { json } from "./survey_json.js";

Survey.StylesManager.applyTheme("defaultV2");

function onValueChanged(result) {
    // console.log("value changed!", result);
}

function onComplete(sender) {
    console.log("Complete! " + JSON.stringify(sender.data, null,2));
}

function countWithoutNones(params) {
    // console.log('countWithoutNones: params', params);
    if (params.length < 2){
        return -1;
    }
    const values = this.survey.getValue(params[0]);
    const subValueArrays = values?.map(v => v[params[1]]);
    const subValues = subValueArrays?.flat();
    // console.log('countWithoutNones: subValues', subValues);
    let subValuesFiltered = subValues?.filter(v => (v && v !== 'none'));
    // console.log('countWithoutNones: subValuesFiltered1', subValuesFiltered);
    if (params.length >= 3){
        subValuesFiltered = subValuesFiltered?.filter(v => v !== params[2]);
        // console.log('countWithoutNones: subValuesFiltered2', subValuesFiltered);
    }
    return subValuesFiltered?.length;
}

function arrayWithoutNones(params) {
    // console.log('arrayWithoutNones: params', params);
    const values = this.survey.getValue(params[0]);
    const subValueArrays = values?.map(v => v[params[1]]);
    const subValues = subValueArrays?.flat();
    // console.log('arrayWithoutNones: subValues', subValues);
    let subValuesFiltered = subValues?.filter(v => (v && v !== 'none'));
    // console.log('arrayWithoutNones: subValuesFiltered1', subValuesFiltered);
    if (params.length >= 3){
        subValuesFiltered = subValuesFiltered?.filter(v => v !== params[2]);
        // console.log('arrayWithoutNones: subValuesFiltered2', subValuesFiltered);
    }
    return subValuesFiltered;
}

function maxDateFromSessions(params) {
    const DEFAULT_MIN_DATE = '1980-04-21';
    const values = this.survey.getValue(params[0]);
    const subValues = values?.map(v => v[params[1]]);
    // console.log('maxDateFromSessions: subValues', subValues);
    let subValuesFiltered = subValues?.filter(v => (v !== undefined && v !== 'none'));
    // console.log(' maxDateFromSessions: subValuesFiltered1', subValuesFiltered);
    if (subValuesFiltered && subValuesFiltered.length > 0){
        const maxDate = subValuesFiltered.reduce( (a, b) => a > b ? a : b);
        // console.log('maxDateFromSessions : maxDate', maxDate);
        return maxDate;
    } else {
        // console.log('maxDateFromSessions : maxDate', DEFAULT_MIN_DATE);
        return DEFAULT_MIN_DATE;
    }
}

function questionValue(params) {
    const questionName = `${params[0]}${params.length > 1 ? params[1] : ''}`;
    // console.log('questionValue: questionName', questionName);
    const values = this.survey.getValue(questionName);
    // console.log('questionValue: values', values);
    return values;
}

function questionValuesIncludingOther(params) {
    const questionName = `${params[0]}${params.length > 1 ? params[1] : ''}`;
    if (identityProviderSsoAnswers) {
        const values = this.survey.getValue(questionName);
        const questionNameComment = `${questionName}-Comment`;
        const comments = this.survey.getValue(questionNameComment);
        const commentsList = comments.split(",");
        const newValues = values?.concat(commentsList);
        return newValues;
    } else {
        return [];
    }
    
}
// Function registration
Survey.FunctionFactory.Instance.register("countWithoutNones", countWithoutNones);
Survey.FunctionFactory.Instance.register("arrayWithoutNones", arrayWithoutNones);
Survey.FunctionFactory.Instance.register("maxDateFromSessions", maxDateFromSessions);
Survey.FunctionFactory.Instance.register("questionValue", questionValue);
Survey.FunctionFactory.Instance.register("questionValuesIncludingOther", questionValuesIncludingOther);

export function SurveyPage() {
    var model = new Survey.Model(json);
    return (
        <div className="container">
            <h2>SurveyJS Library - a sample survey below</h2>
            <SurveyReact.Survey
                model={model}
                onComplete={onComplete}
                onValueChanged={onValueChanged}
            />
        </div>
    );
}
