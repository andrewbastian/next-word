import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import { Synonyms } from "../components/Synonyms";
import { Word } from "../components/Word";
import { firesbaseInit } from "../utils/clientApp";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const Home: NextPage = () => {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  const date = new Date();

  const nyDate = new Date(date).toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const dateRef = nyDate.replaceAll("/", "-");
  const [answers, setAnswers] = useState<DocumentData | undefined>();

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  useEffect(() => {
    console.log("dateRef:", dateRef);

    async function getDocq() {
      const db = firesbaseInit();
      if (!db) return;

      const docRef = doc(db, "solutions", dateRef);

      const res = await getDoc(docRef);
      return res;
    }
    const daDoc = getDocq().then((val) => {
      return val;
    });
    daDoc.then((v) => setAnswers(v?.data()));
  }, [dateRef]);

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  return (
    <div className={styles.container}>
      <Head>
        <title>Word-hint</title>
        <meta
          name="A Wordle tool to help you get a clue, a hint, a synonym, a letter, unstuck, or just cheat."
          content="Help with the NYT(New York Times) Wordle game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Wordle Hint</h1>

          <p className={styles.description}>
            {" "}
            <code className={styles.code}>{`${dateRef}`}</code>
          </p>
          {answers && (
            <>
              <Word word={answers?.word} />
              <Synonyms word={answers?.word} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
