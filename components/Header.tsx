import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.button}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M20 12H6M6 12L12 6M6 12L12 18"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Trip No. 40</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M16.862 3.487a1.655 1.655 0 0 1 2.34 2.34l-1.172 1.171-2.34-2.34 1.172-1.171zM14.692 5.657l2.34 2.34L8.91 16.119l-2.34-.001v-2.34L14.692 5.657zM5 5h9V3H5a2 2 0 0 0-2 2v14c0 1.103.897 2 2 2h14a2 2 0 0 0 2-2v-9h-2v9H5V5z"
            fill="#000000"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 4,
    marginRight: 12, // 🧠 Instead of `gap`, add margin here
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});