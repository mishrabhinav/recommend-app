import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function AutoComplete ({ placeholder, onPress }) {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      minLength={5}
      autoFocus={false}
      returnKeyType='search'
      fetchDetails={true}
      query={{
        key: 'AIzaSyAsID6JEfqv3zpcEdSQ-1aQiPqoRs0__rA',
        language: 'en'
      }}
      enablePoweredByContainer={false}
      onPress={onPress}
      nearbyPlacesAPI='GoogleReverseGeocoding'
      styles={{
        textInputContainer: {
          borderTopWidth: 0,
          backgroundColor: 'white',
          borderBottomWidth: 0
        },
        row: {
          padding: 5,
          paddingTop: 20,
          height: 60,
          paddingBottom: 20,
          flexDirection: 'row'
        },
        description: {
          fontWeight: '400',
          fontSize: 15
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          backgroundColor: '#f6f7f9',
          color: '#5d5d5d',
          fontSize: 16
        },
        container: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0
        },
        separator: {
          backgroundColor: '#EEEEEE'
        }
      }}
    />
  );
}
