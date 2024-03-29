import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuthentication = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isCancelled, setIsCancelled] = useState();
  const auth = getAuth();
  function checkIfIsCancelled() {
    if (isCancelled) {
      return;
    }
  }

  const createUser = async ({ email, password, displayName }) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: displayName,
      });
      setLoading(false);

      console.log("user: ", user, "displayName: ", displayName);

      return user;
    } catch (error) {
      console.log(error.message);

      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
