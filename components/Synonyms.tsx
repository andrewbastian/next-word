import React, { FC, useCallback, useState, useEffect } from "react";
import { getSynonyms } from "../utils/useWordsAPI";
import styles from "../styles/Synonyms.module.css";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
interface SynonymProps {
  word: string;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const Synonyms: FC<SynonymProps> = ({ word }) => {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const [synos, setSynos] = useState<string[]>();
  const [sanitisedArr, setSanitisedArr] = useState<string[] | null>();
  const [displaySynos, setDisplaySynos] = useState<string | null>(null);

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const arrReducer = useCallback(
    (arrStr: string[]) => {
      const lkup = [...arrStr].reduce<string[]>(
        (lookup: string[], curr: string) => {
          if (!curr.startsWith(word)) {
            lookup.push(curr);
          }
          return lookup;
        },

        []
      );
      setSanitisedArr(lkup);
    },
    [word, setSanitisedArr]
  );

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  useEffect(() => {
    if (!synos) return;
    arrReducer(synos);
  }, [arrReducer, synos]);

  useEffect(() => {
    if (!sanitisedArr) return;
    setDisplaySynos(sanitisedArr[0]);
  }, [sanitisedArr]);

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  async function handleGetSynos(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const res = await getSynonyms(word);
    setSynos(res.synonyms);
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  async function handleDisplayChange(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    if (!sanitisedArr) return;

    setDisplaySynos(
      sanitisedArr[Math.floor(Math.random() * sanitisedArr.length) + 0]
    );
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  return (
    <div className={styles.wordBox}>
      {synos ? (
        <div className={styles.card}>
          <p className={styles.displaySynos}>{displaySynos}</p>
          <button onClick={handleDisplayChange} className={styles.getButton}>
            {" "}
            Get Another Synonym{" "}
          </button>
        </div>
      ) : (
        <button onClick={handleGetSynos} className={styles.getButton}>
          {" "}
          Get Synonoyms{" "}
        </button>
      )}
    </div>
  );
};
