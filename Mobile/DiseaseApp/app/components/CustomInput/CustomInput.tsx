import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({ control = {} as any, name = {} as any | String, placeholder = {} as any, secureTextEntry = {} as any, rules = {} }) => {
  return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: {error} }) => (
          <>
          <View style={[styles.container, {borderBottomColor: error ? 'red': '#e8e8e8'}]}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            style={styles.input}
            secureTextEntry={secureTextEntry === true ? true : false}
          />
          </View>
          {error && (
          <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
          </>
        )}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;