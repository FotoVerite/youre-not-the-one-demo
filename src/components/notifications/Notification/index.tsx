import moment from "moment";
import React, { FC } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { theme } from "src/theme";
import { formatNotificationDate } from "src/utility/datetime";
import { Row } from "src/utility/layout";

import { NotificationType } from "../reducer/types";

type NotificationDisplayType = Pick<
  NotificationType,
  "content" | "title" | "updatedAt"
> & { backgroundColor: string; image: ImageSourcePropType };

const Notification: FC<NotificationDisplayType> = ({
  backgroundColor,
  content,
  image,
  title,
  updatedAt,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          width: width - theme.spacing.p4,
        },
      ]}
    >
      <Row>
        <Image source={image} style={styles.image} />
        <View style={styles.contentContainer}>
          <Row style={styles.header}>
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.text}>{content}</Text>
            </View>
            <Text style={styles.date}>
              {formatNotificationDate(moment(updatedAt))}
            </Text>
          </Row>
        </View>
      </Row>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#b2b0b092",
    padding: theme.spacing.p1,
    borderColor: "#b2b0b092",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexGrow: 1,
    width: 2,
  },
  content: {
    flexShrink: 1,
    marginEnd: theme.spacing.p1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 8,
    marginEnd: theme.spacing.p1,
  },
  header: {
    alignItems: "flex-start",
  },
  date: {
    marginLeft: "auto",
    marginTop: -1,
    color: "#5a5858",
    fontSize: 13,
  },
  title: {
    color: "#4b4a4a",
    marginBottom: 1,
    fontWeight: "bold",
  },
  text: {
    color: "#343434",
    fontSize: 13,
  },
});
