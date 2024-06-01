import { StyleSheet } from 'react-native';
import { Bubble, Time, InputToolbar, Composer } from 'react-native-gifted-chat';

export const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#82CCDD',
        },
        right: {
          backgroundColor: '#78E08F',
        },
      }}
      textStyle={{
        left: {
          color: '#2B333B',
        },
        right: {
          color: '#2B333B',
        },
      }}
    />
  );
};

export const renderTime = (props: any) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: '#000', // Color for the time on the left bubbles
        },
        right: {
          color: '#000', // Color for the time on the right bubbles
        },
      }}
    />
  );
};

export const renderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.primaryStyle}
    />
  );
};

export const renderComposer = (props: any) => {
  return (
    <Composer
      {...props}
      textInputStyle={styles.composer}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputToolbar: {
    backgroundColor: '#36405C', // Background color of the input toolbar
    borderTopColor: '#353959', // Border color of the input toolbar
    borderTopWidth: 1, // Border width of the input toolbar
  },
  primaryStyle: {
    alignItems: 'center',
  },
  composer: {
    color: '#fff', // Change this to your desired text color
  },
});
