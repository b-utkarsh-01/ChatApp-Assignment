import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export default function GroupInfo() {
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {
      id: '1',
      label: 'Members',
      icon: (
        <Svg width="24" height="24" stroke="#0F1409" strokeWidth={2}>
          <Path d="M12 12c1.656 0 3-1.567 3-3.5S13.656 5 12 5s-3 1.567-3 3.5 1.344 3.5 3 3.5z" />
          <Path d="M5 19c0-2.667 3-4 7-4s7 1.333 7 4" />
        </Svg>
      ),
    },
    {
      id: '2',
      label: 'Share Number',
      icon: (
        <Svg width="24" height="24" stroke="currentColor" strokeWidth={2}>
          <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.81.34 1.61.65 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.72a2 2 0 0 1 2.11-.45c.75.31 1.55.53 2.36.65a2 2 0 0 1 1.72 2z" />
        </Svg>
      ),
    },
    {
      id: '3',
      label: 'Report',
      icon: (
        <Svg width="24" height="24" stroke="currentColor" strokeWidth={2}>
          <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <Line x1="9" y1="9" x2="15" y2="15" />
          <Line x1="15" y1="9" x2="9" y2="15" />
        </Svg>
      ),
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png',
            }}
            style={styles.avatar}
          />
          <View>
            <View style={styles.routeRow}>
              <Text style={styles.smallText}>From </Text>
              <Text style={styles.routeText}>Domlur</Text>
            </View>
            <View style={styles.routeRow}>
              <Text style={styles.smallText}>To </Text>
              <Text style={styles.routeText}>Indiranagar</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Svg width={24} height={24} fill="#11180C">
            <Circle cx="12" cy="5" r="2" />
            <Circle cx="12" cy="12" r="2" />
            <Circle cx="12" cy="19" r="2" />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Dropdown Menu as Modal */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.dropdown}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.dropdownItem}>
                {item.icon}
                <Text style={styles.dropdownLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 999,
    marginRight: 8,
    backgroundColor: '#ccc',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 12,
    color: '#333',
  },
  routeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
    opacity: 0.3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  dropdownLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#111',
  },
});
