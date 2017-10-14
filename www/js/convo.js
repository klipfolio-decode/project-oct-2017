
// set the focus to the input box
document.getElementById("m_quicksearch_input").focus();

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
// Provide your Pool Id here
IdentityPoolId:'us-east-1:6a5cf4b0-5e5c-4f5d-b5bd-d66dea8de13c',
});

var lexruntime = new AWS.LexRuntime();
var lexUserId = 'svrk8aedlgyokzngyrldrgx2kwade1l1' + Date.now();
var sessionAttributes = {};

function pushChat() {

// if there is text to be sent...
var wisdomText = document.getElementById("m_quicksearch_input");
var inputTranscript = document.getElementById("m_quicksearch_input").value
if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {

    // disable input to show we're sending it
    var wisdom = wisdomText.value.trim();
    wisdomText.value = '...';
    wisdomText.locked = true;

    // send it to the Lex runtime
    var params = {
        botAlias: '$LATEST',
        botName: 'decode',
        inputText: wisdom,
        userId: lexUserId,
        sessionAttributes: sessionAttributes
    };
    showRequest(wisdom);
    lexruntime.postText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
            // capture the sessionAttributes for the next cycle
            sessionAttributes = data.sessionAttributes;
            // show response and/or error/dialog status
            console.log(data)
            let params = {
                'slots': data.slots,
                'inputTranscript': inputTranscript
            }
            if (params.slots.metric){
              $.ajax(
                {
                  method: 'POST',
                  contentType: 'application/json',
                  url: '/api/visualizations',
                  data: JSON.stringify(params)
                }
              ).done( function(){
                console.log('sent')
              })
            }

            showResponse(data);
        }
        // re-enable input
        wisdomText.value = '';
        wisdomText.locked = false;
    });
}
// we always cancel form submission
return false;
}


function showRequest(daText) {

    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("div");

    requestPara.setAttribute('class','userRequest m-alert m-alert--outline alert alert-brand alert-dismissible fade show');    

    requestPara.prepend(document.createTextNode(daText));
    conversationDiv.prepend(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    responsePara.setAttribute('class','lexError alert alert-danger');    


    errorPara.prepend(document.createTextNode(daText));
    conversationDiv.prepend(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("div");
    responsePara.setAttribute('class','lexResponse alert alert-brand');    

    if (lexResponse.message) {
        responsePara.prepend(document.createTextNode(lexResponse.message));
        responsePara.prepend(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
        responsePara.prepend(document.createTextNode(
            'Ready for fulfillment'));
        // TODO:  show slot values
    } else {
        responsePara.prepend(document.createTextNode(
            '(' + lexResponse.dialogState + ')'));
    }
    conversationDiv.prepend(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}