import React from 'react';
import { View as RNView, ViewStyle } from 'react-native';

import { EColors } from './enums';
import { isNumeric } from './utils';

/**
 * ========== VIEW COMPONENT ==========
 */
export const View = (props: IViewProps) => {
  const style = generateStyle(props);
  return props?.children ? (
    <RNView style={[style, props.style]}>{props.children}</RNView>
  ) : (
    <RNView style={style} />
  );
};

/**
 * ========== STYLE GENERATORS ==========
 */
const generateStyle = (props: any): ViewStyle => {
  let style = {};
  Object.entries(props).forEach(([prop, type]) => {
    if (typeof prop === 'string' && typeof type === 'boolean') {
      if (prop.startsWith('absolute'))
        style = { ...style, position: 'absolute' };
      if (prop.startsWith('bg-')) style = handleBackgroundColor(prop, style);
      if (prop.startsWith('border-')) style = handleBorder(prop, style);
      if (prop.startsWith('bottom-'))
        style = { ...style, bottom: Number(prop.split('-').pop()) };
      if (prop.startsWith('content-')) style = handleContent(prop, style);
      if (prop.startsWith('flex-')) style = handleFlex(prop, style);
      if (prop === 'flex-basis')
        style = { ...style, flexBasis: Number(prop.split('-').pop()) };
      if (prop === 'flex-grow-0') style = { ...style, flexGrow: 0 };
      if (prop === 'flex-grow-1') style = { ...style, flexGrow: 1 };
      if (prop === 'flex-shrink-0') style = { ...style, flexShrink: 0 };
      if (prop === 'flex-shrink-1') style = { ...style, flexShrink: 1 };
      if (prop === 'flex-wrap') style = { ...style, flexWrap: 'wrap' };
      if (prop === 'flex-wrap-reverse')
        style = { ...style, flexWrap: 'wrap-reverse' };
      if (prop === 'flex-wrap-nowrap') style = { ...style, flexWrap: 'nowrap' };
      if (prop.startsWith('height-'))
        style = { ...style, height: Number(prop.split('-').pop()) };
      if (prop.startsWith('items-')) style = handleItems(prop, style);
      if (prop.startsWith('justify-')) style = handleJustify(prop, style);
      if (prop.startsWith('left-'))
        style = { ...style, left: Number(prop.split('-').pop()) };
      if (prop.startsWith('m')) style = handleMargin(prop, style);
      if (prop.startsWith('max-h-'))
        style = { ...style, maxHeight: Number(prop.split('-').pop()) };
      if (prop.startsWith('max-w-'))
        style = { ...style, maxWidth: Number(prop.split('-').pop()) };
      if (prop.startsWith('min-h-'))
        style = { ...style, minHeight: Number(prop.split('-').pop()) };
      if (prop.startsWith('min-w-'))
        style = { ...style, minWidth: Number(prop.split('-').pop()) };
      if (prop.startsWith('overflow-')) style = handleOverflow(prop, style);
      if (prop.startsWith('p')) style = handlePadding(prop, style);
      if (prop.startsWith('relative'))
        style = { ...style, position: 'relative' };
      if (prop.startsWith('right-'))
        style = { ...style, right: Number(prop.split('-').pop()) };
      if (prop.startsWith('rounded-')) style = handleBorderRadius(prop, style);
      if (prop.startsWith('self-')) style = handleSelf(prop, style);
      if (prop.startsWith('top-'))
        style = { ...style, top: Number(prop.split('-').pop()) };
      if (prop.startsWith('width-'))
        style = { ...style, width: Number(prop.split('-').pop()) };
      if (prop.startsWith('z-'))
        style = { ...style, zIndex: Number(prop.split('-').pop()) };
    }
  });
  return style;
};

/**
 * ========== BACKGROUND COLOR ==========
 */
