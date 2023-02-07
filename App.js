import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native'

export default function App() {
  const [ number, setNumber ] = react.useState(-1)
  const [ refresh, setRefresh ] = react.useState(false)
  const [ board, setBoard ] = react.useState(
    [
      "1","2"," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," "," ",
      " "," "," "," "," "," "," "," ","9"
    ]
  )
  const [ keyboard ] = react.useState(
    [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Clear"
    ]
  )
  
  const fieldPress = (index) => {
    let newBoard = board
    //First case check
    number == -1 ? 
    alert("Please click on a number") : (
      newBoard[index] = number,
      setBoard(newBoard),
      setRefresh(!refresh)
    )
  }
  
  const checkIndex = (n, side) => {
    if (side == "r")
      return (n+1) % 3 == 0 && (n+1) % 9 != 0   
    else
      return ((n > 17 && n < 27) || (n > 44 && n < 54))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Sudoku Solver</Text>

      <FlatList 
      style={[styles.table, {padding: 1}]}
      data={board}
      numColumns={9}
      refreshing={true}
      extraData={refresh}
      renderItem={({item, index}) => 
      <TouchableOpacity style={[styles.square, {borderRightWidth: checkIndex(index, "r") ? 3 : 1}, {borderBottomWidth: checkIndex(index, "b") ? 3 : 1}]} onPress={() => fieldPress(index)}>
        <Text style={styles.number}>{item}</Text>
      </TouchableOpacity>
      }
      />

      <FlatList
      style={styles.keyboard}
      data={keyboard}
      numColumns={3}
      refreshing={true}
      extraData={refresh}
      renderItem={({item, index}) =>
      <TouchableOpacity style={styles.square} onPress={() => setNumber(index+1)}>
        <Text style={styles.numberButton}>{item}</Text>
      </TouchableOpacity>
      }
      />
    </View>
  );
}

const vw = Dimensions.get('window').width/100
const squareSize = 10
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24
  },

  table:{
    border: 10,
    // backgroundColor: 'black', 
    margin: 0,
    padding: 0,
  },

  number: {
    padding: 1,
    bottom: 4,
    textAlign: 'center',
    fontSize: 30,
    color: 'black'
  },

  square: {
    fontSize: 10,
    width: squareSize*vw,
    height: squareSize*vw,
    margin: 1,
    backgroundColor: 'white'
  }

});
