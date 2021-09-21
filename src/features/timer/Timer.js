import * as React from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { FONT_COLOR, colors } from '../../utils/colors';
import { spacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTheTimerEnd, onClearSubject }) => {
  useKeepAwake();
  const [isPaused, setIsPaused] = React.useState(true);
  const [progress, setProgress] = React.useState(1);
  const [minutes, setMinutes] = React.useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=>Vibration.vibrate(),1000);
      setTimeout(()=>clearInterval(interval),10000);
    }else if(Platform.OS=== 'android'){
      Vibration.vibrate(10000);//10s
    }
  }

  const stopAndSetTimer = (min) =>{   
    setMinutes(min);
    setProgress(1);
    setIsPaused(true);
  }

  const onEnd = () => {
    vibrate();
    stopAndSetTimer(DEFAULT_TIME);
    onTheTimerEnd();
  };

  const changeTime = (min) => {
    stopAndSetTimer(min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Countdown
          minutes={minutes}
          isPaused={isPaused}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarWrapper}>
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
          color={colors.lightBlue}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} timeArray={[10, 15, 20]} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={!isPaused ? 'pause' : 'start'}
          onPress={() => setIsPaused(!isPaused)}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title={'-'}
          onPress={() => {onClearSubject();}}
          size={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingTop: spacingSizes.xxl,
  },
  timeContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarWrapper: {
    paddingTop: spacingSizes.sm,
  },
  progressBar: {
    height: 10,
  },
  clearSubject:{
    paddingBottom:20,
    paddingLeft:25,
  },
  title: {
    color: FONT_COLOR,
    textAlign: 'center',
  },
  task: {
    color: FONT_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
