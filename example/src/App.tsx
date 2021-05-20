import * as React from 'react';

import { View } from '@chengsokdara/react-native-cosmotize';

export default function App() {
  return (
    <View
      flex-1
      items-center
      justify-center
      bg-771122
      border-1
      border-l-17
      border-r-17
      border-blue900
      border-t-red400
      border-r-blue100
      rounded-30
      rounded-tl-50
      m-20
      mt-40
    >
      <View bg-fff width-100 height-100 />
      <View flex-row flex-wrap justify-center>
        <View bg-green500 width-100 height-100 />
        <View bg-blue300 width-100 height-100 />
        <View bg-green500 width-100 height-100 />
        <View bg-blue300 width-100 height-100 />
        <View bg-blue300 width-100 height-100 />
      </View>
      <View flex-row self-stretch justify-evenly>
        <View bg-white width-50 height-100 />
        <View bg-white width-50 height-100 />
      </View>
    </View>
  );
}
