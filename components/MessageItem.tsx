// components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  message: string;
  time: string;
  isUser: boolean;
  avatar?: string;
};

const MessageBubble: React.FC<Props> = ({ message, time, isUser, avatar }) => {
  return (
    <View style={[styles.messageRow, isUser ? styles.userRow : styles.otherRow]}>
      {!isUser && avatar && (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 10,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default MessageBubble;
