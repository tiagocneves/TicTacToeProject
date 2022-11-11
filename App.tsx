/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect, useContext, createContext} from 'react';
 import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
 import { NavigationContainer, useNavigation } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import { GameProvider, HistoryContext, XisNextContext, StepContext, BoardState, SquareProps, BoardProps, Value} from "./GameContext";

 
 const Stack = createNativeStackNavigator();
 

 function Square(props: SquareProps) {
   return (

     <TouchableOpacity
         style={{backgroundColor: 'white', width: 80, height: 80, borderColor: 'black', borderWidth: 2}}
         onPress={props.onPress}
       >
         <View>
           <Text style={{marginTop: 14, textAlign: 'center', fontSize: 40}} testID="squareID">{props.value ? props.value: ''}</Text>
         </View>
       </TouchableOpacity>
 
   );
 }
 
 function Board (props: BoardProps) {
   const renderSquare = (i: number) => {
     return(
       <Square 
       value={props.squares[i]}
       onPress={ () => props.onPress(i)}
     />
     )
   }
 
   return (
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
       <View style = {{backgroundColor: 'red', flexDirection: 'row'}}>
       {renderSquare(0)}
       {renderSquare(1)}
       {renderSquare(2)}
       </View>
       <View style = {{backgroundColor: 'red', flexDirection: 'row'}}>
       {renderSquare(3)}
       {renderSquare(4)}
       {renderSquare(5)}
       </View>
       <View style = {{backgroundColor: 'red', flexDirection: 'row'}}>
       {renderSquare(6)}
       {renderSquare(7)}
       {renderSquare(8)}
       </View>
     </View>
   );
 }
 

 
 
 export function TicTacToeScreen({navigation}: {navigation: any}) {
 
  const {history, setHistory} = useContext(HistoryContext)
  const {stepNumber, setStepNumber} = useContext(StepContext);
  const {xIsNext, setXisNext} = useContext(XisNextContext);

   const handleClick = (i: number) => {
       const historyValue = history.slice(0, stepNumber + 1);
       const current = historyValue[historyValue.length - 1];
       const newSquares = [...current.squares];
 
       if(winner || newSquares[i]){
         return;
       }
 
       newSquares[i] = xIsNext ? 'X' : 'O';
       const newStep = {squares: newSquares};
       setHistory([...historyValue, newStep]);
       setStepNumber(historyValue.length);
       setXisNext(!xIsNext);
   };
   
   const winner = calculateWinner(history[stepNumber].squares);
 
   let status;
   if(winner){
       status = 'Winner: ' + winner;
   } else{
       status = 'Next player: ' + (xIsNext ? 'X' : 'O');
   }
 
   
   return (
     <SafeAreaView style={{flex: 1}}>
         <View style={styles.header}>
           <Text style={{textAlign: 'center', fontFamily: 'Arial',fontSize: 40, marginBottom: 30}}>Tic Tac Toe</Text>
         </View>
         <View style={styles.game}>
           <Board 
             squares={history[stepNumber].squares}
             onPress={handleClick}
           />
 
           <Text style={{alignItems:'center', textAlign: 'center', marginBottom: 70, marginTop: 30, fontSize: 20}} data-testid="status-player">{status}</Text>
                  <Button
                  title='History'
                  onPress={() => navigation.push('History')}/>
         </View>
     </SafeAreaView>
   )
 }
 
 function HistoryScreen({navigation}: {navigation: any}){
   //const {newMoves} = route.params;

   const {history} = useContext(HistoryContext);
   const {stepNumber, setStepNumber} = useContext(StepContext);
   const {xIsNext, setXisNext} = useContext(XisNextContext);
   
   const jumpTo = (step: number) => {
     setStepNumber(step);
     setXisNext((step % 2 == 0));
     navigation.goBack();
   };
   

   const moves = history.map((_, move: number) => {
     const desc = move ?
       'Go to move #' + move :
       'Go to game start';
     return (
       <TouchableOpacity
         onPress = {() => jumpTo(move)}>
           <Text key={move} style={{fontSize: 20, padding: 10}} testID="statusID">{desc}</Text>
       </TouchableOpacity>
       
     );
   });
 
   return(
     <SafeAreaView style={{flex: 1}}>
       <View style={styles.gameInfo}>
         <View>{moves}</View>
       </View>
     </SafeAreaView>
   );
 }
 
 function App(){

   return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={TicTacToeScreen}/>
          <Stack.Screen name="History" component={HistoryScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
   );
 }

 function calculateWinner(squares: Value[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


 // React Native Styles
 const styles = StyleSheet.create({ 
   header: {
     flex: 1,
     marginTop: 40
   },
   container: {
     flex: 1,
     justifyContent: 'center'
   },
   game: {
     flex: 5,
     flexDirection: 'column'
     
   },
   gameInfo: {
     flex: 1,
     alignItems: 'center'
   }
 });
 
 
 export default App;
 