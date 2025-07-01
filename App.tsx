import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from './components/Header';
import ChatScreen from './screens/ChatScreen';
import GroupInfo from './components/GroupInfo';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <GroupInfo />
      <ChatScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