const handleBackgroundColor = (prop: string, style: any) => {
  const backgroundColor: any = {};
  const value = prop.split('-').pop();
  if (value && Object.keys(EColors).includes(value)) {
    Object.entries(EColors).forEach(([key, val]) => {
      if (value?.startsWith(key)) {
        backgroundColor.backgroundColor = val;
      }
    });
  } else {
    backgroundColor.backgroundColor = `#${value}`;
  }
  return { ...style, ...backgroundColor };
};

enum EBorderColors {
  'border-t-' = 'borderTopColor',
  'border-r-' = 'borderRightColor',
  'border-b-' = 'borderBottomColor',
  'border-l-' = 'borderLeftColor',
  'border-' = 'borderColor',
}

enum EBorderWidths {
  'border-t-' = 'borderTopWidth',
  'border-r-' = 'borderRightWidth',
  'border-b-' = 'borderBottomWidth',
  'border-l-' = 'borderLeftWidth',
  'border-' = 'borderWidth',
}

/**
 * ========== BORDER COLOR & STYLE & WIDTH ==========
 */

const handleBorder = (prop: string, style: any) => {
  const border: any = {};
  const value = prop.split('-').pop();
  const property = prop.substring(0, prop.lastIndexOf('-') + 1);
  if (value && Object.keys(EColors).includes(value)) {
    Object.entries(EBorderColors).forEach(([keyBorder, valBorder]) => {
      if (property === keyBorder) {
        Object.entries(EColors).forEach(([keyColor, valColor]) => {
          if (keyColor === value) {
            border[valBorder] = valColor;
          }
        });
      }
    });
  } else {
    Object.entries(EBorderWidths).forEach(([keyBorder, valBorder]) => {
      if (value && isNumeric(value) && property === keyBorder) {
        border[valBorder] = Number(value);
      }
    });
  }
  if (prop === 'border-solid') border.borderStyle = 'solid';
  if (prop === 'border-dotted') border.borderStyle = 'dotted';
  if (prop === 'border-dashed') border.borderStyle = 'dashed';
  return { ...style, ...border };
};

enum EBorderRadius {
  'rounded-tr-' = 'borderTopRightRadius',
  'rounded-tl-' = 'borderTopLeftRadius',
  'rounded-br-' = 'borderBottomRightRadius',
  'rounded-bl-' = 'borderBottomLeftRadius',
  'rounded-' = 'borderRadius',
}

const handleBorderRadius = (prop: string, style: any) => {
  const borderRadius: any = {};
  const value = prop.split('-').pop();
  const property = prop.substring(0, prop.lastIndexOf('-') + 1);
  Object.entries(EBorderRadius).forEach(([key, val]) => {
    if (property === key) {
      borderRadius[val] = value;
      return { ...style, ...borderRadius };
    }
  });
  if (prop.startsWith('rounded-t-')) {
    borderRadius.borderTopRightRadius = value;
    borderRadius.borderTopLeftRadius = value;
  } else if (prop.startsWith('rounded-r-')) {
    borderRadius.borderTopRightRadius = value;
    borderRadius.borderBottomRightRadius = value;
  } else if (prop.startsWith('rounded-b-')) {
    borderRadius.borderBottomRightRadius = value;
    borderRadius.borderBottomLeftRadius = value;
  } else if (prop.startsWith('rounded-l-')) {
    borderRadius.borderTopLeftRadius = value;
    borderRadius.borderBottomRadius = value;
  }
  return { ...style, ...borderRadius };
};

enum EContents {
  start = 'start',
  end = 'end',
  center = 'center',
  between = 'between',
  around = 'around',
  evenly = 'evenly',
}

/**
 * ========== ALIGN CONTENT ==========
 */
const handleContent = (prop: string, style: any) => {
  const content: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(EContents).includes(value as EContents)) {
    if (value === 'start' || value === 'end') {
      content.alignContent = `flex-${value}`;
    } else if (
      value === 'around' ||
      value === 'between' ||
      value === 'evenly'
    ) {
      content.alignContent = `space-${value}`;
    } else {
      content.alignContent = value;
    }
  } else {
    content.alignContent = 'flex-start';
  }
  return { ...style, ...content };
};

