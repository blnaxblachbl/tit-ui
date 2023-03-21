import { View } from "react-native";

type Item = View;
type Restult = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const measure = (view: Item): Promise<Restult> => {
  return new Promise((resolve, reject) => {
    if (!view) {
      reject(new Error("ref current not provided"));
    } else {
      view.measureInWindow(
        (x: number, y: number, width: number, height: number) =>
          resolve({
            x,
            y,
            width,
            height,
          })
      );
    }
  });
};
