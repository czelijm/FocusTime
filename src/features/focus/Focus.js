import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';

import {RoundedButton} from '../../components/RoundedButton';
import * as Sizes from '../../utils/sizes';
import * as Colors from '../../utils/colors';

export const Focus = ({addSubject}) => {

  const [subject, setSubject] = React.useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on? </Text>
        <View style={styles.textContainer}>
          <TextInput style={styles.text} onChangeText={
            (text)=>{
              setSubject(text)
              console.log(text)
            }
          }/>
          <RoundedButton title="+" size={50} onPress={()=>{addSubject(subject); console.log(subject)}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  title: {
    // flex:1,
    color: Colors.FONT_COLOR,
    fontWeight: 'bold',
    fontSize: Sizes.fontSizes.lg,
    flexDirection:"row",
    alignItems:"center"
    
  },
  innerContainer: {
    flex: 1,
    padding: Platform.OS === 'android' ? Sizes.spacingSizes.md : Sizes.spacingSizes.xxxl,
    justifyContent: 'center',
  },
  text:{
    flex:1,
    marginRight:Sizes.spacingSizes.md,

  },
  textContainer: {
    paddingTop: Sizes.spacingSizes.md,
    flexDirection:"row",
    alignItems:'center'
  },
});
