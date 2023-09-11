import React, { FC } from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";

const Header: FC = () => {
  return (
    <Row style={[styles.container]}>
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          //navigation.navigate('Desktop');
        }}
      >
        <View style={styles.spacer}>
          {/* <Row style={styles.row}>
            <Icon name="chevron-left" color={'black'} size={16} />
            <P style={styles.backButton}>Back</P>
          </Row> */}
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.header}>Messages</Text>
      <View style={[styles.spacer]}>
        <TouchableWithoutFeedback style={{}} onPress={() => {}}>
          <View style={styles.spacer}>
            {/* <Row style={styles.plusIcon}>
              <Icon name="add-circle-outline" color={'black'} size={20} />
            </Row> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  backButton: { paddingStart: 0, color: "black" },
  container: {
    paddingHorizontal: theme.spacing.p1,
    paddingVertical: 4,
    marginTop: 12,
    flexGrow: 0,
    alignItems: "flex-end",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "auto",
  },
  spacer: {
    flex: 1,
  },
  row: {
    alignItems: "center",
  },
  plusIcon: {
    alignItems: "flex-end",
    marginStart: "auto",
  },
});
