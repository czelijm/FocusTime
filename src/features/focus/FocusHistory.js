import * as React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import * as Sizes from '../../utils/sizes';
import * as Colors from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  console.log(typeof styles.historyItemStyle);
  return <Text style={stylesHistoryItem(item.status).historyItemStyle}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  console.log(styles);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        {!!focusHistory && (
          <>
            <Text style={styles.title}>We are focusing on</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.container}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={()=>{onClear()}}/>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItemStyle: 
    function(status){
      return(
        {
          color: status > 1 ? 'red' : 'green',
          fontSize: Sizes.fontSizes.md,
        }
      )
    }
  ,
  title: {
    fontSize: Sizes.fontSizes.lg,
    color: Colors.FONT_COLOR,
  },
  safeArea: {
    flex: 0.5,
    alignItems: 'center',
    marginTop:Sizes.spacingSizes.xxl
  },
  flatList: {
    flex: 1,
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  clearContainer: {
    // alignItems: 'center',
    padding:Sizes.spacingSizes.md
  },
});

const stylesHistoryItem = (status) =>{
  let color = status > 1 ? 'red' : 'green';
  return StyleSheet.create({
     historyItemStyle: {
       color: color,
          fontSize: Sizes.fontSizes.md,
     }
  })
}
