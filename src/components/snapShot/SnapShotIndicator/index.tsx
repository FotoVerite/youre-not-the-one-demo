// import React, { FC, useEffect, useRef, useState } from "react";
// import { SkImage, makeImageFromView } from "@shopify/react-native-skia";

// //defaults for empty app
// export const SnapShotContext = React.createContext<SnapShotContextTypeDigested>(
//   {}
// );

// const SnapShotContextProvider: FC<SnapShotContextTypeDigest> = (props) => {
//   const [takeSnapShot, setTakeSnapShot] = useState<string>();
//   const [takeBackground, setTakeBackground] = useState<boolean>();
//   const [takeQuietly, setTakeQuietly] = useState<string>();

//   const [background, setBackground] = useState<SkImage>();

//   const [image, setImage] = useState<undefined | null | SkImage>();
//   const [indicatorRunning, setIndicatorRunning] = useState(false);

//   const snapShotRef = useRef(props.snapShotRef);

//   useEffect(() => {
//     const snapShot = async () => {
//       if (snapShotRef.current) {
//         const image = await makeImageFromView(snapShotRef.current);
//         setImage(image);
//       }
//     };
//     if (takeSnapShot) {
//       snapShot().catch(console.error);
//     }
//   }, [snapShotRef, takeSnapShot]);

//   useEffect(() => {
//     const snapShot = async () => {
//       if (snapShotRef.current) {
//         const image = await makeImageFromView(snapShotRef.current);
//         if (image) {
//           setBackground(image);
//         }
//       }
//     };
//     if (takeBackground) {
//       snapShot().catch(console.error);
//     }
//   }, [snapShotRef, takeBackground]);

//   useEffect(() => {
//     const snapShot = async () => {
//       if (snapShotRef.current) {
//         const image = await makeImageFromView(snapShotRef.current);
//         setImage(image);
//       }
//     };
//     if (takeQuietly) {
//       snapShot().catch(console.error);
//     }
//   }, [snapShotRef, takeQuietly]);

//   useEffect(() => {
//     const snapShot = async () => {
//       if (image && takeSnapShot) {
//         await ReactNativeBlobUtil.fs.writeFile(
//           getSnapshotPath(takeSnapShot),
//           image.encodeToBase64(),
//           "base64"
//         );
//         setTakeSnapShot(undefined);
//         setImage(undefined);
//       }
//     };
//     if (image && takeSnapShot) {
//       snapShot().catch(console.error);
//     }
//   }, [image, takeSnapShot]);

//   useEffect(() => {
//     const snapShot = async () => {
//       if (image && takeQuietly) {
//         await ReactNativeBlobUtil.fs.writeFile(
//           getSnapshotPath(takeQuietly),
//           image.encodeToBase64(),
//           "base64"
//         );
//         setTakeQuietly(undefined);
//         setImage(undefined);
//       }
//     };
//     if (image && takeQuietly) {
//       snapShot().catch(console.error);
//     }
//   }, [image, takeQuietly]);

//   return (
//     <SnapShotContext.Provider
//       value={{
//         background: { set: setBackground, state: background },
//         takeQuietly: { set: setTakeQuietly, state: takeQuietly },
//         takeBackground: { state: takeBackground, set: setTakeBackground },
//         takeSnapShot: { state: takeSnapShot, set: setTakeSnapShot },
//         indicatorRunning: { state: indicatorRunning, set: setIndicatorRunning },
//         image: image,
//       }}
//     >
//       {props.children}
//     </SnapShotContext.Provider>
//   );
// };

// export default SnapShotContextProvider;
// export const SnapShotContextConsumer = SnapShotContext.Consumer;

// export const getSnapshotPath = (filename: string) => {
//   const documentDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
//   return `${documentDir}/Images/${filename}.png`;
// };
