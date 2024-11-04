import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const ManualSwipeableRow = ({item, index, handleDeleteItem }) => {
  const translateX = useRef(new Animated.Value(0)).current; // Animated value for translation
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);  

  const handleSwipeLeft = () => {
    setIsSwipedLeft(true);
  }

  const handleSwipeRight = () => {
    setIsSwipedLeft(false);
  }
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // Start swipe if moved enough
      },
      onPanResponderMove: (evt, gestureState) => {
        translateX.setValue(gestureState.dx); // Update the translation
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -20) {


          handleSwipeLeft()
          // setIsSwipedLeft(true)



          Animated.spring(translateX, {
            toValue: -20, // Swipe item to the right, adjust as needed
            useNativeDriver: true,
          }).start();
        }

        if (gestureState.dx > 0) {
          // handleSwipeRight(item)
          handleSwipeRight();
          Animated.spring(translateX, {
            toValue: 0, // Swipe item to the right, adjust as needed
            useNativeDriver: true,
          }).start();
        }
        // Reset position
        // Animated.spring(translateX, {
        //   toValue: 0,
        //   useNativeDriver: true,
        // }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers} // Attach the pan responder
      style={[styles.container, { transform: [{ translateX }] }]}>
        <View
          style={styles.itemContainer} 
        >
          <Text style={styles.number}>{index}.</Text>  
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        {
          isSwipedLeft &&
            <TouchableOpacity
            onPress={() => handleDeleteItem(item)}
            style={styles.deleteButton}
          >
            <Text
            style={styles.deleteText}
            >Delete</Text>
          </TouchableOpacity>
        }
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.2)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 0, 
    shadowOpacity: .3, 
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  number: {
    marginRight: 10,      
    fontSize: 16,
    fontWeight: 'bold',    
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#d32f2f',
  }, 
  deleteButton: {
    backgroundColor: '#e0e0e0',
    // alignContent: 'center',
    justifyContent: 'center',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1.5 }, // Right shadow only
    shadowOpacity: .2,
  }
});

export default ManualSwipeableRow;