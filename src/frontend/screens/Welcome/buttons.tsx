import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import ButterTheme from '../../assets/constants/theme';

const {width, height} = Dimensions.get('screen');

export const ButtonSecondary: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: width * 0.67,
      justifyContent: 'center',
      paddingVertical: 15,
      // paddingHorizontal: 62,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: ButterTheme.colors.butterPink,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export const DiscardButton: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: width * 0.85,
      justifyContent: 'center',
      paddingVertical: 15,
      // paddingHorizontal: 62,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: ButterTheme.colors.butterPink,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export const ButtonPrimary: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: width * 0.67,
      justifyContent: 'center',
      paddingVertical: 15,
      // paddingHorizontal: 110,
      borderRadius: 10,
      backgroundColor: ButterTheme.colors.butterPink,
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export const UpdateButton: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 15,
      paddingHorizontal: 100,
      borderRadius: 10,
      backgroundColor: ButterTheme.colors.butterPink,
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'normal',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export const ButtonLink: React.FC<{title: string; onPress: () => void}> = ({
  title,
  onPress,
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
    },
    text: {
      fontSize: 12,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: ButterTheme.colors.butterPink,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
export const ButtonPrimarySmall: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: ButterTheme.colors.butterPink,
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
export const ButtonSecondarySmall: React.FC<{
  title: string;
  onPress: () => void;
}> = ({title, onPress}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      borderStyle: 'solid',
      borderColor: ButterTheme.colors.butterPink,
      borderWidth: 1,
    },
    text: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: ButterTheme.colors.butterPink,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
