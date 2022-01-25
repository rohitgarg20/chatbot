import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { GiftedChat, Message, MessageText } from 'react-native-gifted-chat';
import { setupInitConfig } from '../service/DialogflowService';
import { get } from 'lodash'

const BOT_USER = []

const chatBotComponent = () => {

  const [ botChat, setMessages ] = useState([])

  useEffect(() => {
    setupInitConfig()
  }, [])


  const handleGoogleResponse = (result: any) => {
    console.log('handleGoogleResponsehandleGoogleResponse', JSON.stringify(result))
    // const chatBotResponse = result.queryResult.fulfillmentMessages.payload.payload[0]
    console.log('chatBotResponsechatBotResponse', result.queryResult.fulfillmentMessages[0].payload.payload)
    const chatResponseMsg = result.queryResult.fulfillmentMessages[0].payload.payload
    setMessages(previousMessages => GiftedChat.append(previousMessages, chatResponseMsg))
  }


  const onSendMessage = useCallback((messages = []) => {
    console.log('onSendMessageonSendMessageonSendMessage', messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => handleGoogleResponse(result),
      error => console.log("error is", error)
    );
  }, [])

  const renderMessage = () => {

  }

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
        <GiftedChat
          messages={botChat}
          onSend={messages => onSendMessage(messages)}
          renderMessage = {(props) => {
            return (
              <MessageText
                  {...props}
              />
            )
          }}
          // user={{
          //   _id: 1
          // }}
        />
      </View>
  );
}


export {
  chatBotComponent as ChatBotComponent
}