import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

function TestSwipeableList() {
  const [data, setData] = useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const swipeableRefs = useRef<Record<string, React.RefObject<SwipeableMethods>>>({});

  const handleClose = (id: string) => {
    if (swipeableRefs.current[id]?.current) {
      console.log(`Fechando Swipeable para item ${id}`);
      swipeableRefs.current[id].current.close();
    } else {
      console.warn(`swipeableRef para item ${id} é nulo.`);
    }
  };

  const renderItem = ({ item }) => {
    if (!swipeableRefs.current[item.id]) {
      swipeableRefs.current[item.id] = React.createRef<SwipeableMethods>();
    }

    return (
      <Swipeable
        ref={swipeableRefs.current[item.id]}
        onSwipeableOpen={() => handleClose(item.id)}
        renderRightActions={() => null}
        renderLeftActions={() => (
          <View style={styles.leftAction}>
            <Text>Ação Esquerda</Text>
          </View>
        )}
      >
        <View style={styles.item}>
          <Text>{item.text}</Text>
          <TouchableOpacity>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#eee',
    padding: 20,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftAction: {
    backgroundColor: 'lightblue',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    color: 'blue',
  },
});

export default TestSwipeableList;