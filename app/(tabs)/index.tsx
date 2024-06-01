import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { LinearGradient } from 'expo-linear-gradient';
import { renderBubble, renderComposer, renderInputToolbar, renderTime } from '@/components/chatRenders';
import axios from 'axios';
import { getAccessToken } from '@/utils/Auth';

const project_id = 'dialogflow-chatbot-425019'
const location = 'global'
const agent_id = '9500f60f-6f31-45b5-b23e-1e6142d4801d'

async function sendMessage(messageText: string, session_id: string) {
  const accessToken = getAccessToken();
  const response = await axios.post(
    `https://global-dialogflow.googleapis.com/v3/projects/${project_id}/locations/${location}/agents/${agent_id}/sessions/${session_id}:detectIntent`,
    {
      queryInput: {
        text: {
          text: messageText,
        },
        languageCode: 'en',
      },
      queryParams: {
        timeZone: 'America/New_York',
      }
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.queryResult.responseMessages[0].text.text[0];
}


interface User {
  _id: number;
  name: string;
  avatar: string;
}

interface Message extends IMessage {
  user: User;
}

export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [session_id, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7));
    setMessages([
      {
        _id: 1,
        text: `ID de sesión: ${session_id}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://github.com/adrephos.png',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: Message[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    sendMessage(messages[0].text, session_id).then((response) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [{
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://github.com/adrephos.png',
        },
      }]));
    });
  }, []);

  return (
    <LinearGradient
      colors={['#818ADA', '#3b5998', '#89B8E6']}
      style={styles.container}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: Message[]) => onSend(messages)}
        user={{
          _id: 1,
          name: 'Adrephos',
        }}
        renderBubble={renderBubble}
        renderTime={renderTime}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

