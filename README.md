# react-native-cosmotize

React Native direct prop styling, inspired by Tailwindcss.

## Installation

```sh
yarn add @chengsokdara/react-native-cosmotize

npm install @chengsokdara/react-native-cosmotize
```

## Usage

```tsx
import { View } from '@chengsokdara/react-native-cosmotize';
import Box from '@chengsokdara/react-native-cosmotize';

export default function App() {
  return (
    <View flex-1 items-center justify-center bg-black>
      <Box bg-white width-100 height-100 />
    </View>
  );
}
```

### API

Layout and View Style props are implemented.  
[React Native Layout Props](https://reactnative.dev/docs/layout-props)  
[React Native View Style Props](https://reactnative.dev/docs/view-style-props)

Please refer to Tailwindcss documentation for available prop name.  
[Tailwindcss Docs](https://tailwindcss.com/docs)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
