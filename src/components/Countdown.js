import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacingSizes } from '../utils/sizes';
import { FONT_COLOR, colors } from '../utils/colors';

const minutesToMiliseconds = (min) => min * 60000;
const milisecondsToMinutesAndSeconds = (milis) => {
  let minutes = Math.floor(milis / 60000) % 60;
  let seconds = Math.floor(milis / 1000) % 60;
  return [minutes, seconds];
};
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const [milis, setMilis] = React.useState(null);
  const interval = React.useRef(null);

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  React.useEffect(() => { 
    onProgress(milis / minutesToMiliseconds(minutes))
    if(milis==0){onEnd();}
    }, [milis]);

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
    //callbackfunction
  }, [isPaused]);

  React.useEffect(() => setMilis(minutesToMiliseconds(minutes)), [minutes]);

  let [min, sec] = milisecondsToMinutesAndSeconds(milis);

  return (
    <Text style={styles.text}>
      {formatTime(min)}:{formatTime(sec)}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: FONT_COLOR,
    padding: spacingSizes.lg,
    backgroundColor: colors.transparentBlue,
  },
});