enum EFlexs {
  one = '1',
  col = 'col',
  row = 'row',
}

/**
 * ========== FLEX & FLEX DIRECTION ==========
 */
const handleFlex = (prop: string, style: any) => {
  const flex: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(EFlexs).includes(value as EFlexs)) {
    if (value === 'col' || value === 'row') {
      flex.flexDirection = value;
    } else if (value === '1') {
      flex.flex = 1;
    } else {
      flex.flex = value;
    }
  }
  return { ...style, ...flex };
};

enum EItems {
  start = 'start',
  end = 'end',
  center = 'center',
  baseline = 'baseline',
  stretch = 'stretch',
}

/**
 * ========== ALIGN ITEMS ==========
 */
const handleItems = (prop: string, style: any) => {
  const items: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(EItems).includes(value as EItems)) {
    if (value === 'start' || value === 'end') {
      items.alignItems = `flex-${value}`;
    }
    items.alignItems = value;
  }
  return { ...style, ...items };
};

enum EJustifies {
  start = 'start',
  end = 'end',
  center = 'center',
  between = 'between',
  around = 'around',
  evenly = 'evenly',
}

/**
 * ========== JUSTIFY CONTENT ==========
 */
const handleJustify = (prop: string, style: any) => {
  const justify: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(EJustifies).includes(value as EJustifies)) {
    if (value === 'start' || value === 'end') {
      justify.justifyContent = `flex-${value}`;
    } else if (
      value === 'around' ||
      value === 'between' ||
      value === 'evenly'
    ) {
      justify.justifyContent = `space-${value}`;
    } else {
      justify.justifyContent = value;
    }
  } else {
    justify.justifyContent = 'flex-start';
  }
  return { ...style, ...justify };
};

enum EMargins {
  'm-' = 'margin',
  'mx-' = 'marginHorizontal',
  'my-' = 'marginVertical',
  'mt-' = 'marginTop',
  'mr-' = 'marginRight',
  'mb-' = 'marginBottom',
  'ml-' = 'marginLeft',
}

/**
 * ========== MARGIN ==========
 */
const handleMargin = (prop: string, style: any) => {
  const margin: any = {};
  Object.entries(EMargins).forEach(([key, value]) => {
    if (prop.startsWith(key)) {
      margin[value] = Number(prop.split('-').pop());
    }
  });
  return { ...style, ...margin };
};

enum EOverflows {
  hidden = 'hidden',
  scroll = 'scroll',
  visible = 'visible',
}

/**
 * ========== OVERFLOW ==========
 */
const handleOverflow = (prop: string, style: any) => {
  const overflow: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(EOverflows).includes(value as EOverflows)) {
    overflow.overflow = value;
  }
  return { ...style, ...overflow };
};

enum EPaddings {
  'p-' = 'padding',
  'px-' = 'paddingHorizontal',
  'py-' = 'paddingVertical',
  'pt-' = 'paddingTop',
  'pr-' = 'paddingRight',
  'pb-' = 'paddingBottom',
  'pl-' = 'paddingLeft',
}

/**
 * ========== PADDING ==========
 */
const handlePadding = (prop: string, style: any) => {
  const padding: any = {};
  Object.entries(EPaddings).forEach(([key, value]) => {
    if (prop.startsWith(key)) {
      padding[value] = Number(prop.split('-').pop());
    }
  });
  return { ...style, ...padding };
};

enum ESelfs {
  start = 'start',
  end = 'end',
  center = 'center',
  baseline = 'baseline',
  stretch = 'stretch',
}

/**
 * ========== ALIGN SELF ==========
 */
const handleSelf = (prop: string, style: any) => {
  const self: any = {};
  const value = prop.split('-').pop();
  if (value && Object.values(ESelfs).includes(value as ESelfs)) {
    if (value === 'start' || value === 'end') {
      self.alignSelf = `flex-${value}`;
    }
    self.alignSelf = value;
  }
  return { ...style, ...self };
};

export default View;
