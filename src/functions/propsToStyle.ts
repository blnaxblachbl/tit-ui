import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

type ViewStyleInProps = {
  w?: string | number;
  h?: string | number;
  //margin
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mh?: string | number;
  mv?: string | number;
  //padding
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  ph?: string | number;
  pv?: string | number;
  //background color
  bc?: ColorValue;
  //border
  bobc?: ColorValue;
  bober?: number;
  boblr?: number;
  bobrr?: number;
  bobsr?: number;
  bobw?: number;
  boc?: ColorValue;
  boec?: ColorValue;
  bolc?: ColorValue;
  bolw?: number;
  bor?: number;
  borc?: ColorValue;
  borw?: number;
  bosc?: ColorValue;
  bos?: "solid" | "dotted" | "dashed";
  botc?: ColorValue;
  boter?: number;
  botlr?: number;
  botrr?: number;
  botsr?: number;
  botw?: number;
  bow?: number;
  //opacity
  o?: number;
};

type TextStyleInProps = {
  //font
  ff?: string;
  fw?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fs?: number;
  tc?: ColorValue;
};

export type StyleInProps = ViewStyleInProps & TextStyleInProps;

const viewKeys: { [key in keyof ViewStyleInProps]: string } = {
  w: "width",
  h: "height",
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  mh: "marginHorizontal",
  mv: "marginVertical",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  ph: "paddingHorizontal",
  pv: "paddingVertical",
  bc: "backgroundColor",
  bobc: "borderBottomColor",
  bober: "borderBottomEndRadius",
  boblr: "borderBottomLeftRadius",
  bobrr: "borderBottomRightRadius",
  bobsr: "borderBottomStartRadius",
  bobw: "borderBottomWidth",
  boc: "borderColor",
  boec: "borderEndColor",
  bolc: "borderLeftColor",
  bolw: "borderLeftWidth",
  bor: "borderRadius",
  borc: "borderRightColor",
  borw: "borderRightWidth",
  bosc: "borderStartColor",
  bos: "borderStyle",
  botc: "borderTopColor",
  boter: "borderTopEndRadius",
  botlr: "borderTopLeftRadius",
  botrr: "borderTopRightRadius",
  botsr: "borderTopStartRadius",
  botw: "borderTopWidth",
  bow: "borderWidth",
};
const textKeys: { [key in keyof TextStyleInProps]: string } = {
  tc: "color",
  ff: "fontFamaly",
  fw: "fontWeight",
  fs: "fontSize",
};

export const propsToStyle = (props: StyleInProps) => {
  let textStyles: StyleProp<TextStyle> = {};
  let viewStyles: StyleProp<ViewStyle> = {};
  for (const [key, value] of Object.entries(props)) {
    if (textKeys.hasOwnProperty(key)) {
      textStyles[textKeys[key]] = value;
    }
    if (viewKeys.hasOwnProperty(key)) {
      viewStyles[viewKeys[key]] = value;
    }
  }
  return {
    textStyles,
    viewStyles,
  };
};
export const extractStyleProps = (props: object): object => {
  let styleProps = {};
  for (const key of Object.keys({ ...viewKeys, ...textKeys })) {
    if (props.hasOwnProperty(key)) {
      styleProps[key] = props[key];
    }
  }
  return styleProps;
};
