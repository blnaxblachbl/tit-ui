import { View } from "react-native";

export type Restult = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const measure = (view: View): Promise<Restult> => {
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
