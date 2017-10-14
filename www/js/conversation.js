/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(lexaudio) {
  'use strict';

  function example() {

    var lexruntime, params,
      message = document.getElementById('message'),
      audioControl = lexaudio.audioControl(),
      renderer = lexaudio.renderer();

    var Conversation = function(messageEl) {
      var message, audioInput, audioOutput, currentState;

      this.messageEl = messageEl;

      this.renderer = renderer;

      this.messages = Object.freeze({
        PASSIVE: 'Passive',
        LISTENING: 'Listening',
        SENDING: 'Sending',
        SPEAKING: 'Speaking'
      });

      this.onSilence = function() {
        audioControl.stopRecording();
        currentState.state.renderer.clearCanvas();
        currentState.advanceConversation();
      };

      this.transition = function(conversation) {
        currentState = conversation;
        var state = currentState.state;
        messageEl.textContent = state.message;
        if (state.message === state.messages.SENDING) {
          currentState.advanceConversation();
        } else if (state.message === state.messages.SPEAKING) {
          currentState.advanceConversation();
        }
      };

      this.advanceConversation = function() {
        currentState.advanceConversation();
      };

      currentState = new Initial(this);
    }

    var Initial = function(state) {
      this.state = state;
      state.message = state.messages.PASSIVE;
      lexruntime = new AWS.LexRuntime({
        region: 'us-east-1',
        credentials:  new AWS.CognitoIdentityCredentials({IdentityPoolId:"us-east-1:6a5cf4b0-5e5c-4f5d-b5bd-d66dea8de13"})
      });

      this.advanceConversation = function() {
        state.renderer.prepCanvas();
        audioControl.startRecording(state.onSilence, state.renderer.visualizeAudioBuffer);
        state.transition(new Listening(state));
      }
    };

    var Listening = function(state) {
      this.state = state;
      state.message = state.messages.LISTENING;
      console.log("Listening with state: "+state.message);
      this.advanceConversation = function() {
        audioControl.exportWAV(function(blob) {
          state.audioInput = blob;
          state.transition(new Sending(state));
        });
      }
    };

    var Sending = function(state) {
      console.log("Sending");
      this.state = state;
      state.message = state.messages.SENDING;
      this.advanceConversation = function() {
        params.inputStream = state.audioInput;
        lexruntime.postContent(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {

            // console.log(JSON.stringify(data));
            state.audioOutput = data;


            state.transition(new Speaking(state));
          }
        });

        // do text base
      }
    };

    var pushChat = function() {
      // if there is text to be sent...
      var wisdomText = document.getElementById('wisdom');
      if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {
        // disable input to show we're sending it
        var wisdom = wisdomText.value.trim();
        wisdomText.value = '...';
        wisdomText.locked = true;

        // send it to the Lex runtime
        var params = {
          botAlias: '$LATEST',
          botName: 'decode',
          contentType: 'audio/x-l16; sample-rate=16000',
          userId: 'svrk8aedlgyokzngyrldrgx2kwade1l1',
          accept: 'audio/mpeg'
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

    var showRequest = function(daText) {
      var conversationDiv = document.getElementById('conversation');
      var requestPara = document.createElement("P");
      requestPara.className = 'userRequest';
      requestPara.appendChild(document.createTextNode(daText));
      conversationDiv.appendChild(requestPara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    };

    var showError= function(daText) {
      var conversationDiv = document.getElementById('conversation');
      var errorPara = document.createElement("P");
      errorPara.className = 'lexError';
      errorPara.appendChild(document.createTextNode(daText));
      conversationDiv.appendChild(errorPara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    };

    var showResponse= function(lexResponse) {
      var conversationDiv = document.getElementById('conversation');
      var responsePara = document.createElement("P");

      responsePara.className = 'lexResponse';
      if (lexResponse.message) {
        responsePara.appendChild(document.createTextNode(lexResponse.message));
        responsePara.appendChild(document.createElement('br'));
      }
      if (lexResponse.dialogState === 'ReadyForFulfillment') {
        responsePara.appendChild(document.createTextNode(
          'Ready for fulfillment'));
        // TODO:  show slot values
      } else {
        responsePara.appendChild(document.createTextNode(
          '(' + lexResponse.dialogState + ')'));
      }
      conversationDiv.appendChild(responsePara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    };


    var Speaking = function(state) {
      this.state = state;
      state.message = state.messages.SPEAKING;
      this.advanceConversation = function() {
        if (state.audioOutput.contentType === 'audio/mpeg') {
            // If the transcript is empty, do playback the response audio.
            if (state.audioOutput.message === "Sorry, can you please repeat that?") {
                state.renderer.prepCanvas();
                audioControl.startRecording(state.onSilence, state.renderer.visualizeAudioBuffer);
                state.transition(new Listening(state));
            } else {
                audioControl.play(state.audioOutput.audioStream, function() {
                    state.renderer.prepCanvas();
                    audioControl.startRecording(state.onSilence, state.renderer.visualizeAudioBuffer);
                    var params = {
                      'slots': state.audioOutput.slots,
                      'inputTranscript': state.audioOutput.inputTranscript
                    };
                    if (params.slots.metric){
                      $.ajax(
                        {
                          method: 'POST',
                          contentType: 'application/json',
                          url: '/api/visualizations',
                          data: JSON.stringify(params)
                        }
                      ).done( function(){
                        audioControl.stopRecording();
                        console.log('sent')
                      })
                    }
                    state.transition(new Listening(state));
                });
            }
        } else if (state.audioOutput.dialogState === 'ReadyForFulfillment') {
          state.transition(new Initial(state));
        }
      }
    };

    audioControl.supportsAudio(function(supported) {
      if (supported) {
        var conversation = new Conversation(message);
        console.log("before CLicked");
        message.textContent = conversation.message;
        document.getElementById('audio-control').onclick = function() {
          console.log("clicked");
          params = {
            botAlias: '$LATEST',
            botName: 'decode',
            contentType: 'audio/x-l16; sample-rate=16000',
            userId: 'svrk8aedlgyokzngyrldrgx2kwade1l1',
            accept: 'audio/mpeg'
          };
          var AWSConfig = new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-east-1:6a5cf4b0-5e5c-4f5d-b5bd-d66dea8de13c'});
            AWS.config.update({
              credentials: AWSConfig,
              region: 'us-east-1'
            });
            lexruntime = new AWS.LexRuntime();
          conversation.advanceConversation();
        };
      } else {
        message.textContent = 'Audio capture is not supported.';
      }
    });
  }
  lexaudio.example = example;
})(lexaudio);
