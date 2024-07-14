import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { WebInitContext } from "../../context/WebInitContext";
import { postUser } from "../../lib/api/user";
import MyButton from "../../components/MyButton";
import { User } from "../../lib/databaseQueryText";
import { update_item } from "../../lib/dataBaseHelper";

const WebInitRemindScreen = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsWebInit } = useContext(WebInitContext);

  const handleWebInit = async () => {
    try {
      const res = await postUser(name);
      const updatedUser = new User();
      updatedUser.id = 1;
      updatedUser.name = name;
      updatedUser.isAccessed = 1;
      updatedUser.webId = res.webId;
      await update_item(User.tablename, updatedUser);
      setIsWebInit(true);
    } catch (error) {
      setErrorMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>
          イベントに参加するには{`\n`}ユーザ登録が必要です
        </Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="名前を入力してください"
            value={name}
            onChangeText={setName}
          />
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
        </View>
        <MyButton label="登録" onPress={handleWebInit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2D1",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 64,
  },
  title: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF914D",
    marginTop: 32,
  },
  inputField: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
  },
  input: {
    width: "80%",
    height: 60,
    borderRadius: 100,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default WebInitRemindScreen;
