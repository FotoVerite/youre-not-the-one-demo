import React, { FC, PropsWithChildren, RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SnapshotView: FC<
  {
    snapshotRef: RefObject<View>;
  } & PropsWithChildren
> = ({ snapshotRef, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.layout,
        {
          marginTop: insets.top,
          marginBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.layout} ref={snapshotRef}>
        {children}
      </View>
    </View>
  );
};

export default SnapshotView;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: "#f1f1f1",
  },
});
