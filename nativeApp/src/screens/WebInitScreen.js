import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { WebInitContext } from "../context/WebInitContext";
import { postUser } from "../lib/api/user";
import MyButton from "../components/MyButton";
import { update_item } from "../lib/dataBaseHelper";
import { User } from "../lib/databaseQueryText";

const WebInitScreen = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsWebInit, setIsSkipped } = useContext(WebInitContext);

  const validateName = () => {
    if (name.trim() === "") {
      setErrorMessage("名前を入力してください");
      return false;
    }
    if (name.length < 2) {
      setErrorMessage("名前は2文字以上である必要があります");
      return false;
    }
    if (name.length > 10) {
      setErrorMessage("名前は10文字以下である必要があります");
      return false;
    }
    return true;
  };

  const handleWebInit = async () => {
    if (!validateName()) return;
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
        <Text style={styles.title}>PickNic</Text>
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
      <Text onPress={() => setIsSkipped(true)} style={styles.footerText}>
        あとでやる
      </Text>
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
    fontSize: 80,
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
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
  },
});

export default WebInitScreen;
