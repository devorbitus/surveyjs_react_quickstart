export const json = {
  title: "The Akeyless POC Planning Tool",
  description:
    "This form attempts to gather all the information needed for an Akeyless POC Plan.",
  logoPosition: "right",
  completedHtml:
    "<h3>Thank you for completing The Akeyless POC Planning Tool!</h3>",
  pages: [
    {
      name: "companyDetailsPage",
      elements: [
        {
          type: "text",
          name: "companyNameQuestion",
          title: "What is the Company Name?",
          valueName: "companyName",
          defaultValueExpression: "'Test Company'",
          isRequired: true,
          placeHolder: "My Full Company Name",
        },
        {
          type: "rating",
          name: "daysPerWeek",
          title:
            "How many days per week of session meetings can we commit to for the POC each week?",
          description:
            "This doesn't have to be set in stone but can give a rough idea as to how long the POC could last.",
          defaultValueExpression: "3",
          isRequired: true,
          minRateDescription: "once per week",
          maxRateDescription: "five times per week",
        },
        {
          type: "checkbox",
          name: "akeylessDeploymentLocation",
          title:
            "Where will the Akeyless stateless docker containers (Gateway/Bastions/etc) be installed?",
          description:
            "https://docs.akeyless.io/docs/install-and-configure-the-gateway",
          defaultValueExpression: "['k8s']",
          isRequired: true,
          choices: [
            {
              value: "k8s",
              text: "Kubernetes (helm)",
            },
            {
              value: "on-prem-vm",
              text: "On-Premises VM (VMWare, etc)",
            },
            {
              value: "cloud-vm",
              text: "Cloud VM (EC2, GCE, etc)",
            },
            {
              value: "on-prem-server",
              text: "On-Premises Server",
            },
          ],
          separateSpecialChoices: true,
          hasOther: true,
          hasNone: true,
        },
        {
          type: "radiogroup",
          name: "hasOutgoingProxy",
          title:
            "In the environment that will host the Akeyless stateless docker containers (Gateway/Bastions/etc), \nis there a proxy that needs to be configured for outgoing network access?",
          defaultValueExpression: "'no-proxy'",
          isRequired: true,
          choices: [
            {
              value: "no-proxy",
              text: "No proxy is required",
            },
            {
              value: "no-auth-proxy",
              text: "An unauthenticated proxy is required for outgoing network traffic",
            },
            {
              value: "auth-proxy",
              text: "An AUTHENTICATED proxy is required for outgoing network traffic",
            },
          ],
          separateSpecialChoices: true,
          hasOther: true,
        },
        {
          type: "radiogroup",
          name: "useSlack",
          title:
            "Would you like for Akeyless to create a Slack channel for faster communications during the POC?",
          defaultValueExpression: "yes",
          isRequired: true,
          choices: [
            {
              value: "yes",
              text: "Yes!",
            },
            {
              value: "no-forbidden-slack",
              text: "No, we cannot use Slack",
            },
            {
              value: "no-slack-by-choice",
              text: "No, we don't want to use Slack",
            },
          ],
          separateSpecialChoices: true,
          hasOther: true,
          showClearButton: true,
        },
      ],
      title: "Company Details",
    },
    {
      name: "identityProviderSsoPage",
      elements: [
        {
          type: "radiogroup",
          name: "identityProviderSsoInclude",
          title:
            "Is there a desire to demonstrate using Identity Provider (SSO) for the POC?",
          description: "Okta (SAML), Ping (SAML), Azure AD (SAML), etc.",
          defaultValueExpression: "true",
          choices: [
            {
              value: "true",
              text: "Yes",
            },
            {
              value: "false",
              text: "No",
            },
          ],
        },
        {
          type: "checkbox",
          name: "identityProviderSsoQuestion",
          visibleIf: "{identityProviderSsoInclude} = true",
          title:
            "Which topics around Identity Provider (SSO) should be covered for the POC?",
          defaultValueExpression: "['Okta (SAML)','LDAP']",
          isRequired: true,
          choices: [
            "Okta (SAML)",
            "Ping (SAML)",
            "Azure AD (SAML)",
            "LDAP",
            "OpenID Connect (OIDC)",
          ],
          separateSpecialChoices: true,
          hasOther: true,
          maxSelectedChoices: 10,
        },
        {
          type: "radiogroup",
          name: "identityProviderSsoPriority",
          visibleIf: "{identityProviderSsoInclude} = true",
          title: "What is considered the priority for Identity Provider (SSO)?",
          defaultValueExpression: "must",
          isRequired: true,
          choices: [
            {
              value: "must",
              text: "Must",
            },
            {
              value: "nth",
              text: "Nice to have (NTH)",
            },
          ],
        },
      ],
      title: "Identity Provider (SSO)",
    },
    {
      name: "workloadIdentitiesPage",
      elements: [
        {
          type: "radiogroup",
          name: "workloadIdentitiesInclude",
          title:
            "Is there a desire to demonstrate using Workload Identities for the POC?",
          description: "AWS IAM, Azure AD, GCP IAM, etc.",
          defaultValueExpression: "true",
          choices: [
            {
              value: "true",
              text: "Yes",
            },
            {
              value: "false",
              text: "No",
            },
          ],
        },
        {
          type: "checkbox",
          name: "workloadIdentitiesQuestion",
          visibleIf: "{workloadIdentitiesInclude} = true",
          title:
            "Which topics around Workload Identities should be covered for the POC?",
          defaultValueExpression: "['AWS IAM','GCP IAM']",
          isRequired: true,
          choices: [
            "AWS IAM",
            "Azure AD",
            "GCP IAM",
            "GCP GCE",
            "Kubernetes Auth",
            "Universal Identity",
            "Certificate Authentication",
          ],
          separateSpecialChoices: true,
          hasOther: true,
          maxSelectedChoices: 3,
        },
        {
          type: "radiogroup",
          name: "workloadIdentitiesPriority",
          visibleIf: "{workloadIdentitiesInclude} = true",
          title: "What is considered the priority for Workload Identities?",
          defaultValueExpression: "must",
          isRequired: true,
          choices: [
            {
              value: "must",
              text: "Must",
            },
            {
              value: "nth",
              text: "Nice to have (NTH)",
            },
          ],
        },
      ],
      title: "Workload Identities",
    },
    {
      name: "pocSessionParametersPage",
      elements: [
        {
          type: "text",
          name: "startingPOCwindowDate",
          title: "Starting window date for POC",
          description:
            "POC Sessions will be chosen from available dates and times between this date and the ending date",
          hideNumber: true,
          defaultValueExpression: "today(1)",
          isRequired: true,
          inputType: "date",
          autoComplete: "bday",
          minValueExpression: "today()",
          maxValueExpression: "today(40)",
        },
        {
          type: "text",
          name: "endingPOCwindowDate",
          title: "Ending window date for POC",
          description:
            "POC Sessions will be chosen from available dates and times between the starting date and this date",
          hideNumber: true,
          defaultValueExpression: "today(22)",
          isRequired: true,
          inputType: "date",
          minValueExpression: "today(1)",
          maxValueExpression: "today(40)",
        },
        {
          type: "checkbox",
          name: "akeylessContacts",
          title: "Akeyless Contacts to Include",
          hideNumber: true,
          defaultValueExpression:
            "['chris.g@akeyless.io','charlie.n@akeyless.io']",
          isRequired: true,
          choices: [
            {
              value: "george.g@akeyless.io",
              text: "GG",
            },
            {
              value: "charlie.n@akeyless.io",
              text: "CN",
            },
            {
              value: "kenny.p@akeyless.io",
              text: "KP",
            },
            {
              value: "chris.g@akeyless.io",
              text: "CG",
            },
            {
              value: "mike.m@akeyless.io",
              text: "MM",
            },
            {
              value: "randall.k@akeyless.io",
              text: "RK",
            },
            {
              value: "mark.h@akeyless.ioo",
              text: "MH",
            },
            {
              value: "joe.r@akeyless.io",
              text: "JR",
            },
            {
              value: "kurt.n@akeyless.io",
              text: "KN",
            },
            {
              value: "sean.k@akeyless.io",
              text: "SK",
            },
            {
              value: "fahmy.k@akeyless.io",
              text: "FK",
            },
            {
              value: "laura.w@akeyless.io",
              text: "LW",
            },
            {
              value: "barak.a@akeyless.io",
              text: "BA",
            },
            {
              value: "eldad.h@akeyless.io",
              text: "EH",
            },
            {
              value: "ori@akeyless.io",
              text: "OM",
            },
            {
              value: "netser.h@akeyless.io",
              text: "NH",
            },
            {
              value: "lewis.m@akeyless.io",
              text: "LM",
            },
          ],
          choicesOrder: "asc",
          colCount: 3,
        },
        {
          type: "radiogroup",
          name: "customersPrimaryTimeZone",
          title: "Customer's Primary Time Zone",
          defaultValueExpression: "'America/New_York'",
          choices: [
            {
              value: "America/New_York",
              text: "Eastern Time Zone",
            },
            {
              value: "America/Chicago",
              text: "Central Time Zone",
            },
            {
              value: "America/Denver",
              text: "Mountain Time Zone",
            },
            {
              value: "America/Los_Angeles",
              text: "Pacific Time Zone",
            },
          ],
        },
      ],
      title: "POC Session Parameters",
    },
    {
      name: "sessionCreationPage",
      elements: [
        {
          type: "matrixdynamic",
          name: "createSessions",
          title: "Add POC Sessions from agreed POC Items",
          description:
            "Add as many POC Sessions as required to demonstrate the agreed functionality",
          hideNumber: true,
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "You must schedule every Identity Provider (SSO) selection",
              expression:
                "{identityProviderSsoInclude} = false or arrayWithoutNones('createSessions','identityProviderSso') contains {identityProviderSsoQuestion}",
            },
            {
              type: "expression",
              text: "You must schedule every Workload Identities selection",
              expression:
                "{workloadIdentitiesInclude} = false or arrayWithoutNones('createSessions','workloadIdentities') contains {workloadIdentitiesQuestion}",
            },
          ],
          alternateRows: true,
          columns: [
            {
              name: "sessExpr",
              title: "Session Number",
              cellType: "expression",
              isRequired: true,
              expression: "'POC Session #'+{rowIndex}",
            },
            {
              name: "sessionNumber",
              title: "Session Number",
              cellType: "text",
              isRequired: true,
              readOnly: true,
              visibleIf: "false",
              defaultValueExpression: "{rowIndex}",
            },
            {
              name: "identityProviderSso",
              title: "Identity Provider (SSO)",
              cellType: "checkbox",
              isRequired: true,
              visibleIf: "{identityProviderSsoInclude} = true",
              defaultValueExpression: "['none']",
              choices: [
                "Okta (SAML)",
                "Ping (SAML)",
                "Azure AD (SAML)",
                "LDAP",
                "OpenID Connect (OIDC)",
              ],
              choicesVisibleIf:
                "{identityProviderSsoQuestion} contains {choice}",
              choicesEnableIf:
                "arrayWithoutNones('createSessions','identityProviderSso') notcontains {item}",
              separateSpecialChoices: true,
              hasNone: true,
            },
            {
              name: "workloadIdentities",
              title: "Workload Identities",
              cellType: "checkbox",
              isRequired: true,
              visibleIf: "{workloadIdentitiesInclude} = true",
              defaultValueExpression: "['none']",
              choices: [
                "AWS IAM",
                "Azure AD",
                "GCP IAM",
                "GCP GCE",
                "Kubernetes Auth",
                "Universal Identity",
                "Certificate Authentication",
              ],
              choicesVisibleIf:
                "{workloadIdentitiesQuestion} contains {choice}",
              choicesEnableIf:
                "arrayWithoutNones('createSessions','workloadIdentities') notcontains {item}",
              separateSpecialChoices: true,
              hasNone: true,
            },
            {
              name: "sessionDate",
              title: "Session Date",
              cellType: "radiogroup",
              colCount: 1,
              isRequired: true,
              choices: [
                {
                  value: "2022-07-11",
                  text: "Mon July 11, 2022",
                },
                {
                  value: "2022-07-13",
                  text: "Wed July 13, 2022",
                },
                {
                  value: "2022-07-14",
                  text: "Thu July 14, 2022",
                },
              ],
              choicesEnableIf:
                "iif({currentMaxSessionDate} notempty,{choice} > {currentMaxSessionDate}, true)",
              hasNone: true,
            },
            {
              name: "sessionTime",
              title: "Session Time",
              cellType: "radiogroup",
              isRequired: true,
              visibleIf: "{row.sessionDate} notempty",
              choices: [
                {
                  value: "2022-07-11 1300-1430",
                  text: "1 pm - 2:30 pm",
                },
                {
                  value: "2022-07-11 1500-1630",
                  text: "3 pm - 4:30 pm",
                },
                {
                  value: "2022-07-11 1600-1730",
                  text: "4 pm - 5:30 pm",
                },
                {
                  value: "2022-07-13 1300-1430",
                  text: "1 pm - 2:30 pm",
                },
                {
                  value: "2022-07-13 1500-1630",
                  text: "3 pm - 4:30 pm",
                },
                {
                  value: "2022-07-14 1500-1630",
                  text: "3 pm - 4:30 pm",
                },
              ],
              choicesVisibleIf:
                "{choice} contains {row.sessionDate} and {choice} >= {row.sessionDate}",
            },
          ],
          columnLayout: "vertical",
          detailPanelMode: "underRow",
          choices: [1],
          cellType: "checkbox",
          rowCount: 1,
          minRowCount: 1,
          maxRowCount: 10,
          keyName: "sessionDate",
          confirmDelete: true,
          confirmDeleteText:
            "Do you want to delete the POC Session? (entered data will be lost)",
          addRowLocation: "topBottom",
          addRowText: "Add POC Session",
          removeRowText: "Remove POC Session",
        },
        {
          type: "matrixdropdown",
          name: "totalPOCselections",
          title: "Total POC Selections",
          rowsVisibleIf: "questionValue({item},'Include') = true",
          columns: [
            {
              name: "Total Selected",
              cellType: "expression",
              expression: "count(questionValue({rowValue}, 'Question'))",
            },
            {
              name: "Total Scheduled",
              cellType: "expression",
              expression: "countWithoutNones('createSessions', {rowValue})",
            },
            {
              name: "Total Yet to be Scheduled",
              cellType: "expression",
              expression:
                "count(questionValue({rowValue},'Question')) - countWithoutNones('createSessions', {rowValue})",
            },
          ],
          choices: [1, 2, 3, 4, 5],
          cellType: "expression",
          rows: [
            {
              value: "identityProviderSso",
              text: "Identity Provider (SSO)",
            },
            {
              value: "workloadIdentities",
              text: "Workload Identities",
            },
            {
              value: "orchestrationPlatforms",
              text: "Orchestration Platforms",
            },
            {
              value: "ciCdIntegration",
              text: "CI/CD Integration",
            },
            {
              value: "dynamicRotatedSecrets",
              text: "Dynamic & Rotated Secrets",
            },
            {
              value: "keyManagementSystems",
              text: "Key Management Systems",
            },
            {
              value: "secretsMigration",
              text: "Secrets Migration",
            },
            {
              value: "infrastructureAsCodeConfigManagement",
              text: "Infrastructure as Code & Config Management",
            },
            {
              value: "secureRemoteAccess",
              text: "Secure Remote Access",
            },
            {
              value: "dataProtection",
              text: "Data Protection",
            },
            {
              value: "logForwarding",
              text: "Log Forwarding",
            },
          ],
        },
      ],
      title: "Session Creation",
      description:
        "This page is to be filled out by the Akeyless Solutions Architect",
    },
  ],
  triggers: [
    {
      type: "runexpression",
      expression: "{createSessions} notempty or {createSessions} empty",
      setToName: "currentMaxSessionDate",
      runExpression: "maxDateFromSessions('createSessions','sessionDate')",
    },
    {
      type: "runexpression",
      expression: "{createSessions} notempty or {createSessions} empty",
      setToName: "numberOfSessions",
      runExpression: "{createSessions.length}",
    },
  ],
  showProgressBar: "top",
  autoGrowComment: true,
  widthMode: "responsive",
};
