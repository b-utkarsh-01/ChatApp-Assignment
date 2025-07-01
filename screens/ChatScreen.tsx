import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MessageBubble from '../components/MessageItem';

import CameraIcon from '../assets/icons/camera.svg';
import VideoIcon from '../assets/icons/video.svg';
import DocumentIcon from '../assets/icons/document.svg';
import AttachmentIcon from '../assets/icons/attachment.svg';

type Message = {
  id: string;
  message: string;
  time: string;
  sender: {
    self: boolean;
    image: string;
  };
};

type ChatItem =
  | { type: 'message'; data: Message }
  | { type: 'date'; id: string; label: string };

const formatDateLabel = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return 'Today';

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const insertDateSeparators = (messages: Message[]): ChatItem[] => {
  const result: ChatItem[] = [];
  let lastDate = '';

  for (const msg of messages) {
    const msgDate = new Date(msg.time).toDateString();

    if (msgDate !== lastDate) {
      result.push({
        type: 'date',
        id: `date-${msgDate}`,
        label: formatDateLabel(msg.time),
      });
      lastDate = msgDate;
    }

    result.push({
      type: 'message',
      data: msg,
    });
  }

  return result;
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMessages = async (pageToLoad: number) => {
    try {
      const res = await fetch(`https://qa.corider.in/assignment/chat?page=${pageToLoad}`);
      const data = await res.json();
      const sorted = data.chats.reverse(); // Oldest first

      setMessages((prev) =>
        pageToLoad === 0 ? sorted : [...sorted, ...prev]
      );
    } catch (e) {
      console.error('Fetch error:', e);
    }
  };

  useEffect(() => {
    fetchMessages(0);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        message: input,
        time: new Date().toISOString(),
        sender: {
          self: true,
          image:
            'https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8',
        },
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput('');
    }
  };

  const chatItems = insertDateSeparators(messages);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      fetchMessages(nextPage).then(() => {
        setPage(nextPage);
        setLoadingMore(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatItems.reverse()}
        keyExtractor={(item) => (item.type === 'date' ? item.id : item.data.id)}
        renderItem={({ item }) => {
          if (item.type === 'date') {
            return (
              <View style={styles.dateSeparator}>
                <Text style={styles.dateText}>{item.label}</Text>
              </View>
            );
          }

          const { data } = item;
          return (
            <MessageBubble
              message={data.message}
              time={new Date(data.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              isUser={data.sender.self}
              avatar={data.sender.image}
            />
          );
        }}
        contentContainerStyle={{ padding: 10 }}
        inverted
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
      />

      {/* FAB Options */}
      {showOptions && (
        <View style={styles.fabOptions}>
          <TouchableOpacity style={styles.fabOptionButton}>
            <CameraIcon width={24} height={24} stroke="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOptionButton}>
            <VideoIcon width={24} height={24} stroke="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabOptionButton}>
            <DocumentIcon width={24} height={24} stroke="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Reply to @Rohit Yadav..."
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => setShowOptions((prev) => !prev)}
            style={styles.iconBtn}
          >
            <AttachmentIcon width={24} height={24} />
          </TouchableOpacity>

          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f1d9cd',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  dateSeparator: {
    alignSelf: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: 'bold',
  },
  iconBtn: {
    marginRight: 8,
  },
  fabOptions: {
    position: 'absolute',
    bottom: 57,
    right: '1%',
    backgroundColor: '#25b622a3',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  fabOptionButton: {
    marginHorizontal: 6,
  },
});
