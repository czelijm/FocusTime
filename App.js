import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
// You can import from local files
// import AssetExample from './src/components/AssetExample';
import * as Sizes from './src/utils/sizes';
import * as Colors from './src/utils/colors';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

const STATUSES = {
  COMPLETED: 1,
  CANCELED: 2,
};

const STORAGE_KEY = "focusHistory"; 

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState(null);
  const [focusHistory, setFocusHistory] = React.useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key:String(focusHistory.length + 1) , subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {
    try{ 
      AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(focusHistory));
    }
    catch(e){
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem(STORAGE_KEY);
      let result = JSON.parse(history);
      if(history && result.length) {
        setFocusHistory(result)
      }
    } 
    catch(e){
      console.log(e)
    }
  }

  React.useEffect(()=>{
    saveFocusHistory();
  },[focusHistory]);

  
  React.useEffect(()=>{
    loadFocusHistory();
  },[]);


  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTheTimerEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          onClearSubject={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}></Timer>
      ) : (
        <View style={{flex:1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform === 'ios' ? Sizes.spacingSizes.md : Sizes.spacingSizes.lg,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  paragraph: {
    margin: Sizes.spacingSizes.lg,
  },
});
