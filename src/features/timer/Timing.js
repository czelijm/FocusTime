import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {RoundedButton} from '../../components/RoundedButton'

export const Timing = ({onChangeTime,timeArray}) => {

  return(
    timeArray.map( time =>(
      <View style={styles.buttonContainer}>
        <RoundedButton size={75} title={`${time}`} onPress={()=>onChangeTime(time)} />
      </View>
      )
    )
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    flex:1,
    alignItems:'center',
  },
})