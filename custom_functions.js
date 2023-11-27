//========================================================================
//    BEGIN COPY
//========================================================================
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

// Function registration
Survey.FunctionFactory.Instance.register("countWithoutNones", countWithoutNones);
Survey.FunctionFactory.Instance.register("arrayWithoutNones", arrayWithoutNones);
Survey.FunctionFactory.Instance.register("maxDateFromSessions", maxDateFromSessions);
Survey.FunctionFactory.Instance.register("questionValue", questionValue);
//========================================================================
//    END COPY
//========================================================================
arrayWithoutNones('createSessions','identityProviderSso') contains {choice}
choicesEnableIf: "",
choicesVisibleIf: "maxDateFromSessions('createSessions','sessionDate') < {choice}",
arrayWithoutNones('createSessions','identityProviderSso') contains {identityProviderSsoQuestion}

{
              type: "expression",
              text: "You must schedule every Workload Identities selection",
              expression:
                "arrayWithoutNones('createSessions','workloadIdentities') contains {workloadIdentitiesQuestion}",
            },

choicesVisibleIf:
                "{currentMaxSessionDate} notempty and {choice} > {currentMaxSessionDate}",

 "triggers": [
      {
       "type": "runexpression",
       "expression": "countWithoutNones('createSessions','sessionDate') > 0",
       "setToName": "currentMaxSessionDate",
       "runExpression": "maxDateFromSessions('createSessions','sessionDate')"
      }
     ],
rowsVisibleIf: "questionValue({item},'Include') = true",

{
              name: "Total Selected",
              cellType: "expression",
              expression:
                "count(questionValue({rowValue}, 'Question'))",
            },
            {
              name: "Total Scheduled",
              cellType: "expression",
              expression:
                "countWithoutNones('createSessions', {rowValue})",
            },
            {
              name: "Total Yet to be Scheduled",
              cellType: "expression",
              expression:
                "count(questionValue({rowValue},'Question')) - countWithoutNones('createSessions', {rowValue})",
            },

 visibleIf: "{identityProviderSsoInclude} = true",

visibleIf: "{workloadIdentitiesInclude} = true",